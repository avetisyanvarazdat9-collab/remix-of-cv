import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const STRING_FIELDS = [
  "name",
  "title",
  "tagline",
  "location",
  "bio",
  "email",
  "phone",
  "photo_url",
  "cv_url",
  "github_url",
  "linkedin_url",
  "twitter_url",
  "website_url",
] as const;

type SaveProfileInput = {
  id?: string | null;
  profile: Record<string, unknown>;
};

function cleanProfile(input: unknown): SaveProfileInput {
  const raw = (input ?? {}) as Record<string, unknown>;
  const id = typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : null;
  if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error("Invalid profile id");
  }

  const source = (raw.profile ?? {}) as Record<string, unknown>;
  const profile: Record<string, unknown> = {};
  for (const field of STRING_FIELDS) {
    if (!(field in source)) continue;
    const value = source[field];
    profile[field] = typeof value === "string" && value.trim() ? value.trim() : null;
  }

  profile.name = typeof profile.name === "string" && profile.name ? profile.name : "Dr. Varazdat Avetisyan";
  profile.title =
    typeof profile.title === "string" && profile.title
      ? profile.title
      : "AI/ML Researcher, Lecturer & Entrepreneur";
  profile.i18n = source.i18n && typeof source.i18n === "object" && !Array.isArray(source.i18n) ? source.i18n : {};

  return { id, profile };
}

export const saveProfileAsAdmin = createServerFn({ method: "POST" })
  .inputValidator(cleanProfile)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("user_id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError) throw new Error(roleError.message);
    if (!role) throw new Error("Not authorized");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = data.profile as any;
    let result;

    if (data.id) {
      result = await supabaseAdmin.from("profile").update(payload).eq("id", data.id).select("*").maybeSingle();
    } else {
      const existing = await supabaseAdmin.from("profile").select("id").order("created_at", { ascending: true }).limit(1).maybeSingle();
      if (existing.error) throw new Error(existing.error.message);
      result = existing.data?.id
        ? await supabaseAdmin.from("profile").update(payload).eq("id", existing.data.id).select("*").maybeSingle()
        : await supabaseAdmin.from("profile").insert(payload).select("*").maybeSingle();
    }

    if (result.error) throw new Error(result.error.message);
    return result.data;
  });
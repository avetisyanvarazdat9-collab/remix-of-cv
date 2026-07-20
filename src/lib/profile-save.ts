import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { saveProfileAsAdmin } from "@/lib/profile.functions";

type ProfilePayload = Partial<Tables<"profile">> & { i18n?: unknown };

function isRlsError(message: string) {
  return /row-level security|violates row-level security|permission denied|not authorized/i.test(message);
}

function normalizeProfilePayload(payload: ProfilePayload) {
  const { created_at, updated_at, ...safePayload } = payload as Record<string, unknown>;
  return safePayload;
}

export async function saveAdminProfile(id: string | null | undefined, payload: ProfilePayload) {
  const cleanPayload = normalizeProfilePayload(payload);
  try {
    const data = await saveProfileAsAdmin({ data: { id: id || null, profile: cleanPayload } });
    return { data, error: null };
  } catch (serverError: any) {
    const serverMessage = String(serverError?.message ?? serverError ?? "");
    if (!/Missing Supabase environment variable|SUPABASE_SERVICE_ROLE_KEY|SUPABASE_URL/i.test(serverMessage)) {
      return { data: null, error: { message: serverMessage || "Profile save failed" } };
    }
  }

  // External deployments without a server service key can still save when
  // their table RLS policies are configured correctly for admin users.
  const direct = id
    ? await supabase.from("profile").update(cleanPayload as any).eq("id", id).select("*").maybeSingle()
    : await supabase.from("profile").insert(cleanPayload as any).select("*").maybeSingle();

  if (direct.error && isRlsError(direct.error.message)) {
    return {
      data: null,
      error: {
        message:
          "Profile save is blocked by database policies. Run the latest production-fix SQL script and set SUPABASE_SERVICE_ROLE_KEY on the server deployment.",
      },
    };
  }

  return direct as { data: Tables<"profile"> | null; error: { message: string } | null };
}
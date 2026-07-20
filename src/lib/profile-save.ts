import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type ProfilePayload = Partial<Tables<"profile">> & { i18n?: unknown };

type RpcResult = {
  data: Tables<"profile"> | null;
  error: { message: string } | null;
};

function isRlsError(message: string) {
  return /row-level security|violates row-level security|permission denied|not authorized/i.test(message);
}

function normalizeProfilePayload(payload: ProfilePayload) {
  const { created_at, updated_at, ...safePayload } = payload as Record<string, unknown>;
  return safePayload;
}

export async function saveAdminProfile(id: string | null | undefined, payload: ProfilePayload) {
  const cleanPayload = normalizeProfilePayload(payload);
  const rpc = (supabase.rpc as unknown as (fn: string, args: Record<string, unknown>) => Promise<RpcResult>)(
    "admin_save_profile",
    {
      p_profile_id: id || null,
      p_profile: cleanPayload,
    },
  );

  const rpcResult = await rpc;
  if (!rpcResult.error) return { data: rpcResult.data, error: null };

  // Older databases may not have the helper yet. If normal RLS is already
  // correct, the direct table write still succeeds; otherwise surface the
  // original policy error so the required SQL helper is clearly missing.
  const rpcMessage = rpcResult.error.message;
  if (!/admin_save_profile|function .* does not exist|Could not find the function/i.test(rpcMessage)) {
    return rpcResult;
  }

  const direct = id
    ? await supabase.from("profile").update(cleanPayload as any).eq("id", id).select("*").maybeSingle()
    : await supabase.from("profile").insert(cleanPayload as any).select("*").maybeSingle();

  if (direct.error && isRlsError(direct.error.message)) {
    return {
      data: null,
      error: {
        message:
          "Profile save is blocked by database policies. Run the latest production-fix SQL script so admin_save_profile is installed.",
      },
    };
  }

  return direct as { data: Tables<"profile"> | null; error: { message: string } | null };
}
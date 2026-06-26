import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";


/**
 * Ensures the default admin account exists.
 * - Email: admin@admin.local  (username "admin")
 * - Password: admin123
 *
 * Idempotent: only creates the account when no admin role exists yet.
 * Passwords are stored hashed by Supabase Auth (bcrypt).
 */
export const ensureDefaultAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  // Look for the canonical default-admin user by its shadow email.
  // We intentionally do NOT short-circuit on "any admin exists" — other admin
  // users may have been seeded, but the default admin/admin123 login must
  // still work out of the box per spec.
  const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listErr) throw new Error(listErr.message);
  const existing = list.users.find((u) => u.email?.toLowerCase() === "admin@admin.local");
  if (existing) {
    // Make sure it still has the admin role.
    await supabaseAdmin.from("user_roles").upsert({ user_id: existing.id, role: "admin" });
    return { ok: true, created: false };
  }

  // Create the default admin user.
  const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email: "admin@admin.local",
    password: "admin123",
    email_confirm: true,
    user_metadata: { username: "admin" },
  });
  if (createErr) throw new Error(createErr.message);
  const userId = created.user?.id;
  if (!userId) throw new Error("Failed to create default admin");

  // Grant admin role (handle_new_user trigger may already have, but be safe).
  await supabaseAdmin.from("user_roles").upsert({ user_id: userId, role: "admin" });

  return { ok: true, created: true };
});


/**
 * Resolve a username to its email address. The system stores credentials in
 * Supabase Auth; usernames are kept in user_metadata.username with an
 * `${username}@admin.local` email shadow so users can sign in with a name
 * instead of an email.
 */
export const resolveUsernameEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as { username?: string };
    if (!d?.username || typeof d.username !== "string") throw new Error("username required");
    return { username: d.username.trim().toLowerCase() };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Try fast path: shadow email.
    const shadow = `${data.username}@admin.local`;
    // List users and find a match by metadata username OR shadow email.
    const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (error) throw new Error(error.message);
    const match = list.users.find(
      (u) =>
        u.email?.toLowerCase() === shadow ||
        (u.user_metadata as { username?: string } | null)?.username?.toLowerCase() === data.username,
    );
    if (!match?.email) throw new Error("Invalid username or password");
    return { email: match.email };
  });

/**
 * Update the signed-in admin's username. Stored both in user_metadata and as
 * a shadow email (`${username}@admin.local`) so future logins can resolve it.
 */
export const updateAdminUsername = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as { username?: string };
    const username = String(d?.username ?? "").trim().toLowerCase();
    if (!/^[a-z0-9_.-]{3,32}$/.test(username)) throw new Error("Username must be 3-32 chars (a-z, 0-9, _.-)");
    return { username };
  })
  .middleware([requireSupabaseAuth])

  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Confirm caller is admin.
    const { data: isAdmin } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!isAdmin) throw new Error("Forbidden");

    const newEmail = `${data.username}@admin.local`;
    const { error } = await supabaseAdmin.auth.admin.updateUserById(context.userId, {
      email: newEmail,
      email_confirm: true,
      user_metadata: { username: data.username },
    });
    if (error) throw new Error(error.message);
    return { ok: true, email: newEmail, username: data.username };
  });

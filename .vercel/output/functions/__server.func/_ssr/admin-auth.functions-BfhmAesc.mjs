import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BBZdFWpw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth.functions-BfhmAesc.js
/**
* Resolve a username to its email address. The system stores credentials in
* Supabase Auth; usernames are kept in user_metadata.username with an
* `${username}@admin.local` email shadow so users can sign in with a name
* instead of an email.
*/
var resolveUsernameEmail_createServerFn_handler = createServerRpc({
	id: "7367afa100073334325a057de6ce6008287e30297b35ba0d830214064936058f",
	name: "resolveUsernameEmail",
	filename: "src/lib/admin-auth.functions.ts"
}, (opts) => resolveUsernameEmail.__executeServer(opts));
var resolveUsernameEmail = createServerFn({ method: "POST" }).inputValidator((data) => {
	const d = data;
	if (!d?.username || typeof d.username !== "string") throw new Error("username required");
	return { username: d.username.trim().toLowerCase() };
}).handler(resolveUsernameEmail_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const shadow = `${data.username}@admin.local`;
	const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({
		page: 1,
		perPage: 200
	});
	if (error) throw new Error(error.message);
	const match = list.users.find((u) => u.email?.toLowerCase() === shadow || u.user_metadata?.username?.toLowerCase() === data.username);
	if (!match?.email) throw new Error("Invalid username or password");
	return { email: match.email };
});
var updateAdminUsername_createServerFn_handler = createServerRpc({
	id: "9450ca7946261615eb2a8b93487ba6df8ac222de1059194329ef15bb1f217d4a",
	name: "updateAdminUsername",
	filename: "src/lib/admin-auth.functions.ts"
}, (opts) => updateAdminUsername.__executeServer(opts));
var updateAdminUsername = createServerFn({ method: "POST" }).inputValidator((data) => {
	const username = String(data?.username ?? "").trim().toLowerCase();
	if (!/^[a-z0-9_.-]{3,32}$/.test(username)) throw new Error("Username must be 3-32 chars (a-z, 0-9, _.-)");
	return { username };
}).middleware([requireSupabaseAuth]).handler(updateAdminUsername_createServerFn_handler, async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: isAdmin } = await supabaseAdmin.from("user_roles").select("user_id").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (!isAdmin) throw new Error("Forbidden");
	const newEmail = `${data.username}@admin.local`;
	const { error } = await supabaseAdmin.auth.admin.updateUserById(context.userId, {
		email: newEmail,
		email_confirm: true,
		user_metadata: { username: data.username }
	});
	if (error) throw new Error(error.message);
	return {
		ok: true,
		email: newEmail,
		username: data.username
	};
});
//#endregion
export { resolveUsernameEmail_createServerFn_handler, updateAdminUsername_createServerFn_handler };

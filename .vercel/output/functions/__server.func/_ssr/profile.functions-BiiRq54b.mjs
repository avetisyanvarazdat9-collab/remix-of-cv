import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BBZdFWpw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.functions-BiiRq54b.js
var STRING_FIELDS = [
	"name",
	"title",
	"tagline",
	"location",
	"bio",
	"email",
	"phone",
	"photo_url",
	"cv_url",
	"website_url"
];
function cleanProfile(input) {
	const raw = input ?? {};
	const id = typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : null;
	if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new Error("Invalid profile id");
	const source = raw.profile ?? {};
	const profile = {};
	for (const field of STRING_FIELDS) {
		if (!(field in source)) continue;
		const value = source[field];
		profile[field] = typeof value === "string" && value.trim() ? value.trim() : null;
	}
	profile.name = typeof profile.name === "string" && profile.name ? profile.name : "Dr. Varazdat Avetisyan";
	profile.title = typeof profile.title === "string" && profile.title ? profile.title : "AI/ML Researcher, Lecturer & Entrepreneur";
	profile.i18n = source.i18n && typeof source.i18n === "object" && !Array.isArray(source.i18n) ? source.i18n : {};
	return {
		id,
		profile
	};
}
var saveProfileAsAdmin_createServerFn_handler = createServerRpc({
	id: "980337e2d3a712c780d0482e57c024df9f86c568dcc7f4108c42fde666871574",
	name: "saveProfileAsAdmin",
	filename: "src/lib/profile.functions.ts"
}, (opts) => saveProfileAsAdmin.__executeServer(opts));
var saveProfileAsAdmin = createServerFn({ method: "POST" }).inputValidator(cleanProfile).middleware([requireSupabaseAuth]).handler(saveProfileAsAdmin_createServerFn_handler, async ({ data, context }) => {
	const { data: role, error: roleError } = await context.supabase.from("user_roles").select("user_id").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (roleError) throw new Error(roleError.message);
	if (!role) throw new Error("Not authorized");
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const payload = data.profile;
	let result;
	if (data.id) result = await supabaseAdmin.from("profile").update(payload).eq("id", data.id).select("*").maybeSingle();
	else {
		const existing = await supabaseAdmin.from("profile").select("id").order("created_at", { ascending: true }).limit(1).maybeSingle();
		if (existing.error) throw new Error(existing.error.message);
		result = existing.data?.id ? await supabaseAdmin.from("profile").update(payload).eq("id", existing.data.id).select("*").maybeSingle() : await supabaseAdmin.from("profile").insert(payload).select("*").maybeSingle();
	}
	if (result.error) throw new Error(result.error.message);
	return result.data;
});
//#endregion
export { saveProfileAsAdmin_createServerFn_handler };

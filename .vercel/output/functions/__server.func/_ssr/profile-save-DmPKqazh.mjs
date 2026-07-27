import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-8VUd3M7h.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BBZdFWpw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-save-DmPKqazh.js
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
var saveProfileAsAdmin = createServerFn({ method: "POST" }).inputValidator(cleanProfile).middleware([requireSupabaseAuth]).handler(createSsrRpc("980337e2d3a712c780d0482e57c024df9f86c568dcc7f4108c42fde666871574"));
function isRlsError(message) {
	return /row-level security|violates row-level security|permission denied|not authorized/i.test(message);
}
function normalizeProfilePayload(payload) {
	const { created_at, updated_at, ...safePayload } = payload;
	return safePayload;
}
async function saveAdminProfile(id, payload) {
	const cleanPayload = normalizeProfilePayload(payload);
	try {
		return {
			data: await saveProfileAsAdmin({ data: {
				id: id || null,
				profile: cleanPayload
			} }),
			error: null
		};
	} catch (serverError) {
		const serverMessage = String(serverError?.message ?? serverError ?? "");
		if (!/Missing Supabase environment variable|SUPABASE_SERVICE_ROLE_KEY|SUPABASE_URL/i.test(serverMessage)) return {
			data: null,
			error: { message: serverMessage || "Profile save failed" }
		};
	}
	const direct = id ? await supabase.from("profile").update(cleanPayload).eq("id", id).select("*").maybeSingle() : await supabase.from("profile").insert(cleanPayload).select("*").maybeSingle();
	if (direct.error && isRlsError(direct.error.message)) return {
		data: null,
		error: { message: "Profile save is blocked by database policies. Run the latest production-fix SQL script and set SUPABASE_SERVICE_ROLE_KEY on the server deployment." }
	};
	return direct;
}
//#endregion
export { saveAdminProfile as t };

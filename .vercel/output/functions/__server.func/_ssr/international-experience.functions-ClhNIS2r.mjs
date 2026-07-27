import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/international-experience.functions-ClhNIS2r.js
var SELECT_COLUMNS = "id,title,organization,location,country_code,lat,lng,category,event_date,description,url,i18n";
function getClient() {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var getInternationalExperience_createServerFn_handler = createServerRpc({
	id: "8d20edcd259ce170ab1f9605151520148b2a48d1641f39a9e0cb164be802d9c9",
	name: "getInternationalExperience",
	filename: "src/lib/international-experience.functions.ts"
}, (opts) => getInternationalExperience.__executeServer(opts));
var getInternationalExperience = createServerFn({ method: "GET" }).inputValidator((input) => ({
	category: input?.category ?? null,
	fromYear: input?.fromYear ?? null,
	toYear: input?.toYear ?? null
})).handler(getInternationalExperience_createServerFn_handler, async ({ data }) => {
	let q = getClient().from("international_experience").select(SELECT_COLUMNS).eq("is_visible", true).order("event_date", {
		ascending: false,
		nullsFirst: false
	});
	if (data.category) q = q.eq("category", data.category);
	if (data.fromYear !== null) q = q.gte("event_date", `${data.fromYear}-01-01`);
	if (data.toYear !== null) q = q.lte("event_date", `${data.toYear}-12-31`);
	const { data: rows, error } = await q;
	if (error) throw new Error(error.message);
	return rows ?? [];
});
var getInternationalExperienceFacets_createServerFn_handler = createServerRpc({
	id: "6417a56e17e6b795fff57787286d84bc4c201d1fc280086373cee6436b01cc9f",
	name: "getInternationalExperienceFacets",
	filename: "src/lib/international-experience.functions.ts"
}, (opts) => getInternationalExperienceFacets.__executeServer(opts));
var getInternationalExperienceFacets = createServerFn({ method: "GET" }).handler(getInternationalExperienceFacets_createServerFn_handler, async () => {
	const { data, error } = await getClient().from("international_experience").select("category,event_date").eq("is_visible", true);
	if (error) throw new Error(error.message);
	const rows = data ?? [];
	return {
		categories: Array.from(new Set(rows.map((r) => r.category).filter((c) => !!c))).sort(),
		years: Array.from(new Set(rows.map((r) => r.event_date ? new Date(r.event_date).getFullYear() : null).filter((y) => y !== null))).sort((a, b) => b - a),
		total: rows.length
	};
});
//#endregion
export { getInternationalExperienceFacets_createServerFn_handler, getInternationalExperience_createServerFn_handler };

import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-Ubk6A-Vs.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function sanitizeEnvValue(value) {
	if (typeof value !== "string") return void 0;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : void 0;
}
function createPlaceholderClient(message) {
	return createClient("https://placeholder.supabase.co", "placeholder-key", {
		global: { fetch: () => Promise.reject(new Error(message)) },
		auth: {
			storage: typeof window !== "undefined" ? localStorage : void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
function createSupabaseClient() {
	const rawUrl = sanitizeEnvValue("") || sanitizeEnvValue(typeof process !== "undefined" ? process.env?.SUPABASE_URL : void 0);
	const rawKey = sanitizeEnvValue("") || sanitizeEnvValue("") || sanitizeEnvValue(typeof process !== "undefined" ? process.env?.SUPABASE_PUBLISHABLE_KEY || process.env?.SUPABASE_ANON_KEY : void 0);
	const SUPABASE_URL = rawUrl ? rawUrl.replace(/\/+$/, "") : void 0;
	const SUPABASE_PUBLISHABLE_KEY = rawKey;
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["VITE_SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY)"] : []].join(", ")}.`;
		console.error(`[Supabase] ${message}`);
		return createPlaceholderClient(message);
	}
	try {
		return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
			global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
			auth: {
				storage: typeof window !== "undefined" ? localStorage : void 0,
				persistSession: true,
				autoRefreshToken: true
			}
		});
	} catch (err) {
		const message = `Failed to initialize Supabase client: ${err instanceof Error ? err.message : String(err)}`;
		console.error(`[Supabase] ${message}`, err);
		return createPlaceholderClient(message);
	}
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };

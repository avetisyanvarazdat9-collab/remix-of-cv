import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-BdAl8A3P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
			setSession(s);
			setUser(s?.user ?? null);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setIsAdmin(false);
			return;
		}
		console.log("[useAuth] checking admin role", {
			userId: user.id,
			email: user.email
		});
		supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data, error }) => {
			console.log("[useAuth] user_roles result", {
				data,
				error
			});
			if (error) {
				console.error("[useAuth] role query failed:", error.message);
				setIsAdmin(false);
				return;
			}
			setIsAdmin((data ?? []).map((r) => r.role).includes("admin"));
		});
	}, [user]);
	return {
		session,
		user,
		isAdmin,
		loading
	};
}
//#endregion
export { useAuth as t };

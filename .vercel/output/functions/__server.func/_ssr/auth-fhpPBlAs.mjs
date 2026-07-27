import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as buildPageHead } from "./seo-BFIIP3tD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-fhpPBlAs.js
var $$splitComponentImporter = () => import("./auth-CsUhnkeH.mjs");
var Route = createFileRoute("/auth")({
	head: () => buildPageHead({
		title: "Sign in — Admin",
		description: "Admin sign-in for Dr. Varazdat Avetisyan website management.",
		path: "/auth",
		robots: "noindex, nofollow"
	}),
	validateSearch: (s) => ({ next: typeof s.next === "string" ? s.next : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

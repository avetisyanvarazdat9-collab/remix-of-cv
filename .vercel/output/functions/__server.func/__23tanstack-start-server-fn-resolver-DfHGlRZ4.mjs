//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DfHGlRZ4.js
var manifest = {
	"6417a56e17e6b795fff57787286d84bc4c201d1fc280086373cee6436b01cc9f": {
		functionName: "getInternationalExperienceFacets_createServerFn_handler",
		importer: () => import("./_ssr/international-experience.functions-ClhNIS2r.mjs")
	},
	"7367afa100073334325a057de6ce6008287e30297b35ba0d830214064936058f": {
		functionName: "resolveUsernameEmail_createServerFn_handler",
		importer: () => import("./_ssr/admin-auth.functions-BfhmAesc.mjs")
	},
	"8d20edcd259ce170ab1f9605151520148b2a48d1641f39a9e0cb164be802d9c9": {
		functionName: "getInternationalExperience_createServerFn_handler",
		importer: () => import("./_ssr/international-experience.functions-ClhNIS2r.mjs")
	},
	"9450ca7946261615eb2a8b93487ba6df8ac222de1059194329ef15bb1f217d4a": {
		functionName: "updateAdminUsername_createServerFn_handler",
		importer: () => import("./_ssr/admin-auth.functions-BfhmAesc.mjs")
	},
	"980337e2d3a712c780d0482e57c024df9f86c568dcc7f4108c42fde666871574": {
		functionName: "saveProfileAsAdmin_createServerFn_handler",
		importer: () => import("./_ssr/profile.functions-BiiRq54b.mjs")
	},
	"f6cad80bede60409474d12c15407f69c2f3479539a39e4bfe68cfe1445845a93": {
		functionName: "logClientError_createServerFn_handler",
		importer: () => import("./_ssr/log-client-error.functions-2fM66MgP.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };

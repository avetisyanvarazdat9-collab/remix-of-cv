import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Mail, d as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as textMatchesAdminSearch, t as AdminSearchField } from "./admin-search-cN__O8jO.mjs";
import { n as formatDateTime } from "./format-date-ClbaH__N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.messages-uAa5zMTc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const filteredRows = (0, import_react.useMemo)(() => {
		if (!search.trim()) return rows;
		return rows.filter((m) => textMatchesAdminSearch([
			m.name,
			m.email,
			m.subject,
			m.body
		], search));
	}, [rows, search]);
	async function load() {
		setLoading(true);
		const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
		if (error) toast.error(error.message);
		setRows(data ?? []);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function markRead(id, value) {
		const { error } = await supabase.from("messages").update({ is_read: value }).eq("id", id);
		if (error) return toast.error(error.message);
		load();
	}
	async function del(id) {
		if (!confirm("Delete message?")) return;
		const { error } = await supabase.from("messages").delete().eq("id", id);
		if (error) return toast.error(error.message);
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Messages"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Submissions from the contact form."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchField, {
				value: search,
				onChange: setSearch,
				placeholder: "Search name, email, subject, or message…"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Loading…"
			}) : filteredRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: search.trim() ? "No results found. Try a different search term." : "No messages yet."
			}) : filteredRows.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `glass rounded-2xl p-5 ${m.is_read ? "opacity-70" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								m.name,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground",
									children: [
										"<",
										m.email,
										">"
									]
								})
							]
						}), m.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-primary",
							children: m.subject
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: formatDateTime(m.created_at)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 whitespace-pre-wrap text-sm",
						children: m.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${m.email}`,
								className: "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1 text-xs hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }), " Reply"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => markRead(m.id, !m.is_read),
								className: "rounded-md border border-border px-3 py-1 text-xs hover:bg-accent",
								children: ["Mark as ", m.is_read ? "unread" : "read"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => del(m.id),
								className: "inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1 text-xs text-destructive hover:bg-destructive/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), " Delete"]
							})
						]
					})
				]
			}, m.id))
		})
	] });
}
//#endregion
export { MessagesPage as component };

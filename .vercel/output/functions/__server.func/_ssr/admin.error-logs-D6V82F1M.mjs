import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as Trash2, g as Search, nt as ChevronLeft, tt as ChevronRight, v as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as formatDateTime } from "./format-date-ClbaH__N.mjs";
import { n as buttonVariants } from "./button-DVRVaDr-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.error-logs-D6V82F1M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var PAGE_SIZE = 25;
var KIND_OPTIONS = [
	{
		value: "all",
		label: "All kinds"
	},
	{
		value: "react.errorBoundary",
		label: "Error boundary"
	},
	{
		value: "unhandledrejection",
		label: "Unhandled rejection"
	},
	{
		value: "window.error",
		label: "Window error"
	},
	{
		value: "manual",
		label: "Manual"
	},
	{
		value: "server",
		label: "Server"
	}
];
var SEVERITY_OPTIONS = [
	{
		value: "all",
		label: "All severities"
	},
	{
		value: "critical",
		label: "Critical"
	},
	{
		value: "error",
		label: "Error"
	},
	{
		value: "warning",
		label: "Warning"
	},
	{
		value: "info",
		label: "Info"
	}
];
var SEVERITY_RANK = {
	critical: 0,
	error: 1,
	warning: 2,
	info: 3
};
var severityClass = (s) => {
	switch (s) {
		case "critical": return "bg-red-500/20 text-red-300 ring-1 ring-red-500/40";
		case "error": return "bg-orange-500/15 text-orange-300";
		case "warning": return "bg-yellow-500/15 text-yellow-300";
		case "info": return "bg-sky-500/15 text-sky-300";
		default: return "bg-muted text-muted-foreground";
	}
};
function ErrorLogsPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const [showClient, setShowClient] = (0, import_react.useState)(true);
	const [showServer, setShowServer] = (0, import_react.useState)(true);
	const [kind, setKind] = (0, import_react.useState)("all");
	const [severity, setSeverity] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [debounced, setDebounced] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDebounced(search.trim()), 300);
		return () => clearTimeout(t);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(0);
	}, [
		showClient,
		showServer,
		kind,
		severity,
		debounced
	]);
	(0, import_react.useEffect)(() => {
		setSelected(/* @__PURE__ */ new Set());
	}, [
		page,
		showClient,
		showServer,
		kind,
		severity,
		debounced
	]);
	async function load() {
		setLoading(true);
		const from = page * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		let q = supabase.from("error_logs").select("*", { count: "exact" }).order("occurred_at", { ascending: false }).range(from, to);
		const sources = [];
		if (showClient) sources.push("client");
		if (showServer) sources.push("server");
		if (sources.length === 1) q = q.eq("source", sources[0]);
		else if (sources.length === 0) q = q.eq("source", "__none__");
		if (kind !== "all") q = q.eq("kind", kind);
		if (severity !== "all") q = q.eq("severity", severity);
		if (debounced) {
			const pat = `%${debounced.replace(/[%,]/g, " ")}%`;
			q = q.or(`message.ilike.${pat},stack.ilike.${pat},route.ilike.${pat},url.ilike.${pat}`);
		}
		const { data, error, count } = await q;
		if (error) toast.error(error.message);
		setRows((data ?? []).slice().sort((a, b) => {
			const ra = SEVERITY_RANK[a.severity ?? ""] ?? 99;
			const rb = SEVERITY_RANK[b.severity ?? ""] ?? 99;
			if (ra !== rb) return ra - rb;
			return (b.occurred_at ?? "").localeCompare(a.occurred_at ?? "");
		}));
		setTotal(count ?? 0);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [
		showClient,
		showServer,
		kind,
		severity,
		debounced,
		page
	]);
	const pageIds = (0, import_react.useMemo)(() => rows.map((r) => r.id), [rows]);
	const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
	const somePageSelected = pageIds.some((id) => selected.has(id));
	function toggleRow(id) {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}
	function toggleSelectAllPage() {
		setSelected((prev) => {
			const next = new Set(prev);
			if (allPageSelected) for (const id of pageIds) next.delete(id);
			else for (const id of pageIds) next.add(id);
			return next;
		});
	}
	async function executeDelete(target) {
		setDeleting(true);
		try {
			if (target.mode === "single") {
				const { error } = await supabase.from("error_logs").delete().eq("id", target.id);
				if (error) throw error;
				toast.success("Error log deleted.");
			} else if (target.mode === "bulk") {
				const { error } = await supabase.from("error_logs").delete().in("id", target.ids);
				if (error) throw error;
				toast.success(`${target.ids.length} error log${target.ids.length === 1 ? "" : "s"} deleted.`);
				setSelected(/* @__PURE__ */ new Set());
			} else {
				const { error } = await supabase.from("error_logs").delete().gte("occurred_at", "1900-01-01");
				if (error) throw error;
				toast.success("All error logs cleared.");
				setSelected(/* @__PURE__ */ new Set());
			}
			setConfirmDelete(null);
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to delete error log(s).");
		} finally {
			setDeleting(false);
		}
	}
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
	const highlight = debounced.toLowerCase();
	const showingFrom = total === 0 ? 0 : page * PAGE_SIZE + 1;
	const showingTo = Math.min(total, page * PAGE_SIZE + rows.length);
	const selectedCount = selected.size;
	const highlighted = (0, import_react.useMemo)(() => (text) => {
		if (!text) return null;
		if (!highlight) return text;
		const idx = text.toLowerCase().indexOf(highlight);
		if (idx === -1) return text;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			text.slice(0, idx),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
				className: "rounded bg-yellow-400/30 px-0.5 text-foreground",
				children: text.slice(idx, idx + highlight.length)
			}),
			text.slice(idx + highlight.length)
		] });
	}, [highlight]);
	const confirmTitle = confirmDelete?.mode === "single" ? "Delete this error log?" : confirmDelete?.mode === "bulk" ? `Delete ${confirmDelete.ids.length} selected error log${confirmDelete.ids.length === 1 ? "" : "s"}?` : "Delete all error logs?";
	const confirmDescription = confirmDelete?.mode === "all" ? "This will permanently remove every error log in the database. This action cannot be undone." : "This will permanently remove the selected error log record(s) from Supabase. This action cannot be undone.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `grid max-h-[calc(100dvh-8.5rem)] gap-4 overflow-hidden md:max-h-[calc(100dvh-4rem)] ${total > PAGE_SIZE ? "grid-rows-[auto_minmax(0,1fr)_auto]" : "grid-rows-[auto_minmax(0,1fr)]"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-bold",
							children: "Error logs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: "Recent client and server runtime errors."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								[{
									key: "client",
									label: "Client",
									on: showClient,
									set: setShowClient,
									cls: "bg-blue-500/15 text-blue-300 border-blue-500/40"
								}, {
									key: "server",
									label: "Server",
									on: showServer,
									set: setShowServer,
									cls: "bg-orange-500/15 text-orange-300 border-orange-500/40"
								}].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => t.set(!t.on),
									"aria-pressed": t.on,
									className: `rounded-md border px-3 py-1.5 text-xs ${t.on ? t.cls : "border-border text-muted-foreground hover:bg-accent"}`,
									children: [t.on ? "✓ " : "", t.label]
								}, t.key)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: load,
									disabled: loading || deleting,
									className: "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), " Refresh"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setConfirmDelete({ mode: "all" }),
									disabled: deleting || total === 0,
									className: "inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), " Clear all"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-[240px] flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: search,
									onChange: (e) => setSearch(e.target.value),
									placeholder: "Search message, stack, route, or URL…",
									className: "w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: kind,
								onChange: (e) => setKind(e.target.value),
								className: "rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary",
								children: KIND_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: o.value,
									children: o.label
								}, o.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: severity,
								onChange: (e) => setSeverity(e.target.value),
								className: "rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary",
								children: SEVERITY_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: o.value,
									children: o.label
								}, o.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: loading ? "Loading…" : total === 0 ? "0 results" : `Showing ${showingFrom}–${showingTo} of ${total}`
							})
						]
					}),
					rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex cursor-pointer items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: allPageSelected,
								ref: (el) => {
									if (el) el.indeterminate = somePageSelected && !allPageSelected;
								},
								onChange: toggleSelectAllPage,
								disabled: deleting,
								className: "size-4 rounded border-border"
							}), "Select all on this page"]
						}), selectedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: deleting,
							onClick: () => setConfirmDelete({
								mode: "bulk",
								ids: [...selected]
							}),
							className: "inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }),
								"Delete selected (",
								selectedCount,
								")"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 overflow-y-auto overscroll-contain scroll-smooth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 pr-1",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Loading…"
					}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: debounced ? "No matches." : "No error logs found."
					}) : rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex gap-3 rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: selected.has(r.id),
								onChange: () => toggleRow(r.id),
								disabled: deleting,
								"aria-label": `Select error log ${r.id}`,
								className: "mt-1 size-4 shrink-0 rounded border-border"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "min-w-0 flex-1 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${r.source === "client" ? "bg-blue-500/15 text-blue-300" : "bg-orange-500/15 text-orange-300"}`,
													children: r.source
												}),
												r.severity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${severityClass(r.severity)}`,
													children: r.severity
												}),
												r.kind && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-purple-300",
													children: r.kind
												}),
												r.route && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: highlighted(r.route)
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 truncate font-mono text-sm text-foreground",
											children: highlighted(r.message)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs text-muted-foreground",
										children: formatDateTime(r.occurred_at)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-2 border-t border-border pt-3 text-xs",
									children: [
										r.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "URL: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "break-all font-mono",
											children: highlighted(r.url)
										})] }),
										r.user_agent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "UA: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "break-all",
											children: r.user_agent
										})] }),
										r.stack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
											className: "overflow-x-auto whitespace-pre-wrap rounded-md bg-card/60 p-3 font-mono text-[11px] leading-relaxed",
											children: highlighted(r.stack)
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: deleting,
								onClick: () => setConfirmDelete({
									mode: "single",
									id: r.id
								}),
								className: "inline-flex h-8 shrink-0 items-center gap-1 rounded-md border border-destructive/40 px-2.5 text-[11px] text-destructive hover:bg-destructive/10 disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
							})
						]
					}, r.id))
				})
			}),
			total > PAGE_SIZE && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-t border-border/60 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setPage((p) => Math.max(0, p - 1)),
						disabled: page === 0 || loading || deleting,
						className: "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3" }), " Prev"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Page ",
							page + 1,
							" of ",
							totalPages
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setPage((p) => p + 1 < totalPages ? p + 1 : p),
						disabled: page + 1 >= totalPages || loading || deleting,
						className: "inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-40",
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmDelete !== null,
				onOpenChange: (open) => !open && !deleting && setConfirmDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: confirmTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: confirmDescription })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: deleting,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					disabled: deleting || confirmDelete === null,
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: (e) => {
						e.preventDefault();
						if (confirmDelete) executeDelete(confirmDelete);
					},
					children: deleting ? "Deleting…" : "Delete"
				})] })] })
			})
		]
	});
}
//#endregion
export { ErrorLogsPage as component };

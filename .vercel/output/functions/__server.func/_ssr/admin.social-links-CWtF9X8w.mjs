import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as textMatchesAdminSearch, t as AdminSearchField } from "./admin-search-cN__O8jO.mjs";
import { i as normalizeSocialUrl, n as getSocialPlatform, r as isValidSocialUrl, t as SOCIAL_PLATFORMS } from "./social-platforms-CL0BN1QU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.social-links-CWtF9X8w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function defaultRows() {
	return SOCIAL_PLATFORMS.map((p) => ({
		platform: p.id,
		url: "",
		is_visible: false,
		display_order: p.defaultOrder
	}));
}
function mergeRows(data) {
	const byPlatform = new Map((data ?? []).map((r) => [r.platform, r]));
	return SOCIAL_PLATFORMS.map((p) => {
		const existing = byPlatform.get(p.id);
		return {
			id: existing?.id,
			platform: p.id,
			url: existing?.url ?? "",
			is_visible: existing?.is_visible ?? false,
			display_order: existing?.display_order ?? p.defaultOrder
		};
	});
}
function PlatformIcon({ platform }) {
	const config = getSocialPlatform(platform);
	if (!config) return null;
	const Icon = config.icon;
	if (Icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[10px] font-semibold text-primary",
		children: config.glyph
	});
}
function SocialLinksAdmin() {
	const [rows, setRows] = (0, import_react.useState)(defaultRows);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [savingPlatform, setSavingPlatform] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const queryClient = useQueryClient();
	const filteredRows = (0, import_react.useMemo)(() => {
		if (!search.trim()) return rows;
		return rows.filter((row) => {
			return textMatchesAdminSearch([
				getSocialPlatform(row.platform)?.label ?? row.platform,
				row.platform,
				row.url
			], search);
		});
	}, [rows, search]);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setLoadError(null);
		try {
			const { data, error } = await supabase.from("social_links").select("*").order("display_order");
			if (error) {
				setLoadError(error.message);
				toast.error(error.message);
				setRows(defaultRows());
				return;
			}
			setRows(mergeRows(data));
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to load social links";
			setLoadError(message);
			toast.error(message);
			setRows(defaultRows());
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	function updateRow(platform, patch) {
		setRows((prev) => prev.map((r) => r.platform === platform ? {
			...r,
			...patch
		} : r));
	}
	function validateRow(row) {
		const trimmed = row.url.trim();
		if (trimmed && !isValidSocialUrl(normalizeSocialUrl(trimmed))) return `Invalid URL for ${getSocialPlatform(row.platform)?.label ?? row.platform}`;
		return null;
	}
	async function persistRow(row) {
		const validationError = validateRow(row);
		if (validationError) {
			toast.error(validationError);
			return false;
		}
		const url = row.url.trim() ? normalizeSocialUrl(row.url) : null;
		const payload = {
			platform: row.platform,
			url,
			is_visible: row.is_visible && !!url,
			display_order: row.display_order
		};
		if (row.id) {
			const { error } = await supabase.from("social_links").update(payload).eq("id", row.id);
			if (error) {
				toast.error(error.message);
				return false;
			}
			return true;
		}
		const { data, error } = await supabase.from("social_links").insert(payload).select("*").single();
		if (error) {
			toast.error(error.message);
			return false;
		}
		updateRow(row.platform, { id: data.id });
		return true;
	}
	async function saveRow(platform) {
		const row = rows.find((r) => r.platform === platform);
		if (!row) return;
		setSavingPlatform(platform);
		const ok = await persistRow(row);
		setSavingPlatform(null);
		if (ok) {
			toast.success(`${getSocialPlatform(platform)?.label ?? platform} saved`);
			queryClient.invalidateQueries({ queryKey: ["social_links"] });
			await load();
		}
	}
	async function saveAll() {
		for (const row of rows) {
			const validationError = validateRow(row);
			if (validationError) {
				toast.error(validationError);
				return;
			}
		}
		setSaving(true);
		for (const row of rows) if (!await persistRow(row)) {
			setSaving(false);
			return;
		}
		setSaving(false);
		toast.success("Social links saved");
		queryClient.invalidateQueries({ queryKey: ["social_links"] });
		await load();
	}
	async function clearLink(platform) {
		const row = rows.find((r) => r.platform === platform);
		if (!row) return;
		if (!row.id) {
			updateRow(platform, {
				url: "",
				is_visible: false
			});
			return;
		}
		if (!confirm(`Remove ${getSocialPlatform(platform)?.label ?? platform} link?`)) return;
		const { error } = await supabase.from("social_links").update({
			url: null,
			is_visible: false
		}).eq("id", row.id);
		if (error) return toast.error(error.message);
		toast.success("Link removed");
		queryClient.invalidateQueries({ queryKey: ["social_links"] });
		await load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Social Links"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Manage all social profile URLs shown on the homepage hero and Contact page. Hidden or empty links are not displayed publicly."
		}),
		loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Could not load social links from Supabase."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: loadError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs opacity-90",
					children: [
						"If the table is missing, apply migration ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "rounded bg-background/60 px-1",
							children: "20260726193000_create_social_links.sql"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void load(),
					className: "mt-3 rounded-md border border-current/30 px-3 py-1 text-xs font-medium hover:bg-current/10",
					children: "Retry"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchField, {
				value: search,
				onChange: setSearch,
				placeholder: "Search platform or URL…"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass mt-4 overflow-hidden rounded-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Platform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "URL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Visible"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-medium",
								children: "Actions"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
						className: "px-4 py-6 text-center text-muted-foreground",
						children: "Loading…"
					}) }) : filteredRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
						className: "px-4 py-6 text-center text-muted-foreground",
						children: search.trim() ? "No results found. Try a different search term." : "No social platforms configured."
					}) }) : filteredRows.map((row) => {
						const label = getSocialPlatform(row.platform)?.label ?? row.platform;
						const isSavingRow = savingPlatform === row.platform;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/40 last:border-0 hover:bg-accent/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex size-7 items-center justify-center rounded-md border border-border bg-background/60",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformIcon, { platform: row.platform })
										}), label]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										value: row.url,
										onChange: (e) => updateRow(row.platform, { url: e.target.value }),
										placeholder: "https://…",
										className: "w-full min-w-[12rem] rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: row.is_visible,
											onChange: (e) => updateRow(row.platform, { is_visible: e.target.checked }),
											className: "size-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: row.is_visible ? "Yes" : "No"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: row.display_order,
										onChange: (e) => updateRow(row.platform, { display_order: Number(e.target.value) || 0 }),
										className: "w-20 rounded-md border border-input bg-background/60 px-2 py-1.5 text-sm outline-none focus:border-primary"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: isSavingRow || saving,
											onClick: () => void saveRow(row.platform),
											className: "rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-60",
											children: isSavingRow ? "Saving…" : "Save"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: isSavingRow || saving,
											onClick: () => void clearLink(row.platform),
											className: "rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-60",
											children: "Clear"
										})]
									})
								})
							]
						}, row.platform);
					}) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: saving || loading,
				onClick: () => void saveAll(),
				className: "rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60",
				children: saving ? "Saving…" : "Save all social links"
			})
		})
	] });
}
//#endregion
export { SocialLinksAdmin as component };

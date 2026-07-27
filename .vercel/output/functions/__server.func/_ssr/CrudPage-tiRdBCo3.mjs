import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as Pencil, b as Plus, c as Upload, d as Trash2, n as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PreviewPanel } from "./PreviewPanel-BRlKFamg.mjs";
import { n as rowMatchesAdminSearch, t as AdminSearchField } from "./admin-search-cN__O8jO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CrudPage-tiRdBCo3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LANG_TABS = [
	{
		code: "hy",
		label: "HY · Հայերեն"
	},
	{
		code: "en",
		label: "EN · English"
	},
	{
		code: "ru",
		label: "RU · Русский"
	}
];
var ASSET_BUCKET = "portfolio-assets";
var ZERO_DEFAULT_FIELDS = new Set([
	"display_order",
	"order_index",
	"level",
	"read_time_minutes"
]);
var TRUE_DEFAULT_FIELDS = new Set(["is_visible"]);
var FALSE_DEFAULT_FIELDS = new Set([
	"is_current",
	"is_published",
	"featured",
	"is_featured",
	"is_read"
]);
function isBlank(value) {
	return value === null || value === void 0 || typeof value === "string" && value.trim() === "";
}
function slugify(value, fallback = "item") {
	return String(value ?? "").normalize("NFKD").toLowerCase().replace(/[^a-z0-9\u0400-\u04FF\u0530-\u058F\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || fallback;
}
function coerceEmptyValue(table, field, value) {
	if (!isBlank(value)) return value;
	if (field.type === "tags") return [];
	if (field.type === "number" && ZERO_DEFAULT_FIELDS.has(field.name)) return 0;
	if (field.type === "boolean" && TRUE_DEFAULT_FIELDS.has(field.name)) return true;
	if (field.type === "boolean" && FALSE_DEFAULT_FIELDS.has(field.name)) return false;
	if (table === "navigation_menu" && field.name === "label_en") return "Navigation item";
	return null;
}
function applyTablePayloadDefaults(table, payload) {
	if (table === "navigation_menu") {
		const label = String(payload.label_en || payload.label_hy || payload.label_ru || payload.path || "Navigation item").trim();
		payload.label = label;
		payload.label_en = String(payload.label_en || label).trim();
		payload.label_hy = String(payload.label_hy || label).trim();
		payload.label_ru = String(payload.label_ru || label).trim();
		payload.path = String(payload.path || "/").trim();
		payload.order_index = Number(payload.order_index ?? 0);
		payload.is_visible = payload.is_visible ?? true;
	}
	if ((table === "courses" || table === "video_courses" || table === "blog_posts" || table === "projects") && isBlank(payload.slug)) payload.slug = slugify(payload.title, table === "video_courses" ? "video-course" : table.slice(0, -1) || "item");
	if (table === "courses") {
		payload.topics = Array.isArray(payload.topics) ? payload.topics : [];
		payload.learning_outcomes = Array.isArray(payload.learning_outcomes) ? payload.learning_outcomes : [];
		payload.prerequisites = Array.isArray(payload.prerequisites) ? payload.prerequisites : [];
		payload.is_featured = payload.is_featured ?? false;
	}
	if (table === "video_courses") {
		payload.topics = Array.isArray(payload.topics) ? payload.topics : [];
		const thumb = typeof payload.thumbnail_url === "string" ? payload.thumbnail_url.trim() : "";
		if (thumb) {
			payload.thumbnail_url = thumb;
			payload.image_url = thumb;
		} else if (typeof payload.image_url === "string" && payload.image_url.trim()) payload.thumbnail_url = payload.image_url.trim();
	}
	if (table === "blog_posts") payload.is_published = payload.is_published ?? false;
	if (table === "projects") payload.featured = payload.featured ?? false;
	if ("is_visible" in payload) payload.is_visible = payload.is_visible ?? true;
}
function canAutoDefaultRequiredField(table, fieldName) {
	if ((table === "courses" || table === "video_courses" || table === "blog_posts" || table === "projects") && fieldName === "slug") return true;
	if (table === "navigation_menu" && [
		"label_hy",
		"label_en",
		"label_ru",
		"label"
	].includes(fieldName)) return true;
	return false;
}
function CrudPage({ title, description, table, fields, orderBy, displayColumns, filter, defaults, hideHeader, searchFields, searchPlaceholder }) {
	const queryClient = useQueryClient();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)("");
	const resolvedSearchFields = (0, import_react.useMemo)(() => searchFields === false ? [] : searchFields ?? fields.map((f) => f.name), [searchFields, fields]);
	const searchEnabled = searchFields !== false;
	async function load() {
		setLoading(true);
		let q = supabase.from(table).select("*");
		if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
		const { data, error } = await q;
		if (error) toast.error(error.message);
		setRows(data ?? []);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [table]);
	async function del(id) {
		if (!confirm("Delete this item?")) return;
		const { error } = await supabase.from(table).delete().eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Deleted");
		load();
	}
	async function save(values) {
		const payload = {};
		const i18nBag = { ...editing?.i18n && typeof editing.i18n === "object" ? editing.i18n : {} };
		for (const f of fields) {
			if (f.type === "i18n" || f.type === "i18n-textarea") {
				const bag = values[f.name] ?? {};
				const tri = {
					hy: (bag.hy ?? "").trim(),
					en: (bag.en ?? "").trim(),
					ru: (bag.ru ?? "").trim()
				};
				if (f.required && !tri.hy && !tri.en && !tri.ru) {
					toast.error(`${f.label} is required`);
					return;
				}
				i18nBag[f.name] = tri;
				payload[f.name] = tri.en || tri.hy || tri.ru || (f.required ? f.label : null);
				continue;
			}
			if (f.required && isBlank(values[f.name]) && !canAutoDefaultRequiredField(table, f.name)) {
				toast.error(`${f.label} is required`);
				return;
			}
			let v = coerceEmptyValue(table, f, values[f.name]);
			if (f.type === "number" && v !== null) v = Number(v);
			if (f.type === "boolean") v = !!v;
			if (f.type === "tags" && typeof v === "string") v = v.split(",").map((s) => s.trim()).filter(Boolean);
			payload[f.name] = v;
		}
		if (fields.some((f) => f.type === "i18n" || f.type === "i18n-textarea")) payload.i18n = i18nBag;
		applyTablePayloadDefaults(table, payload);
		let error;
		if (editing?.id) ({error} = await supabase.from(table).update(payload).eq("id", editing.id));
		else ({error} = await supabase.from(table).insert(payload));
		if (error) return toast.error(error.message);
		toast.success("Saved");
		setEditing(null);
		setCreating(false);
		await queryClient.invalidateQueries({ queryKey: [table] });
		load();
	}
	const filteredRows = (0, import_react.useMemo)(() => {
		let result = filter ? rows.filter(filter) : rows;
		if (searchEnabled && search.trim()) result = result.filter((row) => rowMatchesAdminSearch(row, search, resolvedSearchFields));
		return result;
	}, [
		rows,
		filter,
		search,
		searchEnabled,
		resolvedSearchFields
	]);
	const hasSearchQuery = search.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		!hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: title
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: description
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					setCreating(true);
					setEditing({ ...defaults ?? {} });
				},
				className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New"]
			})]
		}),
		hideHeader && !searchEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					setCreating(true);
					setEditing({ ...defaults ?? {} });
				},
				className: "inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New"]
			})
		}),
		searchEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex flex-wrap items-center justify-between gap-3 ${hideHeader ? "mb-4" : "mt-6"}`,
			children: [searchEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchField, {
				value: search,
				onChange: setSearch,
				placeholder: searchPlaceholder ?? "Search…",
				className: "min-w-[200px] flex-1"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), hideHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					setCreating(true);
					setEditing({ ...defaults ?? {} });
				},
				className: "inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `glass overflow-hidden rounded-2xl ${searchEnabled || hideHeader ? "mt-4" : "mt-6"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground",
						children: [displayColumns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: c.replace(/_/g, " ")
						}, c)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-medium",
							children: "Actions"
						})]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: displayColumns.length + 1,
						className: "px-4 py-6 text-center text-muted-foreground",
						children: "Loading…"
					}) }) : filteredRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: displayColumns.length + 1,
						className: "px-4 py-6 text-center text-muted-foreground",
						children: hasSearchQuery ? "No results found. Try a different search term." : "No items yet. Click New to add one."
					}) }) : filteredRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/40 last:border-0 hover:bg-accent/30",
						children: [displayColumns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "max-w-xs truncate px-4 py-3",
							children: formatCell(row[c])
						}, c)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setEditing(row);
										setCreating(false);
									},
									className: "rounded-md border border-border p-1.5 hover:bg-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => del(row.id),
									className: "rounded-md border border-destructive/40 p-1.5 text-destructive hover:bg-destructive/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})]
							})
						})]
					}, row.id)) })]
				})
			})
		}),
		(editing || creating) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditModal, {
			table,
			fields,
			initial: editing ?? {},
			isNew: creating,
			onCancel: () => {
				setEditing(null);
				setCreating(false);
			},
			onSave: save
		})
	] });
}
function formatCell(v) {
	if (v === null || v === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	if (typeof v === "boolean") return v ? "Yes" : "No";
	if (Array.isArray(v)) return v.join(", ");
	if (typeof v === "string" && v.length > 80) return v.slice(0, 80) + "…";
	return String(v);
}
function EditModal({ table, fields, initial, isNew, onCancel, onSave }) {
	const [values, setValues] = (0, import_react.useState)(() => {
		const v = { ...initial };
		const bag = initial?.i18n && typeof initial.i18n === "object" ? initial.i18n : {};
		for (const f of fields) {
			if (f.type === "tags" && Array.isArray(v[f.name])) v[f.name] = v[f.name].join(", ");
			if (f.type === "date" && v[f.name]) v[f.name] = String(v[f.name]).slice(0, 10);
			if (f.type === "i18n" || f.type === "i18n-textarea") {
				const existing = bag[f.name];
				const plain = initial?.[f.name] ?? "";
				v[f.name] = {
					hy: existing?.hy ?? plain ?? "",
					en: existing?.en ?? plain ?? "",
					ru: existing?.ru ?? plain ?? ""
				};
			}
			if (f.type === "select" && (v[f.name] === void 0 || v[f.name] === null || v[f.name] === "")) v[f.name] = f.options?.[0]?.value ?? "";
		}
		return v;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass relative w-full max-w-2xl rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onCancel,
					className: "absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: isNew ? "Create" : "Edit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						onSave(values);
					},
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [
						fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: f.type === "textarea" || f.type === "i18n" || f.type === "i18n-textarea" ? "sm:col-span-2" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
								children: f.label
							}), f.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: values[f.name] ?? "",
								onChange: (e) => setValues({
									...values,
									[f.name]: e.target.value
								}),
								rows: 6,
								placeholder: f.placeholder,
								required: f.required,
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							}) : f.type === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex h-10 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!values[f.name],
									onChange: (e) => setValues({
										...values,
										[f.name]: e.target.checked
									}),
									className: "size-4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: f.label
								})]
							}) : f.type === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: values[f.name] ?? f.options?.[0]?.value ?? "",
								onChange: (e) => setValues({
									...values,
									[f.name]: e.target.value
								}),
								required: f.required,
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary",
								children: (f.options ?? []).map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: opt.value,
									children: opt.label
								}, opt.value))
							}) : f.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadField, {
								value: values[f.name] ?? "",
								onChange: (url) => setValues({
									...values,
									[f.name]: url
								}),
								required: f.required,
								uploadFolder: table === "video_courses" && f.name === "thumbnail_url" ? "video-thumbnails" : void 0
							}) : f.type === "i18n" || f.type === "i18n-textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nField, {
								value: values[f.name] ?? {
									hy: "",
									en: "",
									ru: ""
								},
								onChange: (next) => setValues({
									...values,
									[f.name]: next
								}),
								multiline: f.type === "i18n-textarea",
								placeholder: f.placeholder,
								required: f.required
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "url" ? "url" : "text",
								value: values[f.name] ?? "",
								onChange: (e) => setValues({
									...values,
									[f.name]: e.target.value
								}),
								placeholder: f.placeholder,
								required: f.required,
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})]
						}, f.name)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPanel, {
								fields,
								values
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2 mt-2 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onCancel,
								className: "rounded-md border border-border px-4 py-2 text-sm",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
								children: "Save"
							})]
						})
					]
				})
			]
		})
	});
}
function I18nField({ value, onChange, multiline, placeholder, required }) {
	const [active, setActive] = (0, import_react.useState)("en");
	const v = {
		hy: value?.hy ?? "",
		en: value?.en ?? "",
		ru: value?.ru ?? ""
	};
	const canCopyEnToHy = v.en.trim().length > 0 && v.hy !== v.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-background/40 p-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: LANG_TABS.map((t) => {
						const filled = v[t.code].trim().length > 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActive(t.code),
							className: `rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${active === t.code ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-accent"}`,
							children: [t.label, !filled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-destructive",
								children: "•"
							})]
						}, t.code);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !canCopyEnToHy,
					onClick: () => onChange({
						...v,
						hy: v.en
					}),
					className: "ml-auto inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
					title: "Copy English text into the Armenian field",
					children: "Copy EN → HY"
				})]
			}),
			multiline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 6,
				value: v[active],
				onChange: (e) => onChange({
					...v,
					[active]: e.target.value
				}),
				placeholder,
				required: required && active === "en",
				className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: v[active],
				onChange: (e) => onChange({
					...v,
					[active]: e.target.value
				}),
				placeholder,
				required: required && active === "en",
				className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[10px] text-muted-foreground",
				children: "Tip: a red dot means that language is empty. The site falls back to English when a translation is missing."
			})
		]
	});
}
var ALLOWED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/svg+xml"
];
var ALLOWED_IMAGE_EXTS = [
	"jpg",
	"jpeg",
	"png",
	"webp",
	"gif",
	"svg"
];
var MAX_IMAGE_BYTES = 5 * 1024 * 1024;
function formatBytes(n) {
	if (n < 1024) return `${n} B`;
	if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
	return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
function ImageUploadField({ value, onChange, required, uploadFolder }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	function validate(file) {
		const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
		const typeOk = ALLOWED_IMAGE_TYPES.includes(file.type);
		const extOk = ALLOWED_IMAGE_EXTS.includes(ext);
		if (!typeOk && !extOk) return `Unsupported file type${file.type ? ` (${file.type})` : ""}. Use JPG, PNG, WebP, GIF, or SVG.`;
		if (file.size === 0) return "File is empty.";
		if (file.size > MAX_IMAGE_BYTES) return `Image is ${formatBytes(file.size)} — must be under ${formatBytes(MAX_IMAGE_BYTES)}.`;
		return null;
	}
	async function handleFile(e) {
		const file = e.target.files?.[0];
		if (inputRef.current) inputRef.current.value = "";
		if (!file) return;
		const validationError = validate(file);
		if (validationError) {
			setError(validationError);
			toast.error(validationError);
			return;
		}
		setError(null);
		setUploading(true);
		const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
		const fileName = `${crypto.randomUUID()}.${ext}`;
		const path = uploadFolder ? `${uploadFolder}/${fileName}` : fileName;
		const { error: uploadError } = await supabase.storage.from(ASSET_BUCKET).upload(path, file, {
			cacheControl: "3600",
			upsert: uploadFolder ? true : false,
			contentType: file.type
		});
		if (uploadError) {
			setUploading(false);
			setError(uploadError.message);
			toast.error(uploadError.message);
			return;
		}
		const { data } = supabase.storage.from(ASSET_BUCKET).getPublicUrl(path);
		onChange(data.publicUrl);
		setUploading(false);
		toast.success("Image uploaded");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: "",
				className: "h-24 w-auto rounded-md border border-border object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "url",
						value,
						onChange: (e) => onChange(e.target.value),
						placeholder: "https://… or upload",
						required: required && !value,
						className: "flex-1 rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => inputRef.current?.click(),
						disabled: uploading,
						className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), uploading ? "Uploading…" : "Upload"]
					}),
					value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange(""),
						className: "rounded-md border border-border px-3 py-2 text-sm hover:bg-accent",
						children: "Clear"
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs text-destructive",
				children: error
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: ["JPG, PNG, WebP, GIF or SVG · max ", formatBytes(MAX_IMAGE_BYTES)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: ALLOWED_IMAGE_TYPES.join(","),
				className: "hidden",
				onChange: handleFile
			})
		]
	});
}
//#endregion
export { CrudPage as t };

import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { C as Pencil, c as Upload, n as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as rowMatchesAdminSearch, t as AdminSearchField } from "./admin-search-cN__O8jO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.four-dimensions-Bng3Mqn9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FOUR_DIMENSIONS_BUCKET = "four-dimensions";
var ALLOWED_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif"
];
var ALLOWED_IMAGE_EXTS = [
	"jpg",
	"jpeg",
	"png",
	"webp",
	"gif"
];
var MAX_IMAGE_BYTES = 5 * 1024 * 1024;
function validateFourDimensionImage(file) {
	const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
	const typeOk = ALLOWED_IMAGE_TYPES.includes(file.type);
	const extOk = ALLOWED_IMAGE_EXTS.includes(ext);
	if (!typeOk && !extOk) return `Unsupported file type. Use JPG, PNG, WebP, or GIF.`;
	if (file.size === 0) return "File is empty.";
	if (file.size > MAX_IMAGE_BYTES) return "Image must be under 5 MB.";
	return null;
}
function storagePathFromPublicUrl(url) {
	if (!url) return null;
	const marker = `/storage/v1/object/public/${FOUR_DIMENSIONS_BUCKET}/`;
	const idx = url.indexOf(marker);
	if (idx === -1) return null;
	return decodeURIComponent(url.slice(idx + marker.length));
}
async function deleteFourDimensionImage(url) {
	const path = url ? storagePathFromPublicUrl(url) : null;
	if (!path) return;
	const { error } = await supabase.storage.from(FOUR_DIMENSIONS_BUCKET).remove([path]);
	if (error) throw error;
}
async function uploadFourDimensionImage(dimensionId, file, oldUrl) {
	const validationError = validateFourDimensionImage(file);
	if (validationError) throw new Error(validationError);
	const path = `${dimensionId}/image.${file.name.split(".").pop()?.toLowerCase() ?? "jpg"}`;
	if (oldUrl) {
		const oldPath = storagePathFromPublicUrl(oldUrl);
		if (oldPath && oldPath !== path) await supabase.storage.from(FOUR_DIMENSIONS_BUCKET).remove([oldPath]);
	}
	const { error: uploadError } = await supabase.storage.from(FOUR_DIMENSIONS_BUCKET).upload(path, file, {
		cacheControl: "3600",
		upsert: true,
		contentType: file.type
	});
	if (uploadError) throw uploadError;
	const { data } = supabase.storage.from(FOUR_DIMENSIONS_BUCKET).getPublicUrl(path);
	return data.publicUrl;
}
function parseBullets(value) {
	if (Array.isArray(value)) return value.map(String).filter(Boolean);
	if (typeof value === "string" && value.trim()) return value.split("\n").map((s) => s.trim()).filter(Boolean);
	return [];
}
function FourDimensionsAdmin() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const queryClient = useQueryClient();
	const filteredRows = (0, import_react.useMemo)(() => {
		if (!search.trim()) return rows;
		return rows.filter((row) => rowMatchesAdminSearch(row, search, [
			"title",
			"subtitle",
			"description",
			"badge_text",
			"engagement_text",
			"cta_button_text"
		]));
	}, [rows, search]);
	async function load() {
		setLoading(true);
		const { data, error } = await supabase.from("four_dimensions").select("*").order("display_order");
		if (error) toast.error(error.message);
		setRows(data ?? []);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function save(values) {
		if (!editing?.id) return;
		const bullets = parseBullets(values.bullet_points);
		const payload = {
			title: values.title?.trim(),
			subtitle: values.subtitle?.trim() || null,
			description: values.description?.trim() || null,
			bullet_points: bullets,
			image_url: values.image_url?.trim() || null,
			image_alt: values.image_alt?.trim() || null,
			badge_text: values.badge_text?.trim() || null,
			engagement_text: values.engagement_text?.trim() || null,
			cta_button_text: values.cta_button_text?.trim() || null,
			cta_button_url: values.cta_button_url?.trim() || null,
			timeline_button_text: values.timeline_button_text?.trim() || null,
			timeline_button_url: values.timeline_button_url?.trim() || null,
			show_timeline_footer: !!values.show_timeline_footer,
			is_visible: values.is_visible ?? true,
			display_order: Number(values.display_order ?? editing.display_order)
		};
		if (!payload.title) {
			toast.error("Title is required");
			return;
		}
		const { error } = await supabase.from("four_dimensions").update(payload).eq("id", editing.id);
		if (error) return toast.error(error.message);
		toast.success("Dimension saved");
		setEditing(null);
		queryClient.invalidateQueries({ queryKey: ["four_dimensions"] });
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Four Dimensions of Impact"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Manage the four homepage impact dimensions — titles, descriptions, bullet points, images, and CTAs."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearchField, {
				value: search,
				onChange: setSearch,
				placeholder: "Search title, subtitle, or description…"
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
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Image"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Subtitle"
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
						colSpan: 7,
						className: "px-4 py-6 text-center text-muted-foreground",
						children: "Loading…"
					}) }) : filteredRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						className: "px-4 py-6 text-center text-muted-foreground",
						children: search.trim() ? "No results found. Try a different search term." : "No dimensions found. Run the database migration to seed the four dimensions."
					}) }) : filteredRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/40 last:border-0 hover:bg-accent/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: row.dimension_number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: row.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: row.image_url,
									alt: "",
									className: "h-12 w-16 rounded-md border border-border object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "—"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-xs truncate px-4 py-3",
								children: row.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-xs truncate px-4 py-3",
								children: row.subtitle || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: row.is_visible ? "Yes" : "No"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: row.display_order
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setEditing(row),
									className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), " Edit"]
								})
							})
						]
					}, row.id)) })]
				})
			})
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditModal, {
			row: editing,
			onCancel: () => setEditing(null),
			onSave: save
		})
	] });
}
function EditModal({ row, onCancel, onSave }) {
	const [values, setValues] = (0, import_react.useState)({
		...row,
		bullet_points: parseBullets(row.bullet_points)
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const queryClient = useQueryClient();
	const bulletsText = parseBullets(values.bullet_points).join("\n");
	async function handleUpload(file) {
		const validationError = validateFourDimensionImage(file);
		if (validationError) {
			toast.error(validationError);
			return;
		}
		setUploading(true);
		try {
			const publicUrl = await uploadFourDimensionImage(row.id, file, values.image_url);
			const { error } = await supabase.from("four_dimensions").update({ image_url: publicUrl }).eq("id", row.id);
			if (error) throw error;
			setValues((v) => ({
				...v,
				image_url: publicUrl
			}));
			queryClient.invalidateQueries({ queryKey: ["four_dimensions"] });
			toast.success("Image uploaded and saved.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(false);
		}
	}
	async function handleDeleteImage() {
		if (!values.image_url) return;
		if (!confirm("Remove this image from storage?")) return;
		setUploading(true);
		try {
			await deleteFourDimensionImage(values.image_url);
			const { error } = await supabase.from("four_dimensions").update({ image_url: null }).eq("id", row.id);
			if (error) throw error;
			setValues((v) => ({
				...v,
				image_url: null
			}));
			queryClient.invalidateQueries({ queryKey: ["four_dimensions"] });
			toast.success("Image removed.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Delete failed");
		} finally {
			setUploading(false);
		}
	}
	async function handleSubmit(e) {
		e.preventDefault();
		setSaving(true);
		await onSave({
			...values,
			bullet_points: bulletsText.split("\n").map((s) => s.trim()).filter(Boolean)
		});
		setSaving(false);
	}
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-xl font-semibold",
					children: ["Edit Dimension ", row.dimension_number]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: row.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Dimension number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: row.dimension_number,
								disabled: true,
								className: "w-full rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Display order",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: values.display_order ?? 0,
								onChange: (e) => setValues({
									...values,
									display_order: Number(e.target.value)
								}),
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.title ?? "",
								onChange: (e) => setValues({
									...values,
									title: e.target.value
								}),
								required: true,
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Subtitle",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.subtitle ?? "",
								onChange: (e) => setValues({
									...values,
									subtitle: e.target.value
								}),
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description (lead text)",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								value: values.description ?? "",
								onChange: (e) => setValues({
									...values,
									description: e.target.value
								}),
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bullet points (one per line)",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 6,
								value: bulletsText,
								onChange: (e) => setValues({
									...values,
									bullet_points: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
								}),
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
								children: "Image"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 rounded-md border border-border bg-background/40 p-4",
								children: [
									values.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: values.image_url,
										alt: values.image_alt ?? "",
										className: "max-h-48 w-full rounded-md border border-border object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "No image uploaded yet."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											disabled: uploading,
											onClick: () => inputRef.current?.click(),
											className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm hover:bg-accent disabled:opacity-60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), uploading ? "Uploading…" : values.image_url ? "Replace image" : "Upload image"]
										}), values.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: uploading,
											onClick: handleDeleteImage,
											className: "rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-60",
											children: "Delete image"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: inputRef,
										type: "file",
										accept: "image/jpeg,image/png,image/webp,image/gif",
										className: "hidden",
										onChange: (e) => {
											const file = e.target.files?.[0];
											if (inputRef.current) inputRef.current.value = "";
											if (file) handleUpload(file);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Stored in Supabase Storage at four-dimensions/",
											row.id,
											"/image"
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Image alt text",
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.image_alt ?? "",
								onChange: (e) => setValues({
									...values,
									image_alt: e.target.value
								}),
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Badge text",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.badge_text ?? "",
								onChange: (e) => setValues({
									...values,
									badge_text: e.target.value
								}),
								placeholder: "{count} countries or Global reach",
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Engagement text",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.engagement_text ?? "",
								onChange: (e) => setValues({
									...values,
									engagement_text: e.target.value
								}),
								placeholder: "{count}+ engagements",
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "CTA button text",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.cta_button_text ?? "",
								onChange: (e) => setValues({
									...values,
									cta_button_text: e.target.value
								}),
								placeholder: "Learn More",
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "CTA button URL",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.cta_button_url ?? "",
								onChange: (e) => setValues({
									...values,
									cta_button_url: e.target.value
								}),
								placeholder: "/collaborate",
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Timeline button text",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.timeline_button_text ?? "",
								onChange: (e) => setValues({
									...values,
									timeline_button_text: e.target.value
								}),
								placeholder: "View Timeline",
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Timeline button URL",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: values.timeline_button_url ?? "",
								onChange: (e) => setValues({
									...values,
									timeline_button_url: e.target.value
								}),
								placeholder: "/timeline",
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Show timeline footer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex h-10 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!values.show_timeline_footer,
									onChange: (e) => setValues({
										...values,
										show_timeline_footer: e.target.checked
									}),
									className: "size-4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Display badges and timeline CTA"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Visible",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex h-10 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: values.is_visible ?? true,
									onChange: (e) => setValues({
										...values,
										is_visible: e.target.checked
									}),
									className: "size-4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "Show on public homepage"
								})]
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
								disabled: saving || uploading,
								className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60",
								children: saving ? "Saving…" : "Save"
							})]
						})
					]
				})
			]
		})
	});
}
function Field({ label, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { FourDimensionsAdmin as component };

import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { d as profileQuery } from "./queries-BL4k_rC0.mjs";
import { t as saveAdminProfile } from "./profile-save-DmPKqazh.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PreviewPanel } from "./PreviewPanel-BRlKFamg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.profile-swSD4XeW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fields = [
	{
		name: "name",
		label: "Name",
		type: "i18n"
	},
	{
		name: "title",
		label: "Title",
		type: "i18n"
	},
	{
		name: "tagline",
		label: "Tagline",
		type: "i18n-textarea"
	},
	{
		name: "location",
		label: "Location",
		type: "i18n"
	},
	{
		name: "bio",
		label: "Bio",
		type: "i18n-textarea"
	},
	{
		name: "email",
		label: "Email"
	},
	{
		name: "phone",
		label: "Phone"
	},
	{
		name: "photo_url",
		label: "Profile Photo",
		type: "image"
	},
	{
		name: "cv_url",
		label: "CV URL",
		type: "url"
	},
	{
		name: "website_url",
		label: "Website URL",
		type: "url"
	}
];
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
var BUCKET = "portfolio-assets";
var REQUIRED_PROFILE_DEFAULTS = {
	name: "Dr. Varazdat Avetisyan",
	title: "AI/ML Researcher, Lecturer & Entrepreneur"
};
function getProjectRef() {
	const m = "".match(/^https?:\/\/([^.]+)\.supabase\.co/i);
	return m ? m[1] : null;
}
function ProfileEditor() {
	const queryClient = useQueryClient();
	const [data, setData] = (0, import_react.useState)(null);
	const [i18n, setI18n] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploadingPhoto, setUploadingPhoto] = (0, import_react.useState)(false);
	const [preflight, setPreflight] = (0, import_react.useState)({
		projectRef: null,
		projectOk: false,
		bucketOk: false,
		checking: true
	});
	async function runPreflight() {
		const projectRef = getProjectRef();
		const projectOk = !!projectRef;
		let bucketOk = false;
		let error;
		try {
			const { error: listErr } = await supabase.storage.from(BUCKET).list("", { limit: 1 });
			if (!listErr) bucketOk = true;
			else {
				const msg = listErr.message || "";
				if (/not found|does not exist/i.test(msg)) error = `Bucket "${BUCKET}" not found in project ${projectRef ?? "?"}.`;
				else bucketOk = true;
			}
		} catch (e) {
			error = String(e?.message ?? e);
		}
		const next = {
			projectRef,
			projectOk,
			bucketOk,
			checking: false,
			error
		};
		setPreflight(next);
		return next;
	}
	(0, import_react.useEffect)(() => {
		runPreflight();
	}, []);
	async function handlePhotoUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!/^image\/(jpe?g|png|webp|gif|avif)$/i.test(file.type)) {
			toast.error("Please choose a JPG, PNG, or WebP image.");
			e.target.value = "";
			return;
		}
		setUploadingPhoto(true);
		try {
			const pf = preflight.checking || !preflight.bucketOk ? await runPreflight() : preflight;
			if (!pf.projectOk) throw new Error(`Wrong Supabase project (got "${pf.projectRef ?? "?"}").`);
			if (!pf.bucketOk) throw new Error(pf.error ?? `Bucket "${BUCKET}" is not available.`);
			const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
			const filePath = `profile/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
			const { error: upErr } = await supabase.storage.from(BUCKET).upload(filePath, file, {
				cacheControl: "3600",
				upsert: false,
				contentType: file.type
			});
			if (upErr) throw upErr;
			const publicUrlResult = supabase.storage.from(BUCKET).getPublicUrl(filePath);
			const publicUrl = publicUrlResult?.data?.publicUrl ?? publicUrlResult?.publicUrl;
			if (!publicUrl) throw new Error("Uploaded, but could not resolve public URL.");
			setData((d) => ({
				...d ?? {},
				photo_url: publicUrl
			}));
			toast.success("Photo uploaded — click Save profile to persist.");
		} catch (err) {
			const msg = String(err?.message ?? err ?? "Upload failed");
			toast.error(msg);
		} finally {
			setUploadingPhoto(false);
			e.target.value = "";
		}
	}
	(0, import_react.useEffect)(() => {
		supabase.from("profile").select("*").order("created_at", { ascending: true }).limit(1).maybeSingle().then(({ data, error }) => {
			if (error) toast.error(error.message);
			const row = data ?? {};
			setData(row);
			const bag = {};
			const existing = row.i18n ?? {};
			for (const f of fields) if (f.type === "i18n" || f.type === "i18n-textarea") {
				const plain = row[f.name] ?? "";
				bag[f.name] = {
					hy: existing[f.name]?.hy ?? plain ?? "",
					en: existing[f.name]?.en ?? plain ?? "",
					ru: existing[f.name]?.ru ?? plain ?? ""
				};
			}
			setI18n(bag);
		});
	}, []);
	async function save(e) {
		e.preventDefault();
		if (!data) return;
		setSaving(true);
		const { id, i18n: _ignore, ...rest } = data;
		const payload = { ...rest };
		for (const f of fields) if (f.type === "i18n" || f.type === "i18n-textarea") {
			const tri = i18n[f.name] ?? {
				hy: "",
				en: "",
				ru: ""
			};
			payload[f.name] = tri.en || tri.hy || tri.ru || REQUIRED_PROFILE_DEFAULTS[f.name] || null;
		}
		payload.name = payload.name || REQUIRED_PROFILE_DEFAULTS.name;
		payload.title = payload.title || REQUIRED_PROFILE_DEFAULTS.title;
		payload.i18n = i18n;
		const { data: savedProfile, error } = await saveAdminProfile(id, payload);
		setSaving(false);
		if (error) return toast.error(error.message);
		if (savedProfile) {
			setData(savedProfile);
			queryClient.setQueryData(profileQuery.queryKey, savedProfile);
		}
		toast.success("Profile saved");
	}
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Profile"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Shown on the homepage hero (name, title), About page (tagline, bio), and Contact page (email, phone). Social links are managed under Social Links."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreflightBanner, {
			preflight,
			onRetry: runPreflight
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "glass mt-6 grid gap-4 rounded-2xl p-6 sm:grid-cols-2",
			children: [
				fields.map((f) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: f.type === "textarea" || f.type === "i18n" || f.type === "i18n-textarea" || f.type === "image" ? "sm:col-span-2" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
							children: f.label
						}), f.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 rounded-md border border-border bg-background/40 p-3 sm:flex-row sm:items-center",
							children: [data[f.name] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: data[f.name] ?? "",
								alt: "Profile preview",
								className: "h-24 w-24 rounded-md border border-border object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-24 w-24 items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground",
								children: "No image"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background/60 px-3 py-2 text-sm hover:bg-accent",
									children: [uploadingPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "h-4 w-4 animate-spin",
										viewBox: "0 0 24 24",
										fill: "none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "10",
											stroke: "currentColor",
											strokeWidth: "4",
											className: "opacity-25"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M4 12a8 8 0 018-8",
											stroke: "currentColor",
											strokeWidth: "4",
											className: "opacity-75"
										})]
									}), "Uploading…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Choose image…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/jpeg,image/png,image/webp,image/gif,image/avif",
										disabled: uploadingPhoto,
										onChange: handlePhotoUpload,
										className: "hidden"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "url",
									placeholder: "…or paste an image URL",
									value: data[f.name] ?? "",
									onChange: (e) => setData({
										...data,
										[f.name]: e.target.value
									}),
									className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-xs outline-none focus:border-primary"
								})]
							})]
						}) : f.type === "i18n" || f.type === "i18n-textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nInput, {
							value: i18n[f.name] ?? {
								hy: "",
								en: "",
								ru: ""
							},
							multiline: f.type === "i18n-textarea",
							onChange: (v) => setI18n({
								...i18n,
								[f.name]: v
							})
						}) : f.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 5,
							value: data[f.name] ?? "",
							onChange: (e) => setData({
								...data,
								[f.name]: e.target.value
							}),
							className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: f.type === "url" ? "url" : "text",
							value: data[f.name] ?? "",
							onChange: (e) => setData({
								...data,
								[f.name]: e.target.value
							}),
							className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
						})]
					}, f.name);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPanel, {
						fields,
						values: data,
						i18nValues: i18n,
						title: "Public preview"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: saving,
						className: "rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60",
						children: saving ? "Saving…" : "Save profile"
					})
				})
			]
		})
	] });
}
function I18nInput({ value, onChange, multiline }) {
	const [active, setActive] = (0, import_react.useState)("en");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-background/40 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 flex gap-1",
			children: LANG_TABS.map((t) => {
				const filled = (value?.[t.code] ?? "").trim().length > 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActive(t.code),
					className: `rounded-md px-2.5 py-1 text-xs font-medium ${active === t.code ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-accent"}`,
					children: [t.label, !filled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-destructive",
						children: "•"
					})]
				}, t.code);
			})
		}), multiline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows: 5,
			value: value?.[active] ?? "",
			onChange: (e) => onChange({
				...value,
				[active]: e.target.value
			}),
			className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value: value?.[active] ?? "",
			onChange: (e) => onChange({
				...value,
				[active]: e.target.value
			}),
			className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
		})]
	});
}
function PreflightBanner({ preflight, onRetry }) {
	const { checking, projectRef, projectOk, bucketOk, error } = preflight;
	const ok = projectOk && bucketOk;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${checking ? "border-border bg-background/40 text-muted-foreground" : ok ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-destructive/50 bg-destructive/10 text-destructive"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium",
				children: checking ? "Checking Supabase connection…" : ok ? `Connected to project "${projectRef}" · bucket "${BUCKET}" ready` : "Storage preflight failed"
			}), !checking && !ok && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs opacity-90",
				children: [
					"Project: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: projectRef ?? "unknown" }),
					null,
					" · ",
					"Bucket \"",
					BUCKET,
					"\": ",
					bucketOk ? "ok" : "missing",
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", error] }) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onRetry,
			className: "rounded-md border border-current/30 px-3 py-1 text-xs font-medium hover:bg-current/10",
			children: "Re-check"
		})]
	});
}
//#endregion
export { ProfileEditor as component };

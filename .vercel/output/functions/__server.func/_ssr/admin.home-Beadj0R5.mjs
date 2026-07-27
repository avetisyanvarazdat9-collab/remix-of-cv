import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PreviewPanel } from "./PreviewPanel-BRlKFamg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.home-Beadj0R5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		title: "Hero",
		hint: "Top of the homepage. Name, title and bio come from the Profile page.",
		fields: [
			{
				name: "hero_badge",
				label: "Badge text",
				type: "i18n"
			},
			{
				name: "hero_btn1_label",
				label: "Button 1 — label",
				type: "i18n"
			},
			{
				name: "hero_btn1_url",
				label: "Button 1 — URL",
				type: "url"
			},
			{
				name: "hero_btn2_label",
				label: "Button 2 — label",
				type: "i18n"
			},
			{
				name: "hero_btn2_url",
				label: "Button 2 — URL",
				type: "url"
			},
			{
				name: "hero_btn3_label",
				label: "Button 3 — label",
				type: "i18n"
			},
			{
				name: "hero_btn3_url",
				label: "Button 3 — URL",
				type: "url"
			}
		]
	},
	{
		title: "About section",
		fields: [
			{
				name: "about_label",
				label: "Eyebrow label",
				type: "i18n"
			},
			{
				name: "about_heading",
				label: "Heading",
				type: "i18n"
			},
			{
				name: "about_btn_label",
				label: "Button label",
				type: "i18n"
			},
			{
				name: "about_btn_url",
				label: "Button URL",
				type: "url"
			}
		]
	},
	{
		title: "Featured Courses section",
		fields: [{
			name: "courses_label",
			label: "Eyebrow label",
			type: "i18n"
		}, {
			name: "courses_heading",
			label: "Heading",
			type: "i18n"
		}]
	},
	{
		title: "Partners section",
		fields: [{
			name: "partners_heading",
			label: "Heading",
			type: "i18n"
		}]
	},
	{
		title: "Contact CTA",
		fields: [
			{
				name: "cta_heading",
				label: "Heading",
				type: "i18n"
			},
			{
				name: "cta_text",
				label: "Text",
				type: "i18n-textarea"
			},
			{
				name: "cta_btn_label",
				label: "Button label",
				type: "i18n"
			},
			{
				name: "cta_btn_url",
				label: "Button URL",
				type: "url"
			}
		]
	}
];
var LANG_TABS = [
	{
		code: "hy",
		label: "HY"
	},
	{
		code: "en",
		label: "EN"
	},
	{
		code: "ru",
		label: "RU"
	}
];
var ALL_FIELDS = SECTIONS.flatMap((s) => s.fields);
function HomeContentEditor() {
	const [data, setData] = (0, import_react.useState)(null);
	const [i18n, setI18n] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		supabase.from("home_content").select("*").eq("id", true).maybeSingle().then(({ data, error }) => {
			if (error) toast.error(error.message);
			const row = data ?? { id: true };
			setData(row);
			const existing = row.i18n ?? {};
			const bag = {};
			for (const f of ALL_FIELDS) if (f.type === "i18n" || f.type === "i18n-textarea") {
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
		const payload = {
			...data,
			id: true
		};
		for (const f of ALL_FIELDS) if (f.type === "i18n" || f.type === "i18n-textarea") {
			const tri = i18n[f.name] ?? {
				hy: "",
				en: "",
				ru: ""
			};
			payload[f.name] = tri.en || tri.hy || tri.ru || null;
		}
		payload.i18n = i18n;
		const { error } = await supabase.from("home_content").upsert(payload, { onConflict: "id" });
		setSaving(false);
		if (error) return toast.error(error.message);
		queryClient.invalidateQueries({ queryKey: ["home_content"] });
		toast.success("Homepage saved — live on the public site");
	}
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Homepage content"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Edit copy in Armenian, English and Russian. Visitors see the version matching their selected language."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "mt-6 space-y-6",
			children: [
				SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: section.title
						}),
						section.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: section.hint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-4 sm:grid-cols-2",
							children: section.fields.map((f) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: f.type === "textarea" || f.type === "i18n-textarea" ? "sm:col-span-2" : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
										children: f.label
									}), f.type === "i18n" || f.type === "i18n-textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nInput, {
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
										rows: 3,
										value: data[f.name] ?? "",
										onChange: (e) => setData({
											...data,
											[f.name]: e.target.value
										}),
										className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: f.type === "url" ? "/path, https://… or mailto:" : "",
										value: data[f.name] ?? "",
										onChange: (e) => setData({
											...data,
											[f.name]: e.target.value
										}),
										className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
									})]
								}, f.name);
							})
						})
					]
				}, section.title)),
				SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPanel, {
					title: `${section.title} preview`,
					fields: section.fields.map((f) => ({
						name: f.name,
						label: f.label,
						type: f.type
					})),
					values: data,
					i18nValues: i18n
				}, `preview-${section.title}`)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky bottom-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: saving,
						className: "rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg disabled:opacity-60",
						children: saving ? "Saving…" : "Save homepage"
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
			rows: 3,
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
//#endregion
export { HomeContentEditor as component };

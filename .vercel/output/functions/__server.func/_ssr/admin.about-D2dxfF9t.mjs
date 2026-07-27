import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { d as profileQuery } from "./queries-BL4k_rC0.mjs";
import { V as GraduationCap, q as Earth, r as Wrench, s as User } from "../_libs/lucide-react.mjs";
import { t as saveAdminProfile } from "./profile-save-DmPKqazh.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.about-D2dxfF9t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function parseI18nBag(raw) {
	if (!raw) return {};
	if (typeof raw === "string") try {
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
	} catch {
		return {};
	}
	if (typeof raw === "object" && !Array.isArray(raw)) return raw;
	return {};
}
function hydrateProfileI18nFields(row, fieldNames) {
	const existing = parseI18nBag(row?.i18n);
	const bag = {};
	for (const name of fieldNames) {
		const plain = String(row?.[name] ?? "");
		const tri = existing[name];
		bag[name] = {
			hy: tri?.hy ?? plain,
			en: tri?.en ?? plain,
			ru: tri?.ru ?? plain
		};
	}
	return bag;
}
function mergeProfileI18nPayload(existingI18n, next) {
	return {
		...parseI18nBag(existingI18n),
		...next
	};
}
var I18N_FIELD_NAMES = ["tagline", "bio"];
var I18N_FIELDS = [{
	name: "tagline",
	label: "Tagline",
	multiline: false
}, {
	name: "bio",
	label: "Bio (Markdown)",
	multiline: true
}];
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
var REQUIRED_PROFILE_DEFAULTS = {
	name: "Dr. Varazdat Avetisyan",
	title: "AI/ML Researcher, Lecturer & Entrepreneur"
};
function AboutEditor() {
	const queryClient = useQueryClient();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [i18n, setI18n] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const i18nRef = (0, import_react.useRef)(i18n);
	i18nRef.current = i18n;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		supabase.from("profile").select("*").order("created_at", { ascending: true }).limit(1).maybeSingle().then(({ data, error }) => {
			if (cancelled) return;
			if (error) toast.error(error.message);
			const row = data ?? {};
			setProfile(row);
			setI18n(hydrateProfileI18nFields(row, I18N_FIELD_NAMES));
		});
		return () => {
			cancelled = true;
		};
	}, []);
	async function save(e) {
		e.preventDefault();
		if (!profile) return;
		setSaving(true);
		const currentI18n = i18nRef.current;
		const { id, i18n: existingI18n, ...rest } = profile;
		const payload = { ...rest };
		for (const f of I18N_FIELDS) {
			const tri = currentI18n[f.name] ?? {
				hy: "",
				en: "",
				ru: ""
			};
			payload[f.name] = tri.en || tri.hy || tri.ru || null;
		}
		payload.name = payload.name || REQUIRED_PROFILE_DEFAULTS.name;
		payload.title = payload.title || REQUIRED_PROFILE_DEFAULTS.title;
		payload.i18n = mergeProfileI18nPayload(existingI18n, currentI18n);
		const { data: savedProfile, error } = await saveAdminProfile(id, payload);
		setSaving(false);
		if (error) return toast.error(error.message);
		const nextI18n = mergeProfileI18nPayload(existingI18n, currentI18n);
		setI18n(nextI18n);
		if (savedProfile) {
			setProfile(savedProfile);
			queryClient.setQueryData(profileQuery.queryKey, savedProfile);
		} else queryClient.setQueryData(profileQuery.queryKey, (prev) => prev ? {
			...prev,
			...payload,
			i18n: nextI18n
		} : prev);
		toast.success("About saved");
	}
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "About"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Edit the About page narrative (tagline and bio). Skills, education, and professional development are managed separately — use the links below."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: "glass mt-6 grid gap-4 rounded-2xl p-6",
			children: [I18N_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
				children: f.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nInput, {
				value: i18n[f.name] ?? {
					hy: "",
					en: "",
					ru: ""
				},
				multiline: f.multiline,
				onChange: (v) => setI18n((prev) => ({
					...prev,
					[f.name]: v
				}))
			})] }, f.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: saving,
					className: "rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60",
					children: saving ? "Saving…" : "Save about"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/profile",
					className: "glass rounded-xl p-5 hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mb-2 size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-semibold",
							children: "Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Name, title, contacts — social links are under Social Links"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/skills",
					className: "glass rounded-xl p-5 hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "mb-2 size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-semibold",
							children: "Skills"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Shown in the Skills section on the About page"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/education",
					className: "glass rounded-xl p-5 hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "mb-2 size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-semibold",
							children: "Education"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Shown in the Education section on the About page"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/professional-development",
					className: "glass rounded-xl p-5 hover:border-primary/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "mb-2 size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-semibold",
							children: "Professional Development"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Trainings, workshops, and exchanges on the About page"
						})
					]
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
			rows: 14,
			value: value?.[active] ?? "",
			onChange: (e) => onChange({
				...value,
				[active]: e.target.value
			}),
			className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
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
export { AboutEditor as component };

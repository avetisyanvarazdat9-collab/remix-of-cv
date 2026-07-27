import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as useT, i as useLocalized } from "./i18n-CteB24FQ.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { d as profileQuery, m as socialLinksQuery } from "./queries-BL4k_rC0.mjs";
import { A as Mail, H as Globe, S as Phone, k as MapPin } from "../_libs/lucide-react.mjs";
import { t as PublicLayout } from "./PublicLayout-Cen2Ba9c.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as SocialLinksContactList } from "./SocialLinks-CqGACBRm.mjs";
import { d as stringType, u as objectType } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BKURd8cG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(1).max(100),
	email: stringType().trim().email().max(255),
	subject: stringType().trim().max(200).optional(),
	body: stringType().trim().min(1).max(5e3)
});
function ContactPage() {
	const { data: profile } = useSuspenseQuery(profileQuery);
	const { data: socialLinks } = useSuspenseQuery(socialLinksQuery);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const t = useT();
	const loc = useLocalized();
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const parsed = schema.safeParse({
			name: fd.get("name"),
			email: fd.get("email"),
			subject: fd.get("subject"),
			body: fd.get("body")
		});
		if (!parsed.success) {
			toast.error(t("contact.invalid"));
			return;
		}
		setSubmitting(true);
		const { error } = await supabase.from("messages").insert(parsed.data);
		setSubmitting(false);
		if (error) {
			toast.error(`${t("contact.failed")} ${error.message}`);
			return;
		}
		toast.success(t("contact.success"));
		e.target.reset();
	}
	const location = loc(profile, "location");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-5xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold sm:text-5xl",
				children: t("contact.heading")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: t("contact.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-8 space-y-3 text-sm",
				children: [
					profile?.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${profile.email}`,
							className: "hover:underline",
							children: profile.email
						})]
					}),
					profile?.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${profile.phone.replace(/\s/g, "")}`,
							className: "hover:underline",
							children: profile.phone
						})]
					}),
					location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: location })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLinksContactList, { links: socialLinks ?? [] }),
					profile?.website_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: profile.website_url,
							target: "_blank",
							rel: "noreferrer",
							className: "hover:underline",
							children: profile.website_url
						})]
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "glass space-y-4 rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("contact.name"),
					name: "name",
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("contact.email"),
					name: "email",
					type: "email",
					required: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("contact.subject"),
					name: "subject"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-sm",
					children: t("contact.message")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "body",
					required: true,
					rows: 5,
					className: "w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: submitting,
					className: "w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60",
					children: submitting ? t("contact.sending") : t("contact.send")
				})
			]
		})]
	}) });
}
function Field({ label, name, type = "text", required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mb-1 block text-sm",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		name,
		type,
		required,
		className: "w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary"
	})] });
}
//#endregion
export { ContactPage as component };

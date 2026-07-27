import { t as SITE_BRAND_NAME } from "./brand-DvNO_CtP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-BFIIP3tD.js
/** Global SEO defaults and head helpers for TanStack Router `head()`. */
var SITE_URL = "https://avetisyan.vercel.app";
var SITE_NAME = SITE_BRAND_NAME;
var DEFAULT_DESCRIPTION = "AI education, research, consulting, digital transformation, and professional collaboration by Dr. Varazdat Avetisyan.";
/** Existing production OG image already referenced in the root route. */
var DEFAULT_OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0e767d5-d112-4ce3-ae79-0843fa5e0615/id-preview-67305ffb--191e9f79-a96f-417b-b1b9-1aa3a4a37262.lovable.app-1784456274077.png";
var STATIC_SITEMAP_PATHS = [
	"/",
	"/about",
	"/learn",
	"/transform",
	"/collaborate",
	"/impact",
	"/contact",
	"/projects",
	"/blog",
	"/courses",
	"/video-courses",
	"/talks",
	"/timeline",
	"/cv",
	"/companies",
	"/privacy"
];
function absoluteUrl(path) {
	if (!path || path === "/") return `${SITE_URL}/`;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
/** Resolve translatable CMS text for SEO (English-first, mirrors public i18n fallbacks). */
function localizedField(row, field) {
	if (!row) return "";
	const bag = row.i18n?.[field];
	if (bag) {
		const v = bag.en ?? bag.hy ?? bag.ru;
		if (v && String(v).trim() !== "") return String(v);
	}
	const fallback = row[field];
	return fallback != null ? String(fallback) : "";
}
function truncateDescription(text, max = 160) {
	const clean = text.replace(/\s+/g, " ").trim();
	if (!clean) return DEFAULT_DESCRIPTION;
	if (clean.length <= max) return clean;
	return `${clean.slice(0, max - 1).trimEnd()}…`;
}
function buildPageHead(options) {
	const description = options.description ?? "AI education, research, consulting, digital transformation, and professional collaboration by Dr. Varazdat Avetisyan.";
	const canonical = absoluteUrl(options.path);
	const ogImage = options.ogImage || "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0e767d5-d112-4ce3-ae79-0843fa5e0615/id-preview-67305ffb--191e9f79-a96f-417b-b1b9-1aa3a4a37262.lovable.app-1784456274077.png";
	const robots = options.robots ?? "index, follow";
	const ogType = options.ogType ?? "website";
	const meta = [
		{ title: options.title },
		{
			name: "description",
			content: description
		},
		{
			name: "robots",
			content: robots
		},
		{
			property: "og:title",
			content: options.title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: ogType
		},
		{
			property: "og:url",
			content: canonical
		},
		{
			property: "og:site_name",
			content: SITE_NAME
		},
		{
			property: "og:image",
			content: ogImage
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: options.title
		},
		{
			name: "twitter:description",
			content: description
		},
		{
			name: "twitter:image",
			content: ogImage
		}
	];
	if (options.keywords) meta.push({
		name: "keywords",
		content: options.keywords
	});
	const links = [{
		rel: "canonical",
		href: canonical
	}];
	const scripts = options.jsonLd ? [{
		type: "application/ld+json",
		children: JSON.stringify(options.jsonLd)
	}] : void 0;
	return {
		meta,
		links,
		...scripts ? { scripts } : {}
	};
}
function buildGlobalHead() {
	return { meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: `${SITE_NAME} — AI Educator, Researcher & Technologist` },
		{
			name: "description",
			content: DEFAULT_DESCRIPTION
		},
		{
			name: "robots",
			content: "index, follow"
		},
		{
			property: "og:title",
			content: `${SITE_NAME} — AI Educator, Researcher & Technologist`
		},
		{
			property: "og:description",
			content: DEFAULT_DESCRIPTION
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:site_name",
			content: SITE_NAME
		},
		{
			property: "og:image",
			content: DEFAULT_OG_IMAGE
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: `${SITE_NAME} — AI Educator, Researcher & Technologist`
		},
		{
			name: "twitter:description",
			content: DEFAULT_DESCRIPTION
		},
		{
			name: "twitter:image",
			content: DEFAULT_OG_IMAGE
		}
	] };
}
function buildPersonJsonLd(profile, socialUrls) {
	const name = localizedField(profile, "name") || SITE_NAME;
	const jobTitle = localizedField(profile, "title") || "AI Educator, Data Scientist, CTO, University Professor";
	const description = truncateDescription(localizedField(profile, "bio") || "AI education, research, consulting, digital transformation, and professional collaboration by Dr. Varazdat Avetisyan.", 500);
	const sameAs = [...socialUrls ?? [], profile?.website_url].filter((url) => typeof url === "string" && url.startsWith("http"));
	const schema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name,
		jobTitle,
		description,
		url: absoluteUrl("/")
	};
	if (profile?.photo_url) schema.image = profile.photo_url;
	if (sameAs.length > 0) schema.sameAs = sameAs;
	return schema;
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
//#endregion
export { buildPersonJsonLd as a, truncateDescription as c, buildPageHead as i, absoluteUrl as n, escapeXml as o, buildGlobalHead as r, localizedField as s, STATIC_SITEMAP_PATHS as t };

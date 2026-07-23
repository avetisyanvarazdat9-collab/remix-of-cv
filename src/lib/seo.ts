/** Global SEO defaults and head helpers for TanStack Router `head()`. */

export const SITE_URL = "https://avetisyan.vercel.app";
export const SITE_NAME = "Dr. Varazdat Avetisyan";
export const DEFAULT_DESCRIPTION =
  "AI education, research, consulting, digital transformation, and professional collaboration by Dr. Varazdat Avetisyan.";

/** Existing production OG image already referenced in the root route. */
export const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0e767d5-d112-4ce3-ae79-0843fa5e0615/id-preview-67305ffb--191e9f79-a96f-417b-b1b9-1aa3a4a37262.lovable.app-1784456274077.png";

export const STATIC_SITEMAP_PATHS = [
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
  "/privacy",
] as const;

type I18nBag = Record<string, Record<string, string>> | null | undefined;

export type PageSeoOptions = {
  title: string;
  description?: string;
  path: string;
  ogType?: "website" | "article";
  ogImage?: string | null;
  robots?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Resolve translatable CMS text for SEO (English-first, mirrors public i18n fallbacks). */
export function localizedField(
  row: Record<string, unknown> | null | undefined,
  field: string,
): string {
  if (!row) return "";
  const bag = (row.i18n as I18nBag)?.[field];
  if (bag) {
    const v = bag.en ?? bag.hy ?? bag.ru;
    if (v && String(v).trim() !== "") return String(v);
  }
  const fallback = row[field];
  return fallback != null ? String(fallback) : "";
}

export function truncateDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return DEFAULT_DESCRIPTION;
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function buildPageHead(options: PageSeoOptions) {
  const description = options.description ?? DEFAULT_DESCRIPTION;
  const canonical = absoluteUrl(options.path);
  const ogImage = options.ogImage || DEFAULT_OG_IMAGE;
  const robots = options.robots ?? "index, follow";
  const ogType = options.ogType ?? "website";

  const meta: Array<Record<string, string>> = [
    { title: options.title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { property: "og:title", content: options.title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: canonical },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: options.title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
  ];

  if (options.keywords) {
    meta.push({ name: "keywords", content: options.keywords });
  }

  const links = [{ rel: "canonical", href: canonical }];

  const scripts = options.jsonLd
    ? [{ type: "application/ld+json", children: JSON.stringify(options.jsonLd) }]
    : undefined;

  return { meta, links, ...(scripts ? { scripts } : {}) };
}

export function buildGlobalHead() {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE_NAME} — AI Educator, Researcher & Technologist` },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: `${SITE_NAME} — AI Educator, Researcher & Technologist` },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME} — AI Educator, Researcher & Technologist` },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
  };
}

type ProfileLike = {
  name?: string | null;
  title?: string | null;
  bio?: string | null;
  photo_url?: string | null;
  website_url?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  twitter_url?: string | null;
  i18n?: unknown;
} | null | undefined;

export function buildPersonJsonLd(profile?: ProfileLike) {
  const name = localizedField(profile as Record<string, unknown>, "name") || SITE_NAME;
  const jobTitle =
    localizedField(profile as Record<string, unknown>, "title") ||
    "AI Educator, Data Scientist, CTO, University Professor";
  const description = truncateDescription(
    localizedField(profile as Record<string, unknown>, "bio") || DEFAULT_DESCRIPTION,
    500,
  );

  const sameAs = [
    profile?.linkedin_url,
    profile?.github_url,
    profile?.twitter_url,
    profile?.website_url,
  ].filter((url): url is string => typeof url === "string" && url.startsWith("http"));

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url: absoluteUrl("/"),
  };

  if (profile?.photo_url) schema.image = profile.photo_url;
  if (sameAs.length > 0) schema.sameAs = sameAs;

  return schema;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

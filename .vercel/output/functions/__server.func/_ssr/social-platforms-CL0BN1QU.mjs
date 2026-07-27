import { P as Linkedin, U as Github, t as Youtube } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/social-platforms-CL0BN1QU.js
var SOCIAL_PLATFORMS = [
	{
		id: "facebook",
		label: "Facebook",
		defaultOrder: 1,
		glyph: "f"
	},
	{
		id: "instagram",
		label: "Instagram",
		defaultOrder: 2,
		glyph: "IG"
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		defaultOrder: 3,
		icon: Linkedin
	},
	{
		id: "github",
		label: "GitHub",
		defaultOrder: 4,
		icon: Github
	},
	{
		id: "twitter",
		label: "Twitter / X",
		defaultOrder: 5,
		glyph: "𝕏"
	},
	{
		id: "youtube",
		label: "YouTube",
		defaultOrder: 6,
		icon: Youtube
	},
	{
		id: "telegram",
		label: "Telegram",
		defaultOrder: 7,
		glyph: "TG"
	},
	{
		id: "tiktok",
		label: "TikTok",
		defaultOrder: 8,
		glyph: "TT"
	}
];
var PLATFORM_MAP = Object.fromEntries(SOCIAL_PLATFORMS.map((p) => [p.id, p]));
function getSocialPlatform(id) {
	return PLATFORM_MAP[id];
}
function isValidSocialUrl(url) {
	const trimmed = url.trim();
	if (!trimmed) return false;
	try {
		const parsed = new URL(trimmed);
		return parsed.protocol === "http:" || parsed.protocol === "https:";
	} catch {
		return false;
	}
}
function normalizeSocialUrl(url) {
	const trimmed = url.trim();
	if (!trimmed) return "";
	if (/^https?:\/\//i.test(trimmed)) return trimmed;
	return `https://${trimmed}`;
}
//#endregion
export { normalizeSocialUrl as i, getSocialPlatform as n, isValidSocialUrl as r, SOCIAL_PLATFORMS as t };

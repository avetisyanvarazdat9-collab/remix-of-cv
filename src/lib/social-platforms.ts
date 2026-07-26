import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Youtube } from "lucide-react";

export const SOCIAL_PLATFORM_IDS = [
  "facebook",
  "instagram",
  "linkedin",
  "github",
  "twitter",
  "youtube",
  "telegram",
  "tiktok",
] as const;

export type SocialPlatformId = (typeof SOCIAL_PLATFORM_IDS)[number];

export type SocialPlatformConfig = {
  id: SocialPlatformId;
  label: string;
  defaultOrder: number;
  icon?: LucideIcon;
  glyph?: string;
};

export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  { id: "facebook", label: "Facebook", defaultOrder: 1, glyph: "f" },
  { id: "instagram", label: "Instagram", defaultOrder: 2, glyph: "IG" },
  { id: "linkedin", label: "LinkedIn", defaultOrder: 3, icon: Linkedin },
  { id: "github", label: "GitHub", defaultOrder: 4, icon: Github },
  { id: "twitter", label: "Twitter / X", defaultOrder: 5, glyph: "𝕏" },
  { id: "youtube", label: "YouTube", defaultOrder: 6, icon: Youtube },
  { id: "telegram", label: "Telegram", defaultOrder: 7, glyph: "TG" },
  { id: "tiktok", label: "TikTok", defaultOrder: 8, glyph: "TT" },
];

const PLATFORM_MAP = Object.fromEntries(SOCIAL_PLATFORMS.map((p) => [p.id, p])) as Record<
  SocialPlatformId,
  SocialPlatformConfig
>;

export function getSocialPlatform(id: string): SocialPlatformConfig | undefined {
  return PLATFORM_MAP[id as SocialPlatformId];
}

export function isValidSocialUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function normalizeSocialUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

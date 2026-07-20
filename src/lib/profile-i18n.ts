import type { Tables } from "@/integrations/supabase/types";

export type ProfileI18nTri = { hy: string; en: string; ru: string };

function parseI18nBag(raw: unknown): Record<string, Partial<ProfileI18nTri>> {
  if (!raw) return {};
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, Partial<ProfileI18nTri>>;
      }
    } catch {
      return {};
    }
  }
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, Partial<ProfileI18nTri>>;
  }
  return {};
}

export function hydrateProfileI18nFields(
  row: Partial<Tables<"profile">> | null | undefined,
  fieldNames: readonly string[],
): Record<string, ProfileI18nTri> {
  const existing = parseI18nBag((row as { i18n?: unknown } | null | undefined)?.i18n);
  const bag: Record<string, ProfileI18nTri> = {};

  for (const name of fieldNames) {
    const plain = String((row as Record<string, unknown> | null | undefined)?.[name] ?? "");
    const tri = existing[name];
    bag[name] = {
      hy: tri?.hy ?? plain,
      en: tri?.en ?? plain,
      ru: tri?.ru ?? plain,
    };
  }

  return bag;
}

export function mergeProfileI18nPayload(
  existingI18n: unknown,
  next: Record<string, ProfileI18nTri>,
): Record<string, ProfileI18nTri> {
  return { ...parseI18nBag(existingI18n), ...next };
}

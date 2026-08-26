type TargetLang = "hy" | "ru";

type Tri = { hy: string; en: string; ru: string };

const MYMEMORY_BASE = "https://api.mymemory.translated.net/get";

/** Translate English text to Armenian or Russian via MyMemory (no API key). */
export async function translateEnTo(text: string, target: TargetLang): Promise<string> {
  const url = `${MYMEMORY_BASE}?q=${encodeURIComponent(text)}&langpair=en|${target}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = (await res.json()) as {
    responseStatus?: number;
    responseDetails?: string;
    responseData?: { translatedText?: string };
  };

  if (json.responseStatus != null && json.responseStatus !== 200) {
    throw new Error(json.responseDetails ?? `API status ${json.responseStatus}`);
  }

  const translated = json.responseData?.translatedText?.trim();
  if (!translated) throw new Error("Empty translation response");

  return translated;
}

/**
 * For each of hy/ru: if blank and en is non-empty, auto-translate from en.
 * Existing non-empty hy/ru values are left unchanged. On API failure, falls back to en.
 */
export async function fillMissingTranslationsFromEn(i18n: Tri): Promise<Tri> {
  const en = i18n.en.trim();
  if (!en) return { ...i18n };

  const result = { ...i18n };

  for (const target of ["hy", "ru"] as const) {
    if (result[target].trim()) continue;

    try {
      result[target] = await translateEnTo(en, target);
    } catch (err) {
      console.warn(`[translate] Failed en→${target}, using en fallback:`, err);
      result[target] = en;
    }
  }

  return result;
}

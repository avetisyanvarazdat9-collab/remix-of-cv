import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LANGS, type Lang } from "@/lib/i18n";

type Tri = { hy?: string; en?: string; ru?: string };

export type PreviewField = {
  name: string;
  label: string;
  /** "i18n" or "i18n-textarea" → resolved via Tri; anything else shown verbatim. */
  type?: string;
};

/** Resolve a field for the chosen language with the same fallback chain as `localized()`. */
function resolve(values: Record<string, any>, name: string, lang: Lang): string {
  const v = values[name];
  if (v && typeof v === "object" && ("hy" in v || "en" in v || "ru" in v)) {
    const tri = v as Tri;
    return (tri[lang] ?? tri.en ?? tri.hy ?? tri.ru ?? "").toString();
  }
  return v == null ? "" : String(v);
}

/**
 * Live preview of unsaved form values rendered in HY/EN/RU.
 * `i18nValues` is an optional separate bag for forms (home/profile) that store
 * translatable fields outside the main `values` object.
 */
export function PreviewPanel({
  fields,
  values,
  i18nValues,
  title = "Preview",
}: {
  fields: PreviewField[];
  values: Record<string, any>;
  i18nValues?: Record<string, Tri>;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const merged: Record<string, any> = { ...values, ...(i18nValues ?? {}) };

  return (
    <div className="rounded-2xl border border-border bg-background/40">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
        >
          {open ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          {open ? `Hide ${title.toLowerCase()}` : `Show ${title.toLowerCase()}`}
        </button>
        {open && (
          <div className="flex gap-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:bg-accent"
                }`}
                title={l.native}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {open && (
        <div className="space-y-3 border-t border-border/60 px-4 py-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            How visitors will see this in <span className="text-foreground">{LANGS.find((l) => l.code === lang)?.native}</span> — unsaved.
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            {fields.map((f) => {
              const v = resolve(merged, f.name, lang);
              const isLong = f.type === "i18n-textarea" || f.type === "textarea";
              return (
                <div key={f.name} className={isLong ? "sm:col-span-2" : ""}>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                  <dd className={`mt-1 whitespace-pre-wrap break-words text-sm ${v ? "text-foreground" : "italic text-muted-foreground"}`}>
                    {v || "— empty —"}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      )}
    </div>
  );
}

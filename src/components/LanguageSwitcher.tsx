import { Globe } from "lucide-react";
import { LANGS, useLang, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <label className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-1 text-xs text-muted-foreground hover:text-foreground ${className}`}>
      <Globe className="size-3.5" aria-hidden />
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        className="cursor-pointer bg-transparent pr-1 text-xs font-medium text-foreground outline-none"
        aria-label="Select language"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} className="bg-background text-foreground">
            {l.label} · {l.native}
          </option>
        ))}
      </select>
    </label>
  );
}

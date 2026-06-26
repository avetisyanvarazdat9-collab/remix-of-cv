import { Link } from "@tanstack/react-router";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6">
        <p>© 2026 Varazdat Avetisyan</p>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hover:text-foreground">{t("footer.contact")}</Link>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}

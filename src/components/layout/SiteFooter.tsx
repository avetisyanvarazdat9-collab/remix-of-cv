import { Link } from "@tanstack/react-router";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/lib/i18n";
import { SITE_BRAND_NAME } from "@/lib/brand";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="section-divider mt-8 bg-[var(--surface-muted)]">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6">
        <p className="font-medium tracking-tight">© {new Date().getFullYear()} {SITE_BRAND_NAME} · All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/contact" className="transition-colors duration-200 hover:text-foreground">{t("footer.contact")}</Link>
          <Link to="/privacy" className="transition-colors duration-200 hover:text-foreground">Privacy Policy</Link>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}

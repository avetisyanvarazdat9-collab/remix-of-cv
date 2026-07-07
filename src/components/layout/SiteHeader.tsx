import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useSiteLogo } from "@/hooks/useSiteLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT, useLang } from "@/lib/i18n";
import { navigationMenuQuery } from "@/lib/queries";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();
  const logoUrl = useSiteLogo();
  const t = useT();
  const { lang } = useLang();
  const { data: navItems = [] } = useQuery(navigationMenuQuery);
  const visible = navItems.filter((n: any) => n.is_visible);
  const labelFor = (item: any) =>
    (item[`label_${lang}`] as string | null) || item.label_en || item.label || "";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center font-display text-base font-semibold tracking-tight" aria-label="Home">
          {logoUrl ? (
            <img src={logoUrl} alt="Site logo" className="h-10 max-h-10 w-auto object-contain" />
          ) : (
            <>Varazdat<span className="text-primary">.</span></>
          )}
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {visible.map((item: any) => (
            <Link
              key={item.id}
              to={item.path as any}
              className="nav-link rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
              activeProps={{ className: "nav-link rounded-md px-3 py-1.5 text-sm text-foreground bg-accent/60" }}
              activeOptions={{ exact: item.path === "/" }}
            >
              {labelFor(item)}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="hover-lift-sm ml-2 rounded-md border border-primary/40 px-3 py-1.5 text-sm text-primary hover:bg-primary/10"
            >
              {t("nav.admin")}
            </Link>
          )}
          <LanguageSwitcher className="ml-2" />
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background/95 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 p-4">
            {visible.map((item: any) => (
              <Link
                key={item.id}
                to={item.path as any}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground bg-accent" }}
                activeOptions={{ exact: item.path === "/" }}
              >
                {labelFor(item)}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="rounded-md border border-primary/40 px-3 py-2 text-sm text-primary"
              >
                {t("nav.admin")}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

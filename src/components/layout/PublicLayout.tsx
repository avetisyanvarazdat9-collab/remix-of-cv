import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useRealtimeCms } from "@/hooks/useRealtimeCms";

export function PublicLayout({ children }: { children: ReactNode }) {
  // Single shared realtime channel for all public CMS tables.
  useRealtimeCms();
  return (
    <div className="relative min-h-screen bg-background">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div
        aria-hidden
        className="ambient-orb pointer-events-none absolute -left-40 top-20 size-[480px] bg-primary/6"
      />
      <div
        aria-hidden
        className="ambient-orb pointer-events-none absolute -right-32 bottom-40 size-[400px] bg-accent/8"
        style={{ animationDelay: "-9s" }}
      />
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}

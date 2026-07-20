import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useRealtimeCms } from "@/hooks/useRealtimeCms";

export function PublicLayout({ children }: { children: ReactNode }) {
  // Single shared realtime channel for all public CMS tables.
  useRealtimeCms();
  return (
    <div className="relative min-h-screen w-full min-w-0 bg-background">
      {/* Decorative layer — fixed to viewport so negative offsets / blur never widen the page */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden isolate" aria-hidden>
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="ambient-orb absolute -left-40 top-20 size-[480px] bg-primary/6" />
        <div
          className="ambient-orb absolute -right-32 bottom-40 size-[400px] bg-accent/8"
          style={{ animationDelay: "-9s" }}
        />
      </div>
      <div className="relative z-10 flex min-h-screen w-full min-w-0 flex-col">
        <SiteHeader />
        <main className="min-w-0 flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}

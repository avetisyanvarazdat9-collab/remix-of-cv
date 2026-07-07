import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function HubHero({ eyebrow, heading, subheading, primaryTo, primaryLabel, secondaryTo, secondaryLabel }: {
  eyebrow: string; heading: string; subheading: string;
  primaryTo: string; primaryLabel: string; secondaryTo?: string; secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(60% 60% at 80% 0%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)" }} />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">{heading}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{subheading}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={primaryTo as any} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            {primaryLabel} <ArrowRight className="size-4" />
          </Link>
          {secondaryTo && secondaryLabel && (
            <Link to={secondaryTo as any} className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/10">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function HubSection({ eyebrow, heading, viewAllTo, children }: { eyebrow: string; heading: string; viewAllTo?: string; children: ReactNode }) {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{heading}</h2>
          </div>
          {viewAllTo && (
            <Link to={viewAllTo as any} className="text-sm text-primary hover:underline">View all →</Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function HubCTA({ heading, text, primaryTo, primaryLabel, icon: Icon }: {
  heading: string; text: string; primaryTo: string; primaryLabel: string; icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div aria-hidden className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(50% 60% at 50% 0%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 70%)" }} />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{heading}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{text}</p>
        <Link to={primaryTo as any} className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          <Icon className="size-4" /> {primaryLabel}
        </Link>
      </div>
    </section>
  );
}

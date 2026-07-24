import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe2 } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import heroPortrait from "@/assets/hero-portrait.jpg";
import type { Tables } from "@/integrations/supabase/types";

type FourDimension = Tables<"four_dimensions">;

type Pillar = {
  title: string;
  lead: string;
  bullets: string[];
  to: string | null;
  ctaLabel: string;
  isTimeline?: boolean;
  image: string;
  imageAlt: string;
  dimensionLabel: string;
  variant: "featured" | "stacked" | "overlay" | "horizontal";
  badgeText: string | null;
  engagementText: string | null;
  timelineButtonText: string | null;
  timelineButtonUrl: string | null;
};

const ROMAN = ["", "I", "II", "III", "IV"] as const;
const VARIANT_BY_NUMBER: Record<number, Pillar["variant"]> = {
  1: "featured",
  2: "stacked",
  3: "overlay",
  4: "horizontal",
};

function parseBullets(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return [];
}

function toPillar(row: FourDimension): Pillar {
  const bullets = parseBullets(row.bullet_points);
  const lead = row.description?.trim() || bullets[0] || "";
  const listBullets = row.description?.trim() ? bullets : bullets.slice(1);

  return {
    title: row.title,
    lead,
    bullets: listBullets,
    to: row.cta_button_url?.trim() || null,
    ctaLabel: row.cta_button_text?.trim() || "Learn More",
    isTimeline: row.show_timeline_footer,
    image: row.image_url?.trim() || heroPortrait,
    imageAlt: row.image_alt?.trim() || row.title,
    dimensionLabel: row.subtitle?.trim() || `Dimension ${ROMAN[row.dimension_number] ?? row.dimension_number}`,
    variant: VARIANT_BY_NUMBER[row.dimension_number] ?? "stacked",
    badgeText: row.badge_text,
    engagementText: row.engagement_text,
    timelineButtonText: row.timeline_button_text,
    timelineButtonUrl: row.timeline_button_url,
  };
}

function PillarBullets({ bullets }: { bullets: string[] }) {
  if (bullets.length === 0) return null;
  return (
    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function PillarLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to as never}
      className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
    >
      {label}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
    </Link>
  );
}

function formatBadgeText(template: string | null, countryCount: number) {
  if (template?.trim()) {
    return template.replace(/\{count\}/g, String(countryCount));
  }
  return countryCount > 0 ? `${countryCount} countries` : "Global reach";
}

function formatEngagementText(template: string | null, engagementCount: number) {
  if (template?.trim()) {
    return template.replace(/\{count\}/g, String(engagementCount));
  }
  return `${engagementCount}+ engagements`;
}

function TimelineFooter({
  pillar,
  countryCount,
  engagementCount,
}: {
  pillar: Pillar;
  countryCount: number;
  engagementCount: number;
}) {
  const buttonText = pillar.timelineButtonText?.trim() || "View Timeline";
  const buttonUrl = pillar.timelineButtonUrl?.trim() || "/timeline";

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-5">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
        <Globe2 className="size-3.5" />
        {formatBadgeText(pillar.badgeText, countryCount)}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground">
        {formatEngagementText(pillar.engagementText, engagementCount)}
      </span>
      <Link
        to={buttonUrl as never}
        className="hover-lift-sm ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        {buttonText} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function FeaturedCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="group relative min-h-[26rem] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] sm:min-h-[32rem] lg:min-h-full lg:h-full">
      <img
        src={pillar.image}
        alt={pillar.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[center_12%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/20" />
      <div className="relative flex h-full min-h-[26rem] flex-col justify-end p-6 sm:p-8 lg:min-h-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{pillar.dimensionLabel}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {pillar.title}
        </h3>
        {pillar.lead && <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/85">{pillar.lead}</p>}
        <PillarBullets bullets={pillar.bullets} />
        {pillar.to && <PillarLink to={pillar.to} label={pillar.ctaLabel} />}
      </div>
    </article>
  );
}

function StackedCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
        <img
          src={pillar.image}
          alt={pillar.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{pillar.dimensionLabel}</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">{pillar.title}</h3>
        {pillar.lead && <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pillar.lead}</p>}
        <PillarBullets bullets={pillar.bullets} />
        {pillar.to && <PillarLink to={pillar.to} label={pillar.ctaLabel} />}
      </div>
    </article>
  );
}

function OverlayCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="group relative min-h-[22rem] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] sm:min-h-[24rem]">
      <img
        src={pillar.image}
        alt={pillar.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/35 sm:via-background/88 sm:to-transparent" />
      <div className="relative flex h-full min-h-[22rem] max-w-lg flex-col justify-end p-6 sm:min-h-[24rem] sm:justify-center sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{pillar.dimensionLabel}</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {pillar.title}
        </h3>
        {pillar.lead && <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pillar.lead}</p>}
        <PillarBullets bullets={pillar.bullets} />
        {pillar.to && <PillarLink to={pillar.to} label={pillar.ctaLabel} />}
      </div>
    </article>
  );
}

function HorizontalCard({
  pillar,
  countryCount,
  engagementCount,
}: {
  pillar: Pillar;
  countryCount: number;
  engagementCount: number;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
      <div className="grid md:grid-cols-[minmax(0,42%)_minmax(0,1fr)]">
        <div className="relative min-h-[14rem] overflow-hidden md:min-h-[18rem]">
          <img
            src={pillar.image}
            alt={pillar.imageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-background/10" />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{pillar.dimensionLabel}</p>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {pillar.title}
          </h3>
          {pillar.lead && <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pillar.lead}</p>}
          <PillarBullets bullets={pillar.bullets} />
          {pillar.isTimeline && (
            <TimelineFooter pillar={pillar} countryCount={countryCount} engagementCount={engagementCount} />
          )}
        </div>
      </div>
    </article>
  );
}

function renderCard(
  pillar: Pillar,
  countryCount: number,
  engagementCount: number,
) {
  switch (pillar.variant) {
    case "featured":
      return <FeaturedCard pillar={pillar} />;
    case "stacked":
      return <StackedCard pillar={pillar} />;
    case "overlay":
      return <OverlayCard pillar={pillar} />;
    case "horizontal":
      return <HorizontalCard pillar={pillar} countryCount={countryCount} engagementCount={engagementCount} />;
  }
}

function gridClassForVariant(variant: Pillar["variant"]) {
  switch (variant) {
    case "featured":
      return "min-w-0 lg:col-span-7 lg:row-span-2";
    case "stacked":
    case "overlay":
      return "min-w-0 lg:col-span-5";
    case "horizontal":
      return "min-w-0 lg:col-span-12";
  }
}

function delayForVariant(variant: Pillar["variant"]) {
  switch (variant) {
    case "featured":
      return 0;
    case "stacked":
      return 80;
    case "overlay":
      return 160;
    case "horizontal":
      return 240;
  }
}

export function FourDimensionsSection({
  dimensions,
  countryCount,
  engagementCount,
}: {
  dimensions: FourDimension[];
  countryCount: number;
  engagementCount: number;
}) {
  const pillars = dimensions
    .slice()
    .sort((a, b) => a.display_order - b.display_order || a.dimension_number - b.dimension_number)
    .map(toPillar);

  if (pillars.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="ambient-orb right-0 top-0 size-[420px] translate-x-1/4 bg-primary/8"
          style={{ animationDelay: "-4s" }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Four Dimensions of Impact</p>
          <h2 className="section-heading mt-3 text-3xl sm:text-4xl">Four worlds. One practitioner.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Academic depth, industry execution, real teaching, and international perspective — combined in one
            person.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {pillars.map((pillar) => (
            <RevealOnScroll
              key={pillar.dimensionLabel + pillar.title}
              delay={delayForVariant(pillar.variant)}
              className={gridClassForVariant(pillar.variant)}
            >
              {renderCard(pillar, countryCount, engagementCount)}
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

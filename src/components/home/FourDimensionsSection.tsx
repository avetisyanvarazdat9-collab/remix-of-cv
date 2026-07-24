import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe2 } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import heroPortrait from "@/assets/hero-portrait.jpg";
import type { Tables } from "@/integrations/supabase/types";

type FourDimension = Tables<"four_dimensions">;

type Pillar = {
  dimensionNumber: number;
  title: string;
  lead: string;
  bullets: string[];
  to: string | null;
  ctaLabel: string;
  isTimeline?: boolean;
  image: string;
  imageAlt: string;
  dimensionLabel: string;
  badgeText: string | null;
  engagementText: string | null;
  timelineButtonText: string | null;
  timelineButtonUrl: string | null;
};

const ROMAN = ["", "I", "II", "III", "IV"] as const;

function parseBullets(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return [];
}

function toPillar(row: FourDimension): Pillar {
  const bullets = parseBullets(row.bullet_points);
  const lead = row.description?.trim() || bullets[0] || "";
  const listBullets = row.description?.trim() ? bullets : bullets.slice(1);

  return {
    dimensionNumber: row.dimension_number,
    title: row.title,
    lead,
    bullets: listBullets,
    to: row.cta_button_url?.trim() || null,
    ctaLabel: row.cta_button_text?.trim() || "Learn More",
    isTimeline: row.show_timeline_footer,
    image: row.image_url?.trim() || heroPortrait,
    imageAlt: row.image_alt?.trim() || row.title,
    dimensionLabel: row.subtitle?.trim() || `Dimension ${ROMAN[row.dimension_number] ?? row.dimension_number}`,
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
      className="group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
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
    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
        <Globe2 className="size-3.5" />
        {formatBadgeText(pillar.badgeText, countryCount)}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground">
        {formatEngagementText(pillar.engagementText, engagementCount)}
      </span>
      <Link
        to={buttonUrl as never}
        className="hover-lift-sm ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
      >
        {buttonText} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function imageObjectPosition(dimensionNumber: number) {
  return dimensionNumber === 1 ? "object-[center_12%]" : "object-center";
}

function DimensionCard({
  pillar,
  countryCount,
  engagementCount,
}: {
  pillar: Pillar;
  countryCount: number;
  engagementCount: number;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <img
          src={pillar.image}
          alt={pillar.imageAlt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageObjectPosition(pillar.dimensionNumber)}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{pillar.dimensionLabel}</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]">
          {pillar.title}
        </h3>
        {pillar.lead && <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pillar.lead}</p>}
        <PillarBullets bullets={pillar.bullets} />
        {pillar.isTimeline ? (
          <TimelineFooter pillar={pillar} countryCount={countryCount} engagementCount={engagementCount} />
        ) : (
          pillar.to && <PillarLink to={pillar.to} label={pillar.ctaLabel} />
        )}
      </div>
    </article>
  );
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {pillars.map((pillar, index) => (
            <RevealOnScroll key={pillar.dimensionLabel + pillar.title} delay={index * 80} className="min-w-0">
              <DimensionCard pillar={pillar} countryCount={countryCount} engagementCount={engagementCount} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

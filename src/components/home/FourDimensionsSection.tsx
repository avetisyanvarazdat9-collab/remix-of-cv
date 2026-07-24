import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe2 } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import heroPortrait from "@/assets/hero-portrait.jpg";

type Pillar = {
  title: string;
  bullets: string[];
  to: string | null;
  isTimeline?: boolean;
  image: string;
  imageAlt: string;
  variant: "featured" | "stacked" | "overlay" | "horizontal";
};

const PILLARS: Pillar[] = [
  {
    title: "Academic Leadership",
    bullets: [
      "PhD in Computer Engineering",
      "University Professor",
      "AI & Computer Science Educator",
      "Research & Curriculum Development",
      "International Academic Collaborations",
    ],
    to: "/collaborate",
    image: heroPortrait,
    imageAlt: "Portrait of Varazdat Avetisyan in academic setting",
    variant: "featured",
  },
  {
    title: "Industry Leadership",
    bullets: [
      "CTO & Co-Founder, Luseen Mobile",
      "AI Consultant",
      "Technology Strategy",
      "Software Engineering",
      "Digital Transformation",
    ],
    to: "/transform",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Technology leadership team collaborating in a modern workspace",
    variant: "stacked",
  },
  {
    title: "Education & Training",
    bullets: [
      "AI Course Development",
      "University Teaching",
      "Corporate Training",
      "Workshops & Professional Development",
      "Student Mentorship",
    ],
    to: "/learn",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Educator leading a professional training workshop",
    variant: "overlay",
  },
  {
    title: "International Experience",
    bullets: [
      "Trainings & workshops across Europe",
      "Academic exchange programs",
      "Conference speaking",
      "Cross-institutional research",
      "Global professional network",
    ],
    to: null,
    isTimeline: true,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "International travel and global professional collaboration",
    variant: "horizontal",
  },
];

function PillarBullets({ bullets }: { bullets: string[] }) {
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

function PillarLink({ to, label = "Learn More" }: { to: string; label?: string }) {
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

function TimelineFooter({
  countryCount,
  engagementCount,
}: {
  countryCount: number;
  engagementCount: number;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-5">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
        <Globe2 className="size-3.5" />
        {countryCount > 0 ? `${countryCount} countries` : "Global reach"}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 px-3 py-1 text-xs font-medium text-muted-foreground">
        {engagementCount}+ engagements
      </span>
      <Link
        to="/timeline"
        className="hover-lift-sm ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        View Timeline <ArrowRight className="size-4" />
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Dimension I</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {pillar.title}
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/85">{pillar.bullets[0]}</p>
        {pillar.bullets.length > 1 && <PillarBullets bullets={pillar.bullets.slice(1)} />}
        {pillar.to && <PillarLink to={pillar.to} />}
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Dimension II</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">{pillar.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pillar.bullets[0]}</p>
        {pillar.bullets.length > 1 && <PillarBullets bullets={pillar.bullets.slice(1)} />}
        {pillar.to && <PillarLink to={pillar.to} />}
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Dimension III</p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {pillar.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pillar.bullets[0]}</p>
        {pillar.bullets.length > 1 && <PillarBullets bullets={pillar.bullets.slice(1)} />}
        {pillar.to && <PillarLink to={pillar.to} />}
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Dimension IV</p>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {pillar.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{pillar.bullets[0]}</p>
          {pillar.bullets.length > 1 && <PillarBullets bullets={pillar.bullets.slice(1)} />}
          {pillar.isTimeline && (
            <TimelineFooter countryCount={countryCount} engagementCount={engagementCount} />
          )}
        </div>
      </div>
    </article>
  );
}

export function FourDimensionsSection({
  countryCount,
  engagementCount,
}: {
  countryCount: number;
  engagementCount: number;
}) {
  const [featured, stacked, overlay, horizontal] = PILLARS;

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
          <RevealOnScroll className="min-w-0 lg:col-span-7 lg:row-span-2">
            <FeaturedCard pillar={featured} />
          </RevealOnScroll>
          <RevealOnScroll delay={80} className="min-w-0 lg:col-span-5">
            <StackedCard pillar={stacked} />
          </RevealOnScroll>
          <RevealOnScroll delay={160} className="min-w-0 lg:col-span-5">
            <OverlayCard pillar={overlay} />
          </RevealOnScroll>
          <RevealOnScroll delay={240} className="min-w-0 lg:col-span-12">
            <HorizontalCard
              pillar={horizontal}
              countryCount={countryCount}
              engagementCount={engagementCount}
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Briefcase,
  Cpu,
  Database,
  GraduationCap,
  Layers,
  MessageSquare,
  Rocket,
  Sparkles,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type ExpertiseItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

type ExpertisePillar = {
  title: string;
  icon: LucideIcon;
  to: string;
  items: ExpertiseItem[];
  spanFull?: boolean;
};

const EXPERTISE_PILLARS: ExpertisePillar[] = [
  {
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    to: "/courses",
    items: [
      { label: "Artificial Intelligence", to: "/courses", icon: BrainCircuit },
      { label: "Generative AI", to: "/courses", icon: Sparkles },
      { label: "Data Science", to: "/courses", icon: Database },
      { label: "Machine Learning", to: "/courses", icon: Cpu },
      { label: "Deep Learning", to: "/courses", icon: Layers },
      { label: "Prompt Engineering", to: "/courses", icon: Wand2 },
      { label: "AI Agents", to: "/projects", icon: Bot },
    ],
  },
  {
    title: "Education",
    icon: GraduationCap,
    to: "/learn",
    items: [
      { label: "Computer Science Education", to: "/collaborate", icon: BookOpen },
      { label: "Educational Innovation", to: "/learn", icon: Rocket },
    ],
  },
  {
    title: "Consulting",
    icon: Briefcase,
    to: "/transform",
    spanFull: true,
    items: [{ label: "Digital Transformation", to: "/transform", icon: MessageSquare }],
  },
];

function BentoCard({ pillar, delay }: { pillar: ExpertisePillar; delay: number }) {
  const Icon = pillar.icon;

  return (
    <RevealOnScroll
      delay={delay}
      className={`min-w-0 ${pillar.spanFull ? "md:col-span-2" : ""}`}
    >
      <article className="group glass flex h-full flex-col rounded-2xl p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="icon-badge size-11 shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </div>
          <Link
            to={pillar.to as never}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            Explore
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {pillar.title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {pillar.items.map((item) => (
            <Link
              key={item.label}
              to={item.to as never}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-primary/8 hover:text-foreground"
            >
              <item.icon className="size-3.5 shrink-0 text-primary/80" />
              {item.label}
            </Link>
          ))}
        </div>
      </article>
    </RevealOnScroll>
  );
}

export function ExpertiseBentoSection() {
  return (
    <section className="section-divider section-surface py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Areas of expertise</p>
          <h2 className="section-heading mt-3 text-3xl sm:text-4xl">Where I can help</h2>
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {EXPERTISE_PILLARS.map((pillar, index) => (
            <BentoCard key={pillar.title} pillar={pillar} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

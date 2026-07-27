import { BrainCircuit, Briefcase, GraduationCap, type LucideIcon } from "lucide-react";
import type { ProfessionalFocusPillar } from "@/lib/parse-professional-focus";

const ICONS: Record<string, LucideIcon> = {
  "Artificial Intelligence": BrainCircuit,
  Education: GraduationCap,
  Consulting: Briefcase,
};

function pillarIcon(title: string): LucideIcon {
  return ICONS[title] ?? BrainCircuit;
}

export function ProfessionalFocusBento({ pillars }: { pillars: ProfessionalFocusPillar[] }) {
  return (
    <div
      data-testid="professional-focus-bento"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {pillars.map((pillar) => {
        const Icon = pillarIcon(pillar.title);
        return (
          <article
            key={pillar.title}
            className="group glass flex h-full flex-col rounded-2xl p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)] sm:p-7"
          >
            <div className="icon-badge size-11 shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>

            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
              {pillar.title}
            </h3>

            {pillar.tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
            )}
          </article>
        );
      })}
    </div>
  );
}

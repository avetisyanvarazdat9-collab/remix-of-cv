import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Mic2, Briefcase, Handshake } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { projectsQuery, talksQuery, companiesQuery } from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/collaborate")({
  head: () =>
    buildPageHead({
      title: "Collaborate — Research, Talks & Partnerships | Dr. Varazdat Avetisyan",
      description:
        "Research collaborations, speaking engagements, academic partnerships, and applied AI projects with Dr. Varazdat Avetisyan.",
      path: "/collaborate",
      keywords: "AI Speaker Armenia, Research collaboration, Academic partnership, AI keynote speaker",
    }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(projectsQuery);
    context.queryClient.ensureQueryData(talksQuery);
    context.queryClient.ensureQueryData(companiesQuery);
  },
  component: CollaborateHub,
});

function CollaborateHub() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const { data: talks } = useSuspenseQuery(talksQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const loc = useLocalized();

  const featuredProjects = (projects ?? []).filter((p: any) => p.is_visible).slice(0, 6);
  const featuredTalks = (talks ?? []).slice(0, 4);
  const partners = (companies ?? []).filter((c: any) => c.is_visible).slice(0, 8);

  return (
    <PublicLayout>
      <HubHero
        eyebrow="Collaborate"
        heading="Research, speaking, and partnerships"
        subheading="From joint research and grant proposals to keynote talks and cross-institutional programs — let's build something together."
        primaryTo="/contact"
        primaryLabel="Propose a Collaboration"
        secondaryTo="/talks"
        secondaryLabel="See Talks & Events"
      />

      <HubSection eyebrow="Projects" heading="Selected research & applied work" viewAllTo="/projects">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p: any) => (
            <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40">
              {p.image_url ? (
                <img src={p.image_url} alt={loc(p, "title")} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full bg-gradient-to-br from-primary/20 to-accent/20" />
              )}
              <div className="flex flex-1 flex-col p-5">
                <Briefcase className="size-5 text-primary" />
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">{loc(p, "title")}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{loc(p, "description")}</p>
              </div>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection eyebrow="Speaking" heading="Recent talks & events" viewAllTo="/talks">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredTalks.map((t: any) => (
            <article key={t.id} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <Mic2 className="size-5 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{loc(t, "title")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {[t.event_name, t.location].filter(Boolean).join(" · ")}
                {t.event_date && ` · ${new Date(t.event_date).toLocaleDateString(undefined, { year: "numeric", month: "short" })}`}
              </p>
              {loc(t, "description") && (
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{loc(t, "description")}</p>
              )}
            </article>
          ))}
        </div>
      </HubSection>

      <HubSection eyebrow="Partners" heading="Institutions I collaborate with" viewAllTo="/companies">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p: any) => (
            <a key={p.id} href={p.website_url ?? "#"} target={p.website_url ? "_blank" : undefined} rel="noreferrer"
               className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
              {p.logo_url && <img src={p.logo_url} alt="" className="size-10 rounded-md bg-background object-contain p-1" />}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                {p.role && <p className="truncate text-xs text-muted-foreground">{p.role}</p>}
              </div>
            </a>
          ))}
        </div>
      </HubSection>

      <HubCTA
        heading="Have an idea worth exploring together?"
        text="Research collaborations, guest lectures, joint grants, keynote talks, and industry partnerships are all welcome."
        primaryTo="/contact"
        primaryLabel="Get in Touch"
        icon={Handshake}
      />
    </PublicLayout>
  );
}

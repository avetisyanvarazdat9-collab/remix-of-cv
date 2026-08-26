import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Mic2, Briefcase, Handshake } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { projectsQuery, talksQuery, companiesQuery } from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";

const COLLABORATE_PAGE = "collaborate";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

export const Route = createFileRoute("/collaborate")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(projectsQuery),
      context.queryClient.ensureQueryData(talksQuery),
      context.queryClient.ensureQueryData(companiesQuery),
      context.queryClient.ensureQueryData(pageContentQuery(COLLABORATE_PAGE)),
    ]);
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(COLLABORATE_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(
        pageContent,
        "seo.title",
        "Collaborate Research, Talks & Partnerships | Dr. Varazdat Avetisyan",
      ),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "Research collaborations, speaking engagements, academic partnerships, and applied AI projects with Dr. Varazdat Avetisyan.",
      ),
      path: "/collaborate",
      keywords: pageContentLookup(
        pageContent,
        "seo.keywords",
        "AI Speaker Armenia, Research collaboration, Academic partnership, AI keynote speaker",
      ),
    });
  },
  component: CollaborateHub,
});

function CollaborateHub() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const { data: talks } = useSuspenseQuery(talksQuery);
  const { data: companies } = useSuspenseQuery(companiesQuery);
  const loc = useLocalized();
  const { pc } = usePageContent(COLLABORATE_PAGE);

  const featuredProjects = (projects ?? []).filter((p: any) => p.is_visible).slice(0, 6);
  const featuredTalks = (talks ?? []).slice(0, 4);
  const partners = (companies ?? []).filter((c: any) => c.is_visible).slice(0, 8);

  return (
    <PublicLayout>
      <HubHero
        eyebrow={pc("hero.eyebrow", "Collaborate")}
        heading={pc("hero.heading", "Research, speaking, and partnerships")}
        subheading={pc(
          "hero.subheading",
          "From joint research and grant proposals to keynote talks and cross-institutional programs, let's build something together.",
        )}
        primaryTo="/contact"
        primaryLabel={pc("hero.cta", "Propose a Collaboration")}
        secondaryTo="/talks"
        secondaryLabel={pc("hero.cta_secondary", "See Talks & Events")}
      />

      <HubSection
        eyebrow={pc("projects.eyebrow", "Projects")}
        heading={pc("projects.heading", "Selected research & applied work")}
        viewAllTo="/projects"
      >
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

      <HubSection
        eyebrow={pc("speaking.eyebrow", "Speaking")}
        heading={pc("speaking.heading", "Recent talks & events")}
        viewAllTo="/talks"
      >
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

      <HubSection
        eyebrow={pc("partners.eyebrow", "Partners")}
        heading={pc("partners.heading", "Institutions I collaborate with")}
        viewAllTo="/companies"
      >
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
        heading={pc("cta.heading", "Have an idea worth exploring together?")}
        text={pc(
          "cta.body",
          "Research collaborations, guest lectures, joint grants, keynote talks, and industry partnerships are all welcome.",
        )}
        primaryTo="/contact"
        primaryLabel={pc("cta.button", "Get in Touch")}
        icon={Handshake}
      />
    </PublicLayout>
  );
}

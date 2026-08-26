import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Building2, Users, Rocket, Sparkles, MessageSquare } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";

const TRANSFORM_PAGE = "transform";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

const SERVICE_ICONS = [BrainCircuit, Users, Building2, Rocket, Sparkles, MessageSquare] as const;

const SERVICE_FALLBACKS = [
  {
    title: "AI Strategy Consulting",
    text: "Assess your data landscape, identify high-impact AI use cases, and design a phased roadmap grounded in what's technically feasible.",
  },
  {
    title: "Corporate Training",
    text: "Custom workshops for executives, product teams, and engineers on Generative AI, Prompt Engineering, and AI Agents.",
  },
  {
    title: "Digital Transformation",
    text: "Guide your organization through AI-first product changes, org design, and hiring for data-driven capabilities.",
  },
  {
    title: "AI Product Design",
    text: "Co-design RAG systems, AI agents, and educational assistants from prototype to production.",
  },
  {
    title: "AI Adoption Programs",
    text: "Structured 8–12 week programs to embed AI literacy across your teams, with measurable outcomes.",
  },
  {
    title: "Executive Briefings",
    text: "Private sessions for leadership on what Generative AI, Agentic AI, and Foundation Models mean for your business.",
  },
] as const;

const STEP_FALLBACKS = [
  { title: "Discovery", body: "30-min consultation to understand goals, constraints, and success criteria." },
  { title: "Proposal", body: "Scoped proposal with milestones, deliverables, and pricing, usually within a week." },
  { title: "Delivery", body: "Weekly working sessions, hands-on artifacts, and clear progress tracking." },
  { title: "Handoff", body: "Documentation, training, and ongoing support so your team can run with it." },
] as const;

export const Route = createFileRoute("/transform")({
  loader: async ({ context }) => {
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(TRANSFORM_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(
        pageContent,
        "seo.title",
        "Transform AI Consulting & Corporate Training | Dr. Varazdat Avetisyan",
      ),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "AI consulting, corporate training, and digital transformation services for organizations adopting Generative AI, Machine Learning, and Data Science.",
      ),
      path: "/transform",
      keywords: pageContentLookup(
        pageContent,
        "seo.keywords",
        "AI Consultant Armenia, AI adoption, Digital transformation, Corporate AI training, Generative AI consulting",
      ),
    });
  },
  component: TransformHub,
});

function TransformHub() {
  const { pc } = usePageContent(TRANSFORM_PAGE);

  const SERVICES = SERVICE_FALLBACKS.map((service, index) => ({
    icon: SERVICE_ICONS[index],
    title: pc(`services.${index}.title`, service.title),
    text: pc(`services.${index}.body`, service.text),
  }));

  const STEPS = STEP_FALLBACKS.map((step, index) => ({
    n: String(index + 1).padStart(2, "0"),
    title: pc(`engagement.steps.${index}.title`, step.title),
    body: pc(`engagement.steps.${index}.body`, step.body),
  }));

  return (
    <PublicLayout>
      <HubHero
        eyebrow={pc("hero.eyebrow", "Transform")}
        heading={pc("hero.heading", "AI that changes how your organization works")}
        subheading={pc(
          "hero.subheading",
          "Consulting, corporate training, and AI adoption programs for leaders who want more than a demo; they want measurable transformation.",
        )}
        primaryTo="/contact"
        primaryLabel={pc("hero.cta_primary", "Request a Consultation")}
        secondaryTo="/companies"
        secondaryLabel={pc("hero.cta_secondary", "See Past Clients")}
      />

      <HubSection
        eyebrow={pc("services.eyebrow", "Services")}
        heading={pc("services.heading", "Ways I can help your team")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <s.icon className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </HubSection>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {pc("engagement.eyebrow", "Engagement model")}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
              {pc("engagement.heading", "How we work together")}
            </h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-4">
              {STEPS.map((step) => (
                <li key={step.n}>
                  <div className="font-display text-4xl font-bold text-primary/40">{step.n}</div>
                  <p className="mt-2 font-display text-base font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <HubCTA
        heading={pc("cta.heading", "Let's talk about your AI roadmap")}
        text={pc(
          "cta.body",
          "Tell me about your team and what you're trying to build. I'll follow up within two business days.",
        )}
        primaryTo="/contact"
        primaryLabel={pc("cta.button", "Request a Consultation")}
        icon={MessageSquare}
      />
    </PublicLayout>
  );
}

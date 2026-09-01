import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Building2, Users, Rocket, Sparkles, MessageSquare, GraduationCap, Layers, Target, Presentation, Network, Database, UsersRound, Workflow, Landmark, Cpu, ShoppingBag, HeartPulse, Factory, School } from "lucide-react";
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

const PROGRAM_ICONS = [GraduationCap, Layers, Target, Presentation] as const;

const PROGRAM_FALLBACKS = [
  {
    title: "Generative AI Fundamentals",
    text: "A foundational program for teams new to AI — core concepts, prompt engineering, and safe adoption practices.",
  },
  {
    title: "AI Leadership Bootcamp",
    text: "A focused program for executives and decision-makers on AI strategy, ROI, and organizational readiness.",
  },
  {
    title: "Technical Deep-Dive Workshops",
    text: "Hands-on sessions for engineering teams covering RAG systems, fine-tuning, and production AI architecture.",
  },
  {
    title: "Custom Enterprise Program",
    text: "A tailored multi-week curriculum designed around your organization's specific tools, data, and goals.",
  },
] as const;

const DT_PILLAR_ICONS = [Network, Database, UsersRound, Workflow] as const;

const DT_PILLAR_FALLBACKS = [
  {
    title: "Organizational Design",
    text: "Restructure teams and roles around AI-augmented workflows, with clear ownership and decision rights.",
  },
  {
    title: "Data Infrastructure",
    text: "Build the pipelines, storage, and governance foundations that make reliable AI adoption possible.",
  },
  {
    title: "Change Management",
    text: "Guide stakeholders through the cultural and process shifts that come with AI-first operations.",
  },
  {
    title: "Hiring & Upskilling",
    text: "Identify skill gaps, design upskilling paths, and hire for the capabilities your AI strategy needs.",
  },
] as const;

const INDUSTRY_ICONS = [Landmark, Cpu, ShoppingBag, HeartPulse, Factory, School] as const;

const INDUSTRY_FALLBACKS = [
  { title: "Finance & Banking", text: "Risk modeling, fraud detection, and AI-assisted decision support." },
  { title: "Technology & Software", text: "AI feature integration, developer tooling, and platform intelligence." },
  { title: "Retail & E-commerce", text: "Personalization, demand forecasting, and conversational commerce." },
  { title: "Healthcare", text: "Clinical decision support, documentation automation, and patient triage tools." },
  { title: "Manufacturing", text: "Predictive maintenance, quality inspection, and supply chain optimization." },
  { title: "Education", text: "Adaptive learning tools, curriculum design, and institutional AI strategy." },
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

  const PROGRAMS = PROGRAM_FALLBACKS.map((program, index) => ({
    icon: PROGRAM_ICONS[index],
    title: pc(`programs.${index}.title`, program.title),
    text: pc(`programs.${index}.body`, program.text),
  }));

  const DT_PILLARS = DT_PILLAR_FALLBACKS.map((pillar, index) => ({
    icon: DT_PILLAR_ICONS[index],
    title: pc(`digital_transformation.pillars.${index}.title`, pillar.title),
    text: pc(`digital_transformation.pillars.${index}.body`, pillar.text),
  }));

  const INDUSTRIES = INDUSTRY_FALLBACKS.map((industry, index) => ({
    icon: INDUSTRY_ICONS[index],
    title: pc(`industries.${index}.title`, industry.title),
    text: pc(`industries.${index}.body`, industry.text),
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

      <HubSection
        eyebrow={pc("programs.eyebrow", "Training Programs")}
        heading={pc("programs.heading", "Structured learning paths for your team")}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <p.icon className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </HubSection>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {pc("digital_transformation.eyebrow", "Digital Transformation")}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">
              {pc("digital_transformation.heading", "Beyond the pilot: organization-wide change")}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {pc(
                "digital_transformation.intro",
                "AI adoption succeeds or fails based on the structures around it, not just the technology itself. Here's what that work covers.",
              )}
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {DT_PILLARS.map((pillar) => (
                <div key={pillar.title}>
                  <pillar.icon className="size-7 text-primary" />
                  <p className="mt-3 font-display text-base font-semibold text-foreground">{pillar.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HubSection
        eyebrow={pc("industries.eyebrow", "Industries Served")}
        heading={pc("industries.heading", "Experience across sectors")}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <div key={industry.title} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <industry.icon className="size-8 text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{industry.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{industry.text}</p>
            </div>
          ))}
        </div>
      </HubSection>

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

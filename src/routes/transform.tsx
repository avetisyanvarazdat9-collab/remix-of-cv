import { createFileRoute, Link } from "@tanstack/react-router";
import { BrainCircuit, Building2, Users, Rocket, Sparkles, MessageSquare } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HubHero, HubSection, HubCTA } from "@/components/hub/HubLayout";

export const Route = createFileRoute("/transform")({
  head: () => ({
    meta: [
      { title: "Transform — AI Consulting & Corporate Training | Dr. Varazdat Avetisyan" },
      { name: "description", content: "AI consulting, corporate training, and digital transformation services for organizations adopting Generative AI, Machine Learning, and Data Science." },
      { name: "keywords", content: "AI Consultant Armenia, AI adoption, Digital transformation, Corporate AI training, Generative AI consulting" },
      { property: "og:title", content: "Transform — AI Consulting with Dr. Varazdat Avetisyan" },
      { property: "og:description", content: "Consulting, corporate training, and AI adoption services." },
    ],
  }),
  component: TransformHub,
});

const SERVICES = [
  { icon: BrainCircuit, title: "AI Strategy Consulting", text: "Assess your data landscape, identify high-impact AI use cases, and design a phased roadmap grounded in what's technically feasible." },
  { icon: Users, title: "Corporate Training", text: "Custom workshops for executives, product teams, and engineers on Generative AI, Prompt Engineering, and AI Agents." },
  { icon: Building2, title: "Digital Transformation", text: "Guide your organization through AI-first product changes, org design, and hiring for data-driven capabilities." },
  { icon: Rocket, title: "AI Product Design", text: "Co-design RAG systems, AI agents, and educational assistants — from prototype to production." },
  { icon: Sparkles, title: "AI Adoption Programs", text: "Structured 8–12 week programs to embed AI literacy across your teams, with measurable outcomes." },
  { icon: MessageSquare, title: "Executive Briefings", text: "Private sessions for leadership on what Generative AI, Agentic AI, and Foundation Models mean for your business." },
];

function TransformHub() {
  return (
    <PublicLayout>
      <HubHero
        eyebrow="Transform"
        heading="AI that changes how your organization works"
        subheading="Consulting, corporate training, and AI adoption programs for leaders who want more than a demo — they want measurable transformation."
        primaryTo="/contact"
        primaryLabel="Request a Consultation"
        secondaryTo="/companies"
        secondaryLabel="See Past Clients"
      />

      <HubSection eyebrow="Services" heading="Ways I can help your team">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Engagement model</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">How we work together</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-4">
              {[
                { n: "01", t: "Discovery", d: "30-min consultation to understand goals, constraints, and success criteria." },
                { n: "02", t: "Proposal", d: "Scoped proposal with milestones, deliverables, and pricing — usually within a week." },
                { n: "03", t: "Delivery", d: "Weekly working sessions, hands-on artifacts, and clear progress tracking." },
                { n: "04", t: "Handoff", d: "Documentation, training, and ongoing support so your team can run with it." },
              ].map((s) => (
                <li key={s.n}>
                  <div className="font-display text-4xl font-bold text-primary/40">{s.n}</div>
                  <p className="mt-2 font-display text-base font-semibold text-foreground">{s.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <HubCTA
        heading="Let's talk about your AI roadmap"
        text="Tell me about your team and what you're trying to build. I'll follow up within two business days."
        primaryTo="/contact"
        primaryLabel="Request a Consultation"
        icon={MessageSquare}
      />
    </PublicLayout>
  );
}

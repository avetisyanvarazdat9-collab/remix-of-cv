import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildPageHead({
      title: "Privacy Policy — Dr. Varazdat Avetisyan",
      description: "Privacy policy for avetisyan.vercel.app — what data we collect and how we use it.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-neutral mt-8 max-w-none text-foreground">
          <h2 className="font-display text-xl font-semibold">What we collect</h2>
          <p className="text-muted-foreground">
            When you submit the contact form, we collect your name, email address, subject and message so we can respond to your enquiry. We do not sell or share this data with third parties.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold">Cookies & analytics</h2>
          <p className="text-muted-foreground">
            This site uses privacy-respecting analytics and cookies necessary for site operation (authentication, language preference). We do not use advertising or cross-site tracking cookies.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold">Chatbot</h2>
          <p className="text-muted-foreground">
            Conversations with the on-site assistant may be stored by our chatbot provider to improve replies. Do not share sensitive personal information in chat.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold">Your rights</h2>
          <p className="text-muted-foreground">
            You can request a copy of any personal data we hold about you, or ask us to delete it, by emailing the address listed on the Contact page.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

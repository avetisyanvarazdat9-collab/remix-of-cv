import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";

const PRIVACY_PAGE = "privacy";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

export const Route = createFileRoute("/privacy")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(pageContentQuery(PRIVACY_PAGE));
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(PRIVACY_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(
        pageContent,
        "seo.title",
        "Privacy Policy Dr. Varazdat Avetisyan",
      ),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "Privacy policy for avetisyan.vercel.app: what data we collect and how we use it.",
      ),
      path: "/privacy",
    });
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  const { pc } = usePageContent(PRIVACY_PAGE);

  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-foreground">{pc("hero.heading", "Privacy Policy")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {pc("hero.last_updated_label", "Last updated:")}{" "}
          {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-neutral mt-8 max-w-none text-foreground">
          <h2 className="font-display text-xl font-semibold">{pc("collect.heading", "What we collect")}</h2>
          <p className="text-muted-foreground">
            {pc(
              "collect.body",
              "When you submit the contact form, we collect your name, email address, subject and message so we can respond to your enquiry. We do not sell or share this data with third parties.",
            )}
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold">{pc("cookies.heading", "Cookies & analytics")}</h2>
          <p className="text-muted-foreground">
            {pc(
              "cookies.body",
              "This site uses privacy-respecting analytics and cookies necessary for site operation (authentication, language preference). We do not use advertising or cross-site tracking cookies.",
            )}
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold">{pc("chatbot.heading", "Chatbot")}</h2>
          <p className="text-muted-foreground">
            {pc(
              "chatbot.body",
              "Conversations with the on-site assistant may be stored by our chatbot provider to improve replies. Do not share sensitive personal information in chat.",
            )}
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold">{pc("rights.heading", "Your rights")}</h2>
          <p className="text-muted-foreground">
            {pc(
              "rights.body",
              "You can request a copy of any personal data we hold about you, or ask us to delete it, by emailing the address listed on the Contact page.",
            )}
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

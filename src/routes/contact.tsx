import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, MapPin, Globe, Phone } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SocialLinksContactList } from "@/components/social/SocialLinks";
import { profileQuery, socialLinksQuery } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { useLocalized } from "@/lib/i18n";
import { buildPageHead } from "@/lib/seo";
import {
  pageContentQuery,
  resolvePageContentString,
  usePageContent,
  type PageContentI18n,
  type PageContentRow,
} from "@/lib/page-content";

const CONTACT_PAGE = "contact";

function pageContentLookup(rows: PageContentRow[] | undefined, key: string, fallback: string) {
  const row = (rows ?? []).find((entry) => entry.key === key);
  return resolvePageContentString((row?.i18n ?? {}) as PageContentI18n, "en", fallback);
}

export const Route = createFileRoute("/contact")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(profileQuery),
      context.queryClient.ensureQueryData(socialLinksQuery),
      context.queryClient.ensureQueryData(pageContentQuery(CONTACT_PAGE)),
    ]);
    const pageContent = await context.queryClient.ensureQueryData(pageContentQuery(CONTACT_PAGE));
    return { pageContent };
  },
  head: ({ loaderData }) => {
    const pageContent = (loaderData as { pageContent?: PageContentRow[] } | undefined)?.pageContent;
    return buildPageHead({
      title: pageContentLookup(pageContent, "seo.title", "Contact Dr. Varazdat Avetisyan"),
      description: pageContentLookup(
        pageContent,
        "seo.description",
        "Get in touch with Dr. Varazdat Avetisyan for speaking, consulting, courses, research collaboration, and partnership inquiries.",
      ),
      path: "/contact",
    });
  },
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional(),
  body: z.string().trim().min(1).max(5000),
});

function ContactPage() {
  const { data: profile } = useSuspenseQuery(profileQuery);
  const { data: socialLinks } = useSuspenseQuery(socialLinksQuery);
  const [submitting, setSubmitting] = useState(false);
  const loc = useLocalized();
  const { pc } = usePageContent(CONTACT_PAGE);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      body: fd.get("body"),
    });
    if (!parsed.success) {
      toast.error(pc("invalid", "Please check the form fields."));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("messages").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error(`${pc("failed", "Couldn't send.")} ${error.message}`);
      return;
    }
    toast.success(pc("success", "Message sent. Thank you!"));
    (e.target as HTMLFormElement).reset();
  }

  const location = loc(profile, "location");

  return (
    <PublicLayout>
      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{pc("heading", "Get in touch")}</h1>
          <p className="mt-3 text-muted-foreground">{pc("lead", "For collaborations, talks, mentorship requests, or to say hello.")}</p>
          <ul className="mt-8 space-y-3 text-sm">
            {profile?.email && (
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
              </li>
            )}
            {profile?.phone && (
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:underline">{profile.phone}</a>
              </li>
            )}
            {location && (
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>{location}</span>
              </li>
            )}
            <SocialLinksContactList links={socialLinks ?? []} />
            {profile?.website_url && (
              <li className="flex items-center gap-3">
                <Globe className="size-4 shrink-0 text-primary" />
                <a href={profile.website_url} target="_blank" rel="noreferrer" className="hover:underline">
                  {profile.website_url}
                </a>
              </li>
            )}
          </ul>
        </div>
        <form onSubmit={onSubmit} className="glass space-y-4 rounded-2xl p-6">
          <Field label={pc("name", "Name")} name="name" required />
          <Field label={pc("email", "Email")} name="email" type="email" required />
          <Field label={pc("subject", "Subject")} name="subject" />
          <div>
            <label className="mb-1 block text-sm">{pc("message", "Message")}</label>
            <textarea name="body" required rows={5} className="w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <button disabled={submitting} className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {submitting ? pc("sending", "Sending…") : pc("send", "Send message")}
          </button>
        </form>
      </section>
    </PublicLayout>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-sm">{label}</label>
      <input name={name} type={type} required={required} className="w-full rounded-md border border-input bg-card/40 px-3 py-2 text-sm outline-none focus:border-primary" />
    </div>
  );
}

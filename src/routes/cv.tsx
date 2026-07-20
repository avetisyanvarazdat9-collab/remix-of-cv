import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  profileQuery,
  skillsQuery,
  educationQuery,
  certificationsQuery,
  professionalExperienceQuery,
  coursesQuery,
  videoCoursesQuery,
  talksQuery,
  statisticsQuery,
  internationalExperienceQuery,
} from "@/lib/queries";
import { useLocalized } from "@/lib/i18n";

export const Route = createFileRoute("/cv")({
  head: () => ({ meta: [{ title: "CV — Dr. Varazdat Avetisyan" }] }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(profileQuery);
    context.queryClient.ensureQueryData(skillsQuery);
    context.queryClient.ensureQueryData(educationQuery);
    context.queryClient.ensureQueryData(certificationsQuery);
    context.queryClient.ensureQueryData(professionalExperienceQuery);
    context.queryClient.ensureQueryData(coursesQuery);
    context.queryClient.ensureQueryData(videoCoursesQuery);
    context.queryClient.ensureQueryData(talksQuery);
    context.queryClient.ensureQueryData(statisticsQuery);
    context.queryClient.ensureQueryData(internationalExperienceQuery({}));
  },
  component: CVPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 break-inside-avoid">
      <h2 className="mb-2 border-b-2 border-slate-800 pb-1 text-[13pt] font-bold uppercase tracking-wide text-slate-900">
        {title}
      </h2>
      <div className="text-[10.5pt] leading-snug text-slate-800">{children}</div>
    </section>
  );
}

function CVPage() {
  const { data: profile } = useSuspenseQuery(profileQuery);
  const { data: skills } = useSuspenseQuery(skillsQuery);
  const { data: education } = useSuspenseQuery(educationQuery);
  const { data: certifications } = useSuspenseQuery(certificationsQuery);
  const { data: professionalExperience } = useSuspenseQuery(professionalExperienceQuery);
  const { data: courses } = useSuspenseQuery(coursesQuery);
  const { data: videoCourses } = useSuspenseQuery(videoCoursesQuery);
  const { data: talks } = useSuspenseQuery(talksQuery);
  const { data: statistics } = useSuspenseQuery(statisticsQuery);
  const { data: intl } = useSuspenseQuery(internationalExperienceQuery({}));
  const loc = useLocalized();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("print") !== "0") {
      const t = setTimeout(() => window.print(), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const name = loc(profile, "name") || profile?.name || "";
  const title = loc(profile, "title") || profile?.title || "";
  const bio = loc(profile, "bio") || profile?.bio || "";
  const location = loc(profile, "location") || profile?.location || "";

  const contactBits = [
    location,
    profile?.website_url,
    profile?.linkedin_url,
    profile?.github_url,
    profile?.twitter_url,
  ].filter(Boolean);

  const skillsByCat = (skills ?? []).reduce<Record<string, typeof skills>>((acc, s) => {
    const cat = loc(s, "category") || s.category;
    (acc[cat] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="cv-root min-h-screen bg-slate-100 text-slate-900 print:bg-white">
      {/* Screen-only toolbar */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[8.5in] items-center justify-between px-6 py-3">
          <p className="text-sm text-slate-600">
            Printable CV — use your browser's dialog to save as PDF.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => window.history.back()}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      <article className="mx-auto my-6 max-w-[8.5in] bg-white p-10 shadow-lg print:my-0 print:max-w-none print:p-[0.5in] print:shadow-none">
        {/* Header */}
        <header className="mb-6 border-b-2 border-slate-900 pb-4">
          <h1 className="text-[24pt] font-bold leading-tight text-slate-900">{name}</h1>
          {title && <p className="mt-1 text-[13pt] text-slate-700">{title}</p>}
          {contactBits.length > 0 && (
            <p className="mt-2 text-[9.5pt] text-slate-600">{contactBits.join("  ·  ")}</p>
          )}
        </header>

        {bio && (
          <Section title="Profile">
            <p className="whitespace-pre-line">{bio}</p>
          </Section>
        )}

        {statistics && statistics.length > 0 && (
          <Section title="Key Metrics">
            <div className="grid grid-cols-4 gap-3">
              {statistics.map((s: any) => (
                <div key={s.id} className="rounded border border-slate-300 p-2 text-center">
                  <p className="text-[14pt] font-bold text-slate-900">
                    {loc(s, "value") || s.value}
                  </p>
                  <p className="text-[9pt] text-slate-600">{loc(s, "label") || s.label}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {professionalExperience &&
          professionalExperience.filter((e: any) => e.is_visible !== false).length > 0 && (
          <Section title="Professional Experience">
            <ul className="space-y-3">
              {professionalExperience
                .filter((e: any) => e.is_visible !== false)
                .map((e: any) => (
                  <li key={e.id} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold">{loc(e, "job_title") || e.job_title}</p>
                      <p className="text-[9.5pt] text-slate-600">
                        {e.start_year}
                        {e.is_current ? " — Present" : e.end_year ? `–${e.end_year}` : ""}
                      </p>
                    </div>
                    {(loc(e, "organization") || e.organization) && (
                      <p className="italic text-slate-700">{loc(e, "organization") || e.organization}</p>
                    )}
                    {((loc(e, "location") || e.location) || (loc(e, "employment_type") || e.employment_type)) && (
                      <p className="text-[9.5pt] text-slate-600">
                        {[loc(e, "location") || e.location, loc(e, "employment_type") || e.employment_type]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    {(loc(e, "description") || e.description) && (
                      <p className="mt-0.5 whitespace-pre-line text-slate-700">
                        {loc(e, "description") || e.description}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </Section>
        )}

        {education && education.length > 0 && (
          <Section title="Education">
            <ul className="space-y-2">
              {education.map((e: any) => (
                <li key={e.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">
                      {loc(e, "degree") || e.degree}
                      {(loc(e, "field") || e.field) ? ` · ${loc(e, "field") || e.field}` : ""}
                    </p>
                    <p className="text-[9.5pt] text-slate-600">
                      {e.start_year}
                      {e.end_year ? `–${e.end_year}` : " — Present"}
                    </p>
                  </div>
                  <p className="text-slate-700">{loc(e, "institution") || e.institution}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {Object.keys(skillsByCat).length > 0 && (
          <Section title="Skills & Expertise">
            <div className="space-y-1.5">
              {Object.entries(skillsByCat).map(([cat, items]) => (
                <div key={cat}>
                  <span className="font-semibold text-slate-900">{cat}: </span>
                  <span className="text-slate-700">
                    {items!.map((s: any) => loc(s, "name") || s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications && certifications.filter((c: any) => c.is_visible).length > 0 && (
          <Section title="Certifications">
            <ul className="space-y-1.5">
              {certifications
                .filter((c: any) => c.is_visible)
                .map((c: any) => (
                  <li key={c.id} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold">{loc(c, "name") || c.name}</p>
                      <p className="text-[9.5pt] text-slate-600">
                        {c.issue_date ?? ""}
                        {c.expiry_date ? ` — ${c.expiry_date}` : ""}
                      </p>
                    </div>
                    {(loc(c, "issuer") || c.issuer) && (
                      <p className="italic text-slate-700">{loc(c, "issuer") || c.issuer}</p>
                    )}
                  </li>
                ))}
            </ul>
          </Section>
        )}

        {courses && courses.length > 0 && (
          <Section title="Courses Taught">
            <ul className="list-disc space-y-0.5 pl-5">
              {courses.map((c: any) => (
                <li key={c.id}>
                  <span className="font-medium">{loc(c, "title") || c.title}</span>
                  {(loc(c, "summary") || c.summary) && (
                    <span className="text-slate-700"> — {loc(c, "summary") || c.summary}</span>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {videoCourses && videoCourses.length > 0 && (
          <Section title="Video Courses">
            <ul className="list-disc space-y-0.5 pl-5">
              {videoCourses.map((c: any) => (
                <li key={c.id}>{loc(c, "title") || c.title}</li>
              ))}
            </ul>
          </Section>
        )}

        {talks && talks.length > 0 && (
          <Section title="Talks & Events">
            <ul className="space-y-1.5">
              {talks.map((t: any) => (
                <li key={t.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">{loc(t, "title") || t.title}</p>
                    <p className="text-[9.5pt] text-slate-600">
                      {t.event_date ? new Date(t.event_date).getFullYear() : ""}
                    </p>
                  </div>
                  {(loc(t, "venue") || t.venue || t.location) && (
                    <p className="italic text-slate-700">
                      {[loc(t, "venue") || t.venue, t.location].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {intl && intl.length > 0 && (
          <Section title="International Experience">
            <ul className="space-y-1.5">
              {intl.map((e) => (
                <li key={e.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold">
                      {(e.i18n as any)?.title?.en || e.title}
                    </p>
                    <p className="text-[9.5pt] text-slate-600">
                      {e.event_date ? new Date(e.event_date).getFullYear() : ""}
                    </p>
                  </div>
                  <p className="italic text-slate-700">
                    {[e.organization, e.location].filter(Boolean).join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>

      <style>{`
        @media print {
          @page { size: A4; margin: 0.5in; }
          html, body { background: white !important; }
          .cv-root { background: white !important; }
        }
      `}</style>
    </div>
  );
}

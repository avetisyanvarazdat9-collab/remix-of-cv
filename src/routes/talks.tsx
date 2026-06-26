import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, MapPin } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { talksQuery } from "@/lib/queries";
import { formatDate } from "@/lib/format-date";
import { useLocalized, useT } from "@/lib/i18n";

export const Route = createFileRoute("/talks")({
  head: () => ({ meta: [{ title: "Talks & Events — Varazdat Avetisyan" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(talksQuery),
  component: TalksPage,
});

function TalksPage() {
  const { data: talks } = useSuspenseQuery(talksQuery);
  const loc = useLocalized();
  const t = useT();
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t("talks.heading")}</h1>
        <ul className="mt-10 space-y-6">
          {(talks ?? []).map((tk) => {
            const title = loc(tk, "title");
            const eventName = loc(tk, "event_name");
            const location = loc(tk, "location");
            const description = loc(tk, "description");
            return (
              <li key={tk.id} className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                {eventName && <p className="mt-1 text-sm text-primary">{eventName}</p>}
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  {tk.event_date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {formatDate(tk.event_date)}
                    </span>
                  )}
                  {location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {location}
                    </span>
                  )}
                </div>
                {description && <p className="mt-3 text-sm text-muted-foreground">{description}</p>}
                <div className="mt-3 flex gap-3">
                  {tk.slides_url && <a href={tk.slides_url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">{t("talks.slides")}</a>}
                  {tk.video_url && <a href={tk.video_url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">{t("talks.video")}</a>}
                </div>
              </li>
            );
          })}
          {(talks ?? []).length === 0 && <p className="text-muted-foreground">{t("talks.empty")}</p>}
        </ul>
      </section>
    </PublicLayout>
  );
}

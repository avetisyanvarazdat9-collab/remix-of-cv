import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Trash2, RefreshCw, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { formatDateTime } from "@/lib/format-date";

export const Route = createFileRoute("/_authenticated/admin/error-logs")({
  head: () => ({ meta: [{ title: "Error logs — Admin" }] }),
  component: ErrorLogsPage,
});

const PAGE_SIZE = 25;

const KIND_OPTIONS = [
  { value: "all", label: "All kinds" },
  { value: "react.errorBoundary", label: "Error boundary" },
  { value: "unhandledrejection", label: "Unhandled rejection" },
  { value: "window.error", label: "Window error" },
  { value: "manual", label: "Manual" },
  { value: "server", label: "Server" },
] as const;

type KindValue = (typeof KIND_OPTIONS)[number]["value"];

const SEVERITY_OPTIONS = [
  { value: "all", label: "All severities" },
  { value: "critical", label: "Critical" },
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
] as const;
type SeverityValue = (typeof SEVERITY_OPTIONS)[number]["value"];

const SEVERITY_RANK: Record<string, number> = {
  critical: 0,
  error: 1,
  warning: 2,
  info: 3,
};
const severityClass = (s: string | null) => {
  switch (s) {
    case "critical":
      return "bg-red-500/20 text-red-300 ring-1 ring-red-500/40";
    case "error":
      return "bg-orange-500/15 text-orange-300";
    case "warning":
      return "bg-yellow-500/15 text-yellow-300";
    case "info":
      return "bg-sky-500/15 text-sky-300";
    default:
      return "bg-muted text-muted-foreground";
  }
};

function ErrorLogsPage() {
  const [rows, setRows] = useState<Tables<"error_logs">[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showClient, setShowClient] = useState(true);
  const [showServer, setShowServer] = useState(true);
  const [kind, setKind] = useState<KindValue>("all");
  const [severity, setSeverity] = useState<SeverityValue>("all");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(0);
  }, [showClient, showServer, kind, severity, debounced]);

  async function load() {
    setLoading(true);
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    let q = supabase
      .from("error_logs")
      .select("*", { count: "exact" })
      .order("occurred_at", { ascending: false })
      .range(from, to);
    const sources: ("client" | "server")[] = [];
    if (showClient) sources.push("client");
    if (showServer) sources.push("server");
    if (sources.length === 1) q = q.eq("source", sources[0]);
    else if (sources.length === 0) q = q.eq("source", "__none__");
    if (kind !== "all") q = q.eq("kind", kind);
    if (severity !== "all") q = q.eq("severity", severity);
    if (debounced) {
      const esc = debounced.replace(/[%,]/g, " ");
      const pat = `%${esc}%`;
      q = q.or(
        `message.ilike.${pat},stack.ilike.${pat},route.ilike.${pat},url.ilike.${pat}`,
      );
    }
    const { data, error, count } = await q;
    if (error) toast.error(error.message);
    // Sort within page so critical surfaces first when "all" is selected.
    const sorted = (data ?? []).slice().sort((a, b) => {
      const ra = SEVERITY_RANK[a.severity ?? ""] ?? 99;
      const rb = SEVERITY_RANK[b.severity ?? ""] ?? 99;
      if (ra !== rb) return ra - rb;
      return (b.occurred_at ?? "").localeCompare(a.occurred_at ?? "");
    });
    setRows(sorted);
    setTotal(count ?? 0);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showClient, showServer, kind, severity, debounced, page]);


  async function clearAll() {
    if (!confirm("Delete ALL error logs? This cannot be undone.")) return;
    const { error } = await supabase
      .from("error_logs")
      .delete()
      .gte("occurred_at", "1900-01-01");
    if (error) return toast.error(error.message);
    toast.success("Cleared");
    load();
  }

  async function del(id: string) {
    const { error } = await supabase.from("error_logs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
    setTotal((t) => Math.max(0, t - 1));
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const highlight = debounced.toLowerCase();
  const showingFrom = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const showingTo = Math.min(total, page * PAGE_SIZE + rows.length);

  const highlighted = useMemo(
    () => (text: string | null | undefined) => {
      if (!text) return null;
      if (!highlight) return text;
      const idx = text.toLowerCase().indexOf(highlight);
      if (idx === -1) return text;
      return (
        <>
          {text.slice(0, idx)}
          <mark className="rounded bg-yellow-400/30 px-0.5 text-foreground">
            {text.slice(idx, idx + highlight.length)}
          </mark>
          {text.slice(idx + highlight.length)}
        </>
      );
    },
    [highlight],
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Error logs</h1>
          <p className="mt-1 text-muted-foreground">
            Recent client and server runtime errors.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { key: "client", label: "Client", on: showClient, set: setShowClient, cls: "bg-blue-500/15 text-blue-300 border-blue-500/40" },
              { key: "server", label: "Server", on: showServer, set: setShowServer, cls: "bg-orange-500/15 text-orange-300 border-orange-500/40" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => t.set(!t.on)}
              aria-pressed={t.on}
              className={`rounded-md border px-3 py-1.5 text-xs ${
                t.on ? t.cls : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {t.on ? "✓ " : ""}{t.label}
            </button>
          ))}
          <button
            onClick={load}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent"
          >
            <RefreshCw className="size-3" /> Refresh
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3" /> Clear all
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search message, stack, route, or URL…"
            className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as KindValue)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        >
          {KIND_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as SeverityValue)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        >
          {SEVERITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          {loading
            ? "Loading…"
            : total === 0
              ? "0 results"
              : `Showing ${showingFrom}–${showingTo} of ${total}`}
        </p>
      </div>


      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground">
            {debounced ? "No matches." : "No errors logged. 🎉"}
          </p>
        ) : (
          rows.map((r) => (
            <details key={r.id} className="glass group rounded-2xl p-4">
              <summary className="flex cursor-pointer flex-wrap items-baseline justify-between gap-2 list-none">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                        r.source === "client"
                          ? "bg-blue-500/15 text-blue-300"
                          : "bg-orange-500/15 text-orange-300"
                      }`}
                    >
                      {r.source}
                    </span>
                    {r.severity && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${severityClass(r.severity)}`}
                      >
                        {r.severity}
                      </span>
                    )}
                    {r.kind && (
                      <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-purple-300">
                        {r.kind}
                      </span>
                    )}
                    {r.route && (
                      <span className="text-xs text-muted-foreground">
                        {highlighted(r.route)}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 truncate font-mono text-sm text-foreground">
                    {highlighted(r.message)}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDateTime(r.occurred_at)}
                </span>
              </summary>
              <div className="mt-3 space-y-2 border-t border-border pt-3 text-xs">
                {r.url && (
                  <p>
                    <span className="text-muted-foreground">URL: </span>
                    <span className="break-all font-mono">{highlighted(r.url)}</span>
                  </p>
                )}
                {r.user_agent && (
                  <p>
                    <span className="text-muted-foreground">UA: </span>
                    <span className="break-all">{r.user_agent}</span>
                  </p>
                )}
                {r.stack && (
                  <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-card/60 p-3 font-mono text-[11px] leading-relaxed">
                    {highlighted(r.stack)}
                  </pre>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => del(r.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-2 py-1 text-[11px] text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </details>
          ))
        )}
      </div>

      {total > PAGE_SIZE && (
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || loading}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-40"
          >
            <ChevronLeft className="size-3" /> Prev
          </button>
          <p className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </p>
          <button
            onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
            disabled={page + 1 >= totalPages || loading}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-40"
          >
            Next <ChevronRight className="size-3" />
          </button>
        </div>
      )}
    </div>
  );
}

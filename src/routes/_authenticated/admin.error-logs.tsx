import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Trash2, RefreshCw, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { formatDateTime } from "@/lib/format-date";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

type DeleteConfirm =
  | { mode: "single"; id: string }
  | { mode: "bulk"; ids: string[] }
  | { mode: "all" };

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
  const [deleting, setDeleting] = useState(false);
  const [showClient, setShowClient] = useState(true);
  const [showServer, setShowServer] = useState(true);
  const [kind, setKind] = useState<KindValue>("all");
  const [severity, setSeverity] = useState<SeverityValue>("all");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState<DeleteConfirm | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(0);
  }, [showClient, showServer, kind, severity, debounced]);

  useEffect(() => {
    setSelected(new Set());
  }, [page, showClient, showServer, kind, severity, debounced]);

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

  const pageIds = useMemo(() => rows.map((r) => r.id), [rows]);
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const somePageSelected = pageIds.some((id) => selected.has(id));

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAllPage() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        for (const id of pageIds) next.delete(id);
      } else {
        for (const id of pageIds) next.add(id);
      }
      return next;
    });
  }

  async function executeDelete(target: DeleteConfirm) {
    setDeleting(true);
    try {
      if (target.mode === "single") {
        const { error } = await supabase.from("error_logs").delete().eq("id", target.id);
        if (error) throw error;
        toast.success("Error log deleted.");
      } else if (target.mode === "bulk") {
        const { error } = await supabase.from("error_logs").delete().in("id", target.ids);
        if (error) throw error;
        toast.success(`${target.ids.length} error log${target.ids.length === 1 ? "" : "s"} deleted.`);
        setSelected(new Set());
      } else {
        const { error } = await supabase
          .from("error_logs")
          .delete()
          .gte("occurred_at", "1900-01-01");
        if (error) throw error;
        toast.success("All error logs cleared.");
        setSelected(new Set());
      }
      setConfirmDelete(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete error log(s).");
    } finally {
      setDeleting(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const highlight = debounced.toLowerCase();
  const showingFrom = total === 0 ? 0 : page * PAGE_SIZE + 1;
  const showingTo = Math.min(total, page * PAGE_SIZE + rows.length);
  const selectedCount = selected.size;

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

  const confirmTitle =
    confirmDelete?.mode === "single"
      ? "Delete this error log?"
      : confirmDelete?.mode === "bulk"
        ? `Delete ${confirmDelete.ids.length} selected error log${confirmDelete.ids.length === 1 ? "" : "s"}?`
        : "Delete all error logs?";

  const confirmDescription =
    confirmDelete?.mode === "all"
      ? "This will permanently remove every error log in the database. This action cannot be undone."
      : "This will permanently remove the selected error log record(s) from Supabase. This action cannot be undone.";

  return (
    <div
      className={`grid max-h-[calc(100dvh-8.5rem)] gap-4 overflow-hidden md:max-h-[calc(100dvh-4rem)] ${
        total > PAGE_SIZE ? "grid-rows-[auto_minmax(0,1fr)_auto]" : "grid-rows-[auto_minmax(0,1fr)]"
      }`}
    >
      <div className="space-y-4">
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
            disabled={loading || deleting}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-60"
          >
            <RefreshCw className="size-3" /> Refresh
          </button>
          <button
            onClick={() => setConfirmDelete({ mode: "all" })}
            disabled={deleting || total === 0}
            className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-60"
          >
            <Trash2 className="size-3" /> Clear all
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
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

      {rows.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={allPageSelected}
              ref={(el) => {
                if (el) el.indeterminate = somePageSelected && !allPageSelected;
              }}
              onChange={toggleSelectAllPage}
              disabled={deleting}
              className="size-4 rounded border-border"
            />
            Select all on this page
          </label>
          {selectedCount > 0 && (
            <button
              type="button"
              disabled={deleting}
              onClick={() => setConfirmDelete({ mode: "bulk", ids: [...selected] })}
              className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-60"
            >
              <Trash2 className="size-3.5" />
              Delete selected ({selectedCount})
            </button>
          )}
        </div>
      )}

      </div>

      <div className="min-h-0 overflow-y-auto overscroll-contain scroll-smooth">
        <div className="space-y-3 pr-1">
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground">
            {debounced ? "No matches." : "No error logs found."}
          </p>
        ) : (
          rows.map((r) => (
            <div key={r.id} className="glass flex gap-3 rounded-2xl p-4">
              <input
                type="checkbox"
                checked={selected.has(r.id)}
                onChange={() => toggleRow(r.id)}
                disabled={deleting}
                aria-label={`Select error log ${r.id}`}
                className="mt-1 size-4 shrink-0 rounded border-border"
              />
              <details className="min-w-0 flex-1 group">
                <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-2">
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
                </div>
              </details>
              <button
                type="button"
                disabled={deleting}
                onClick={() => setConfirmDelete({ mode: "single", id: r.id })}
                className="inline-flex h-8 shrink-0 items-center gap-1 rounded-md border border-destructive/40 px-2.5 text-[11px] text-destructive hover:bg-destructive/10 disabled:opacity-60"
              >
                <Trash2 className="size-3.5" />
                Delete
              </button>
            </div>
          ))
        )}
        </div>
      </div>

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || loading || deleting}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-40"
          >
            <ChevronLeft className="size-3" /> Prev
          </button>
          <p className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </p>
          <button
            onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
            disabled={page + 1 >= totalPages || loading || deleting}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent disabled:opacity-40"
          >
            Next <ChevronRight className="size-3" />
          </button>
        </div>
      )}

      <AlertDialog open={confirmDelete !== null} onOpenChange={(open) => !open && !deleting && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting || confirmDelete === null}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={(e) => {
                e.preventDefault();
                if (confirmDelete) void executeDelete(confirmDelete);
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

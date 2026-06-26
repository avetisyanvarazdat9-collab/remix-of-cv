/**
 * Browser-side runtime error tracker.
 *
 * Captures uncaught errors and unhandled promise rejections, stamps them with
 * an ISO timestamp + stack, logs to the browser console, keeps a small
 * in-memory ring buffer (window.__errorLog) for debugging, and forwards each
 * entry to the server so it lands in the Worker / dev-server logs too.
 *
 * Idempotent: install() can be called from multiple components; listeners are
 * only attached once per browser session.
 */
import { logClientError } from "./log-client-error.functions";

export type TrackedError = {
  timestamp: string;
  source: "window.error" | "unhandledrejection" | "react.errorBoundary" | "manual";
  message: string;
  stack?: string;
  url?: string;
};

const MAX_BUFFERED = 50;
let installed = false;

function getBuffer(): TrackedError[] {
  const w = window as unknown as { __errorLog?: TrackedError[] };
  if (!w.__errorLog) w.__errorLog = [];
  return w.__errorLog;
}

function toEntry(
  source: TrackedError["source"],
  err: unknown,
): TrackedError {
  const e =
    err instanceof Error
      ? err
      : new Error(typeof err === "string" ? err : JSON.stringify(err ?? "unknown"));
  return {
    timestamp: new Date().toISOString(),
    source,
    message: e.message || "(no message)",
    stack: e.stack,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  };
}

export function trackError(source: TrackedError["source"], err: unknown) {
  if (typeof window === "undefined") return;
  const entry = toEntry(source, err);
  const buf = getBuffer();
  buf.push(entry);
  if (buf.length > MAX_BUFFERED) buf.shift();

  // eslint-disable-next-line no-console
  console.error(`[${entry.timestamp}] (${entry.source}) ${entry.message}`, err);

  // Fire-and-forget — don't await, don't throw if the server is unreachable.
  // Only send defined string fields so the server-fn payload serializer never
  // sees `undefined` (which Seroval refuses to round-trip).
  logClientError({
    data: {
      message: entry.message,
      stack: entry.stack ?? "",
      source: entry.source,
      url: entry.url ?? "",
      timestamp: entry.timestamp,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    },
  }).catch(() => {
    /* swallow — never let logging crash the app */
  });
}

export function installClientErrorTracker() {
  if (typeof window === "undefined" || installed) return;
  installed = true;

  window.addEventListener("error", (event) => {
    trackError("window.error", event.error ?? event.message);
  });
  window.addEventListener("unhandledrejection", (event) => {
    trackError("unhandledrejection", event.reason);
  });
}

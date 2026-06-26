import { createServerFn } from "@tanstack/react-start";

/**
 * Records a client-side runtime error into the server logs so it shows up in
 * Worker / dev-server logs alongside SSR errors. Keep this lightweight — no
 * DB writes — so a logging failure can never cascade into a second error.
 */
export const logClientError = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = (data ?? {}) as Record<string, unknown>;
    const str = (v: unknown, max: number) =>
      typeof v === "string" && v.length > 0 ? v.slice(0, max) : "";
    return {
      message: str(d.message, 2000) || "(no message)",
      stack: str(d.stack, 8000),
      source: str(d.source, 100) || "unknown",
      url: str(d.url, 500),
      timestamp: str(d.timestamp, 64) || new Date().toISOString(),
      userAgent: str(d.userAgent, 300),
    };
  })
  .handler(async ({ data }) => {
    console.error(
      `[client-error ${data.timestamp}] (${data.source}) ${data.message}` +
        (data.url ? `\n  url: ${data.url}` : "") +
        (data.userAgent ? `\n  ua: ${data.userAgent}` : "") +
        (data.stack ? `\n${data.stack}` : ""),
    );
    // Persist to error_logs so admins can review via /admin/error-logs.
    // Failure to persist must NEVER throw — logging is best-effort.
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const src = data.source;
      const isClient =
        src.startsWith("react") ||
        src.startsWith("window") ||
        src === "unhandledrejection" ||
        src === "manual";
      await supabaseAdmin.from("error_logs").insert({
        source: isClient ? "client" : "server",
        kind: src,
        severity: "error",
        message: data.message,
        stack: data.stack || null,
        url: data.url || null,
        route: data.url ? new URL(data.url, "http://x").pathname : null,
        user_agent: data.userAgent || null,
        occurred_at: data.timestamp,
      });
    } catch (e) {
      console.error("[client-error] failed to persist:", e);
    }

    return { ok: true };
  });

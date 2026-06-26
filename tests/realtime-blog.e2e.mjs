/**
 * End-to-end test for Realtime CMS propagation.
 *
 * Subscribes to `public.blog_posts` UPDATE events with the publishable
 * (anon) key — exactly what the public site uses via `useRealtimeCms` —
 * and waits up to TIMEOUT_MS for an UPDATE whose new `title` equals
 * EXPECTED_TITLE (passed via env). Exits 0 on a match, 1 on timeout.
 *
 * The actual UPDATE is issued out-of-band (in CI: an authenticated admin
 * server function; in the bundled harness below: the supabase admin tool)
 * because anon cannot write to blog_posts under RLS — the test only
 * proves that an admin-side change reaches an anonymous public subscriber.
 *
 * Usage:
 *   EXPECTED_TITLE="..." bun tests/realtime-blog.e2e.mjs
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const [k, ...v] = l.split("=");
      return [k.trim(), v.join("=").trim().replace(/^"|"$/g, "")];
    }),
);

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;
const EXPECTED_TITLE = process.env.EXPECTED_TITLE;
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS ?? 8000);

if (!EXPECTED_TITLE) {
  console.error("Set EXPECTED_TITLE env var.");
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

let resolveEvent;
const eventPromise = new Promise((r) => (resolveEvent = r));
const subscribedAt = { t: 0 };

const channel = supabase
  .channel("e2e:blog_posts")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "blog_posts" },
    (payload) => {
      if (payload.new?.title === EXPECTED_TITLE) {
        resolveEvent({ at: Date.now(), payload });
      }
    },
  );

await new Promise((res, rej) => {
  channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      subscribedAt.t = Date.now();
      res();
    }
    if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") rej(new Error(status));
  });
});
console.log(`READY waiting for title="${EXPECTED_TITLE}" (timeout ${TIMEOUT_MS}ms)`);

const timeout = new Promise((_, rej) =>
  setTimeout(() => rej(new Error(`No realtime event within ${TIMEOUT_MS}ms`)), TIMEOUT_MS),
);

try {
  const evt = await Promise.race([eventPromise, timeout]);
  console.log(`✓ Realtime UPDATE received after ${evt.at - subscribedAt.t}ms`);
  process.exit(0);
} catch (e) {
  console.error(`✗ ${e.message}`);
  process.exit(1);
} finally {
  await supabase.removeChannel(channel);
}

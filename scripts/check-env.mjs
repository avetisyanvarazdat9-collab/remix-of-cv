#!/usr/bin/env node
/**
 * Pre-build env check. Fails fast (exit 1) when required Supabase
 * env vars are missing so Vercel builds break early with a clear message
 * instead of shipping a broken app.
 */

const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

const url = process.env.VITE_SUPABASE_URL;
const key =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

const missing = [];
if (!url) missing.push("VITE_SUPABASE_URL");
if (!key) missing.push("VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY)");

if (missing.length > 0) {
  const onVercel = !!process.env.VERCEL;
  console.error("");
  console.error(`${RED}${BOLD}✗ Pre-deploy check failed: missing required env vars${RESET}`);
  console.error("");
  for (const name of missing) {
    console.error(`  ${RED}• ${name}${RESET}`);
  }
  console.error("");
  if (onVercel) {
    console.error(
      `${YELLOW}Add them in Vercel → Project → Settings → Environment Variables${RESET}`,
    );
    console.error(
      `${YELLOW}(Production, Preview, and Development), then redeploy.${RESET}`,
    );
  } else {
    console.error(
      `${YELLOW}Add them to your local .env file, then re-run the build.${RESET}`,
    );
  }
  console.error("");
  console.error(
    "Both values are safe to expose to the browser (RLS-protected publishable keys).",
  );
  console.error(
    `${RED}Do NOT set SUPABASE_SERVICE_ROLE_KEY as a VITE_ variable.${RESET}`,
  );
  console.error("");
  process.exit(1);
}

console.log(`${GREEN}✓ Supabase env vars present${RESET}`);

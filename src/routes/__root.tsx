import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { installClientErrorTracker, trackError } from "../lib/client-error-tracker";
import { buildGlobalHead } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { HiddenAdminLogin } from "@/components/HiddenAdminLogin";
import { ThemeApplier } from "@/components/ThemeApplier";
import { LanguageProvider } from "@/lib/i18n";
import { SupabaseEnvCheck } from "@/components/SupabaseEnvCheck";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
    trackError("react.errorBoundary", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    ...buildGlobalHead(),
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      { src: "https://cdn.botpress.cloud/webchat/v3.6/inject.js" },
      { src: "https://files.bpcontent.cloud/2026/06/27/04/20260627042438-7JVHPAOZ.js", defer: true },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const THEME_PREHYDRATE = `(function(){try{var r=document.documentElement;var m=localStorage.getItem('lovable.darkMode.v1');if(m==='dark'){r.classList.add('dark');r.style.colorScheme='dark';}else{if(m==='light'){r.classList.remove('dark');r.style.colorScheme='light';}var s=localStorage.getItem('lovable.theme.v1');if(s){var d=JSON.parse(s);if(d&&d.vars){for(var k in d.vars){r.style.setProperty(k,d.vars[k]);}if(d.colorScheme){r.style.colorScheme=d.colorScheme;}}}}}catch(e){}})();`;

const FONT_RESOURCE_PRELUDE = `(function(){try{function fix(n){if(!n||String(n.tagName).toLowerCase()!=='link')return n;var h=n.getAttribute('href')||'';if(h.indexOf('fonts.googleapis.com/css2?family=inter:')!==-1){n.setAttribute('href',h.replace('family=inter:','family=Inter:'));}return n;}var ap=HTMLHeadElement.prototype.appendChild;HTMLHeadElement.prototype.appendChild=function(n){return ap.call(this,fix(n));};var ib=HTMLHeadElement.prototype.insertBefore;HTMLHeadElement.prototype.insertBefore=function(n,r){return ib.call(this,fix(n),r);};}catch(e){}})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FONT_RESOURCE_PRELUDE }} />
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_PREHYDRATE }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    installClientErrorTracker();
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [queryClient, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SupabaseEnvCheck>
          <Outlet />
          <ThemeApplier />
          <HiddenAdminLogin />
        </SupabaseEnvCheck>
        <Toaster richColors />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

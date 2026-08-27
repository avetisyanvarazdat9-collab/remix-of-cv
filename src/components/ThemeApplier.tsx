import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  deriveTheme,
  syncSiteTheme,
  THEME_MODE_CHANGE_EVENT,
  type SiteThemeSettings,
  type ThemeMode,
} from "@/lib/theme-derive";

const STORAGE_KEY = "lovable.theme.v1";

function normalizeThemeMode(value: string | null | undefined): ThemeMode {
  return value === "light" ? "light" : "dark";
}

async function load() {
  const root = document.documentElement;
  const { data } = await supabase
    .from("site_settings")
    .select("primary_color, background_color, text_color, theme_mode")
    .eq("id", true)
    .maybeSingle();

  const settings: SiteThemeSettings | null = data
    ? {
        primary_color: data.primary_color,
        background_color: data.background_color,
        text_color: data.text_color,
        theme_mode: normalizeThemeMode(data.theme_mode),
      }
    : null;

  syncSiteTheme(root, settings);

  try {
    if (settings) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          vars: deriveTheme({
            primary: settings.primary_color,
            background: settings.background_color,
            text: settings.text_color,
          }),
          themeMode: settings.theme_mode,
        }),
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function ThemeApplier() {
  useEffect(() => {
    load();
    const channel = supabase
      .channel("site_settings_theme")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => load(),
      )
      .subscribe();
    const onModeChange = () => load();
    window.addEventListener(THEME_MODE_CHANGE_EVENT, onModeChange);
    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener(THEME_MODE_CHANGE_EVENT, onModeChange);
    };
  }, []);
  return null;
}

import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  deriveTheme,
  getActivePaletteForMode,
  getVisitorThemeMode,
  syncSiteTheme,
  THEME_MODE_CHANGE_EVENT,
  type SiteThemeSettings,
} from "@/lib/theme-derive";

const STORAGE_KEY = "lovable.theme.v1";

async function load() {
  const root = document.documentElement;
  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "light_primary_color, light_background_color, light_text_color, dark_primary_color, dark_background_color, dark_text_color",
    )
    .eq("id", true)
    .maybeSingle();

  if (error) {
    console.error("[ThemeApplier] Failed to load site_settings:", error);
    return;
  }

  const settings: SiteThemeSettings | null = data
    ? {
        light_primary_color: data.light_primary_color,
        light_background_color: data.light_background_color,
        light_text_color: data.light_text_color,
        dark_primary_color: data.dark_primary_color,
        dark_background_color: data.dark_background_color,
        dark_text_color: data.dark_text_color,
      }
    : null;

  syncSiteTheme(root, settings);

  try {
    const visitorMode = getVisitorThemeMode(root);
    const palette = settings ? getActivePaletteForMode(settings, visitorMode) : null;
    if (palette) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          vars: deriveTheme(palette),
          themeMode: visitorMode,
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
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) load();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener(THEME_MODE_CHANGE_EVENT, onModeChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return null;
}

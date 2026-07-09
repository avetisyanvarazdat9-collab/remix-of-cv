import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { applyTheme, deriveTheme, clearTheme } from "@/lib/theme-derive";

const STORAGE_KEY = "lovable.theme.v1";

async function load() {
  const root = document.documentElement;
  if (root.classList.contains("dark")) {
    clearTheme(root);
    return;
  }
  const { data } = await supabase
    .from("site_settings")
    .select("primary_color, background_color, text_color")
    .eq("id", true)
    .maybeSingle();
  if (!data) return;
  const input = {
    primary: data.primary_color,
    background: data.background_color,
    text: data.text_color,
  };
  applyTheme(root, input);
  try {
    const vars = deriveTheme(input);
    const isLight =
      root.style.colorScheme === "light" ? true : false;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ vars, colorScheme: isLight ? "light" : "dark" }),
    );
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
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return null;
}

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSiteLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("logo_url")
        .eq("id", true)
        .maybeSingle();
      if (active) setLogoUrl(data?.logo_url ?? null);
    };
    load();
    const channel = supabase
      .channel("site_settings_logo")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => load(),
      )
      .subscribe();
    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return logoUrl;
}

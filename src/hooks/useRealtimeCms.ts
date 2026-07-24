import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Map table → TanStack Query key used in src/lib/queries.ts
const TABLE_QUERY_KEYS: Record<string, string> = {
  blog_posts: "blog_posts",
  projects: "projects",
  courses: "courses",
  video_courses: "video_courses",
  companies: "companies",
  talks: "talks",
  profile: "profile",
  skills: "skills",
  education: "education",
  professional_experience: "professional_experience",
  four_dimensions: "four_dimensions",
  home_content: "home_content",
  navigation_menu: "navigation_menu",
  testimonials: "testimonials",
  statistics: "statistics",
  international_experience: "international_experience",

};


const TABLES = Object.keys(TABLE_QUERY_KEYS);

/**
 * Subscribe once to realtime INSERT/UPDATE/DELETE on every public CMS table
 * and invalidate the matching TanStack Query so the UI reflects admin edits
 * without a refresh. Debounced per-key to coalesce bursts.
 */
export function useRealtimeCms() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const pending = new Map<string, ReturnType<typeof setTimeout>>();
    const scheduleInvalidate = (key: string) => {
      const existing = pending.get(key);
      if (existing) clearTimeout(existing);
      pending.set(
        key,
        setTimeout(() => {
          pending.delete(key);
          queryClient.invalidateQueries({ queryKey: [key] });
        }, 150),
      );
    };

    const channel = supabase.channel("public:cms-realtime");
    for (const table of TABLES) {
      channel.on(
        "postgres_changes" as never,
        { event: "*", schema: "public", table },
        () => scheduleInvalidate(TABLE_QUERY_KEYS[table]),
      );
    }
    channel.subscribe();

    return () => {
      for (const t of pending.values()) clearTimeout(t);
      pending.clear();
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}

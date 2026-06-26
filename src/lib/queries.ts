import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

async function run<T>(query: PromiseLike<{ data: T | null; error: unknown }>): Promise<T> {
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? ([] as unknown as T));
}

const PUBLIC_PROFILE_COLUMNS =
  "id,name,title,tagline,location,bio,photo_url,cv_url,github_url,linkedin_url,twitter_url,website_url,created_at,updated_at,i18n";

export const profileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: async (): Promise<Tables<"profile"> | null> => {
    const { data, error } = await supabase
      .from("profile")
      .select(PUBLIC_PROFILE_COLUMNS)
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data as Tables<"profile"> | null;
  },
});

export const homeContentQuery = queryOptions({
  queryKey: ["home_content"],
  queryFn: async (): Promise<Tables<"home_content"> | null> => {
    const { data, error } = await supabase
      .from("home_content")
      .select("*")
      .eq("id", true)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
});

export const skillsQuery = queryOptions({
  queryKey: ["skills"],
  queryFn: () => run(supabase.from("skills").select("*").order("display_order")),
});

export const educationQuery = queryOptions({
  queryKey: ["education"],
  queryFn: () => run(supabase.from("education").select("*").order("display_order")),
});

export const certificationsQuery = queryOptions({
  queryKey: ["certifications"],
  queryFn: () => run(supabase.from("certifications").select("*").order("display_order")),
});

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: () => run(supabase.from("projects").select("*").order("display_order")),
});

export const coursesQuery = queryOptions({
  queryKey: ["courses"],
  queryFn: () => run(supabase.from("courses").select("*").order("display_order")),
});

export const videoCoursesQuery = queryOptions({
  queryKey: ["video_courses"],
  queryFn: () => run(supabase.from("video_courses").select("*").order("display_order")),
});

export const talksQuery = queryOptions({
  queryKey: ["talks"],
  queryFn: () =>
    run(supabase.from("talks").select("*").order("event_date", { ascending: false })),
});

export const blogQuery = queryOptions({
  queryKey: ["blog_posts"],
  queryFn: () =>
    run(supabase.from("blog_posts").select("*").order("published_at", { ascending: false })),
});

export const companiesQuery = queryOptions({
  queryKey: ["companies"],
  queryFn: () => run(supabase.from("companies").select("*").order("display_order")),
});

export const messagesQuery = queryOptions({
  queryKey: ["messages"],
  queryFn: () =>
    run(supabase.from("messages").select("*").order("created_at", { ascending: false })),
});

export const navigationMenuQuery = queryOptions({
  queryKey: ["navigation_menu"],
  queryFn: () =>
    run(supabase.from("navigation_menu").select("*").order("order_index", { ascending: true })),
});


import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import {
  getInternationalExperience,
  getInternationalExperienceFacets,
  type IntlFilters,
} from "@/lib/international-experience.functions";

async function run<T>(query: PromiseLike<{ data: T | null; error: unknown }>): Promise<T> {
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? ([] as unknown as T));
}

const PUBLIC_PROFILE_COLUMNS =
  "id,name,title,tagline,location,bio,email,phone,photo_url,cv_url,website_url,created_at,updated_at,i18n";

export const profileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: async (): Promise<Tables<"profile"> | null> => {
    const { data, error } = await supabase
      .from("profile")
      .select(PUBLIC_PROFILE_COLUMNS)
      .order("created_at", { ascending: true })
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

export const professionalExperienceQuery = queryOptions({
  queryKey: ["professional_experience"],
  queryFn: () =>
    run(supabase.from("professional_experience").select("*").order("display_order")),
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

export const learningResourcesQuery = queryOptions({
  queryKey: ["learning_resources"],
  queryFn: () => run(supabase.from("learning_resources").select("*").order("display_order")),
});

export const successStoriesQuery = queryOptions({
  queryKey: ["success_stories"],
  queryFn: () => run(supabase.from("success_stories").select("*").order("display_order")),
});

export const awardsQuery = queryOptions({
  queryKey: ["awards"],
  queryFn: () => run(supabase.from("awards").select("*").order("display_order")),
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

export type AboutHighlightInstitution = {
  name: string;
  url: string;
  logo_url: string;
};

export type AboutHighlight = {
  id: string;
  role: string;
  institutions: AboutHighlightInstitution[];
  i18n: Record<string, { hy: string; en: string; ru: string }>;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

export const aboutHighlightsQuery = queryOptions({
  queryKey: ["about_highlights"],
  queryFn: () =>
    run(
      supabase
        .from("about_highlights")
        .select("*")
        .eq("is_visible", true)
        .order("display_order"),
    ) as Promise<AboutHighlight[]>,
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

export const testimonialsQuery = queryOptions({
  queryKey: ["testimonials"],
  queryFn: () =>
    run(supabase.from("testimonials").select("*").eq("is_visible", true).order("display_order")),
});

export const statisticsQuery = queryOptions({
  queryKey: ["statistics"],
  queryFn: () =>
    run(supabase.from("statistics").select("*").eq("is_visible", true).order("display_order")),
});

export const socialLinksQuery = queryOptions({
  queryKey: ["social_links"],
  queryFn: () =>
    run(
      supabase
        .from("social_links")
        .select("id,platform,url,is_visible,display_order")
        .eq("is_visible", true)
        .order("display_order"),
    ),
});

export const socialLinksAdminQuery = queryOptions({
  queryKey: ["social_links", "admin"],
  queryFn: () => run(supabase.from("social_links").select("*").order("display_order")),
});

export const fourDimensionsQuery = queryOptions({
  queryKey: ["four_dimensions"],
  queryFn: () =>
    run(
      supabase
        .from("four_dimensions")
        .select("*")
        .eq("is_visible", true)
        .order("display_order"),
    ),
});

export const fourDimensionsAdminQuery = queryOptions({
  queryKey: ["four_dimensions", "admin"],
  queryFn: () => run(supabase.from("four_dimensions").select("*").order("display_order")),
});

export const internationalExperienceQuery = (filters: IntlFilters = {}) =>
  queryOptions({
    queryKey: [
      "international_experience",
      filters.category ?? null,
      filters.fromYear ?? null,
      filters.toYear ?? null,
    ],
    queryFn: () => getInternationalExperience({ data: filters }),
  });

export const internationalExperienceFacetsQuery = queryOptions({
  queryKey: ["international_experience", "facets"],
  queryFn: () => getInternationalExperienceFacets(),
});





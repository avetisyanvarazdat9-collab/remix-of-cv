import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-8VUd3M7h.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-BL4k_rC0.js
var getInternationalExperience = createServerFn({ method: "GET" }).inputValidator((input) => ({
	category: input?.category ?? null,
	fromYear: input?.fromYear ?? null,
	toYear: input?.toYear ?? null
})).handler(createSsrRpc("8d20edcd259ce170ab1f9605151520148b2a48d1641f39a9e0cb164be802d9c9"));
var getInternationalExperienceFacets = createServerFn({ method: "GET" }).handler(createSsrRpc("6417a56e17e6b795fff57787286d84bc4c201d1fc280086373cee6436b01cc9f"));
async function run(query) {
	const { data, error } = await query;
	if (error) throw error;
	return data ?? [];
}
var PUBLIC_PROFILE_COLUMNS = "id,name,title,tagline,location,bio,email,phone,photo_url,cv_url,website_url,created_at,updated_at,i18n";
var profileQuery = queryOptions({
	queryKey: ["profile"],
	queryFn: async () => {
		const { data, error } = await supabase.from("profile").select(PUBLIC_PROFILE_COLUMNS).order("created_at", { ascending: true }).limit(1).maybeSingle();
		if (error) throw error;
		return data;
	}
});
var homeContentQuery = queryOptions({
	queryKey: ["home_content"],
	queryFn: async () => {
		const { data, error } = await supabase.from("home_content").select("*").eq("id", true).maybeSingle();
		if (error) throw error;
		return data;
	}
});
var skillsQuery = queryOptions({
	queryKey: ["skills"],
	queryFn: () => run(supabase.from("skills").select("*").order("display_order"))
});
var educationQuery = queryOptions({
	queryKey: ["education"],
	queryFn: () => run(supabase.from("education").select("*").order("display_order"))
});
var professionalExperienceQuery = queryOptions({
	queryKey: ["professional_experience"],
	queryFn: () => run(supabase.from("professional_experience").select("*").order("display_order"))
});
var certificationsQuery = queryOptions({
	queryKey: ["certifications"],
	queryFn: () => run(supabase.from("certifications").select("*").order("display_order"))
});
var projectsQuery = queryOptions({
	queryKey: ["projects"],
	queryFn: () => run(supabase.from("projects").select("*").order("display_order"))
});
var coursesQuery = queryOptions({
	queryKey: ["courses"],
	queryFn: () => run(supabase.from("courses").select("*").order("display_order"))
});
var videoCoursesQuery = queryOptions({
	queryKey: ["video_courses"],
	queryFn: () => run(supabase.from("video_courses").select("*").order("display_order"))
});
var talksQuery = queryOptions({
	queryKey: ["talks"],
	queryFn: () => run(supabase.from("talks").select("*").order("event_date", { ascending: false }))
});
var blogQuery = queryOptions({
	queryKey: ["blog_posts"],
	queryFn: () => run(supabase.from("blog_posts").select("*").order("published_at", { ascending: false }))
});
var companiesQuery = queryOptions({
	queryKey: ["companies"],
	queryFn: () => run(supabase.from("companies").select("*").order("display_order"))
});
queryOptions({
	queryKey: ["messages"],
	queryFn: () => run(supabase.from("messages").select("*").order("created_at", { ascending: false }))
});
var navigationMenuQuery = queryOptions({
	queryKey: ["navigation_menu"],
	queryFn: () => run(supabase.from("navigation_menu").select("*").order("order_index", { ascending: true }))
});
var testimonialsQuery = queryOptions({
	queryKey: ["testimonials"],
	queryFn: () => run(supabase.from("testimonials").select("*").eq("is_visible", true).order("display_order"))
});
var statisticsQuery = queryOptions({
	queryKey: ["statistics"],
	queryFn: () => run(supabase.from("statistics").select("*").eq("is_visible", true).order("display_order"))
});
var socialLinksQuery = queryOptions({
	queryKey: ["social_links"],
	queryFn: () => run(supabase.from("social_links").select("id,platform,url,is_visible,display_order").eq("is_visible", true).order("display_order"))
});
queryOptions({
	queryKey: ["social_links", "admin"],
	queryFn: () => run(supabase.from("social_links").select("*").order("display_order"))
});
var fourDimensionsQuery = queryOptions({
	queryKey: ["four_dimensions"],
	queryFn: () => run(supabase.from("four_dimensions").select("*").eq("is_visible", true).order("display_order"))
});
queryOptions({
	queryKey: ["four_dimensions", "admin"],
	queryFn: () => run(supabase.from("four_dimensions").select("*").order("display_order"))
});
var internationalExperienceQuery = (filters = {}) => queryOptions({
	queryKey: [
		"international_experience",
		filters.category ?? null,
		filters.fromYear ?? null,
		filters.toYear ?? null
	],
	queryFn: () => getInternationalExperience({ data: filters })
});
queryOptions({
	queryKey: ["international_experience", "facets"],
	queryFn: () => getInternationalExperienceFacets()
});
//#endregion
export { testimonialsQuery as _, educationQuery as a, internationalExperienceQuery as c, profileQuery as d, projectsQuery as f, talksQuery as g, statisticsQuery as h, coursesQuery as i, navigationMenuQuery as l, socialLinksQuery as m, certificationsQuery as n, fourDimensionsQuery as o, skillsQuery as p, companiesQuery as r, homeContentQuery as s, blogQuery as t, professionalExperienceQuery as u, videoCoursesQuery as v };

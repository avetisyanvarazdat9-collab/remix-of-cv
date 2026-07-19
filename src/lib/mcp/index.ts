import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import listProjects from "./tools/list-projects";
import listCourses from "./tools/list-courses";
import sendContactMessage from "./tools/send-contact-message";

// Issuer must be the direct supabase.co host (not the .lovable.cloud proxy).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "varazdat-mcp",
  title: "Varazdat Avetisyan MCP",
  version: "0.1.0",
  instructions:
    "Tools for Dr. Varazdat Avetisyan's personal brand site. Read blog posts, projects, and courses, and send contact messages as the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listBlogPosts, getBlogPost, listProjects, listCourses, sendContactMessage],
});

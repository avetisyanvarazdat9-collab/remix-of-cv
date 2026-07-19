import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForToken } from "../supabase";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Fetch a single blog post by slug, including full content.",
  inputSchema: { slug: z.string().min(1).describe("Blog post slug.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = supabaseForToken(ctx.getToken()!);
    const { data, error } = await sb.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: `No blog post with slug "${slug}"` }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: { post: data } };
  },
});

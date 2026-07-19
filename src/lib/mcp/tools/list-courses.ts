import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForToken } from "../supabase";

export default defineTool({
  name: "list_courses",
  title: "List courses",
  description: "List courses (written and video).",
  inputSchema: {
    kind: z.enum(["written", "video", "all"]).optional().describe("Filter by course type (default all)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ kind }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = supabaseForToken(ctx.getToken()!);
    const k = kind ?? "all";
    const results: Record<string, unknown> = {};
    if (k === "written" || k === "all") {
      const { data, error } = await sb.from("courses").select("*");
      if (error) return { content: [{ type: "text", text: error.message }], isError: true };
      results.courses = data;
    }
    if (k === "video" || k === "all") {
      const { data, error } = await sb.from("video_courses").select("*");
      if (error) return { content: [{ type: "text", text: error.message }], isError: true };
      results.video_courses = data;
    }
    return { content: [{ type: "text", text: JSON.stringify(results) }], structuredContent: results };
  },
});

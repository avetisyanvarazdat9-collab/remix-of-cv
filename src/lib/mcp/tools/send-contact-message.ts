import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForToken } from "../supabase";

export default defineTool({
  name: "send_contact_message",
  title: "Send contact message",
  description: "Send a contact message to Dr. Varazdat Avetisyan on behalf of the signed-in user.",
  inputSchema: {
    name: z.string().min(1).describe("Sender's name."),
    email: z.string().email().describe("Sender's email address."),
    subject: z.string().min(1).describe("Message subject."),
    message: z.string().min(1).describe("Message body."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ name, email, subject, message }, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = supabaseForToken(ctx.getToken()!);
    const { data, error } = await sb
      .from("messages")
      .insert({ name, email, subject, body: message })
      .select()
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: `Message sent (id: ${data?.id ?? "?"})` }], structuredContent: { message: data } };
  },
});

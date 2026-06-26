import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { formatDateTime } from "@/lib/format-date";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const [rows, setRows] = useState<Tables<"messages">[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function markRead(id: string, value: boolean) {
    const { error } = await supabase.from("messages").update({ is_read: value }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  async function del(id: string) {
    if (!confirm("Delete message?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Messages</h1>
      <p className="mt-1 text-muted-foreground">Submissions from the contact form.</p>
      <div className="mt-6 space-y-3">
        {loading ? <p className="text-muted-foreground">Loading…</p>
          : rows.length === 0 ? <p className="text-muted-foreground">No messages yet.</p>
          : rows.map((m) => (
            <div key={m.id} className={`glass rounded-2xl p-5 ${m.is_read ? "opacity-70" : ""}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-medium">{m.name} <span className="text-sm text-muted-foreground">&lt;{m.email}&gt;</span></p>
                  {m.subject && <p className="text-sm text-primary">{m.subject}</p>}
                </div>
                <p className="text-xs text-muted-foreground">{formatDateTime(m.created_at)}</p>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{m.body}</p>
              <div className="mt-3 flex gap-2">
                <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1 text-xs hover:bg-accent">
                  <Mail className="size-3" /> Reply
                </a>
                <button onClick={() => markRead(m.id, !m.is_read)} className="rounded-md border border-border px-3 py-1 text-xs hover:bg-accent">
                  Mark as {m.is_read ? "unread" : "read"}
                </button>
                <button onClick={() => del(m.id)} className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1 text-xs text-destructive hover:bg-destructive/10">
                  <Trash2 className="size-3" /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

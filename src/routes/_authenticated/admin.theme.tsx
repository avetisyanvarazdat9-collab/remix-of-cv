import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { applyTheme } from "@/lib/theme-derive";

export const Route = createFileRoute("/_authenticated/admin/theme")({
  head: () => ({ meta: [{ title: "Theme — Admin" }] }),
  component: ThemeEditor,
});

type Colors = { primary_color: string; background_color: string; text_color: string };

const DEFAULTS: Colors = {
  primary_color: "#7c5cff",
  background_color: "#0f172a",
  text_color: "#f1f5f9",
};

const PRESETS: { name: string; tag: "Dark" | "Light" | "Tech"; colors: Colors }[] = [
  // Dark
  { name: "Midnight Violet", tag: "Dark", colors: { primary_color: "#7c5cff", background_color: "#0f172a", text_color: "#f1f5f9" } },
  { name: "Obsidian Gold",   tag: "Dark", colors: { primary_color: "#f5c451", background_color: "#0a0a0a", text_color: "#f4f4f5" } },
  { name: "Deep Forest",     tag: "Dark", colors: { primary_color: "#34d399", background_color: "#0a1410", text_color: "#ecfdf5" } },
  { name: "Crimson Noir",    tag: "Dark", colors: { primary_color: "#fb7185", background_color: "#170b10", text_color: "#fff1f2" } },
  // Tech
  { name: "Cyber Cyan",      tag: "Tech", colors: { primary_color: "#22d3ee", background_color: "#0b1220", text_color: "#e2e8f0" } },
  { name: "Electric Indigo", tag: "Tech", colors: { primary_color: "#6366f1", background_color: "#0c0a1f", text_color: "#e0e7ff" } },
  { name: "Neon Lime",       tag: "Tech", colors: { primary_color: "#a3e635", background_color: "#0a0f0a", text_color: "#f7fee7" } },
  // Light
  { name: "Soft Minimalist", tag: "Light", colors: { primary_color: "#111827", background_color: "#fafaf9", text_color: "#1c1917" } },
  { name: "Clean Slate",     tag: "Light", colors: { primary_color: "#475569", background_color: "#f8fafc", text_color: "#0f172a" } },
  { name: "Gentle Teal",     tag: "Light", colors: { primary_color: "#0d9488", background_color: "#f0fdfa", text_color: "#134e4a" } },
  { name: "Sky Pastel",      tag: "Light", colors: { primary_color: "#3b82f6", background_color: "#f0f9ff", text_color: "#0c4a6e" } },
  { name: "Warm Sand",       tag: "Light", colors: { primary_color: "#c2410c", background_color: "#fffaf0", text_color: "#431407" } },
];

const TAG_STYLES: Record<"Dark" | "Light" | "Tech", string> = {
  Dark: "bg-slate-500/15 text-slate-300",
  Light: "bg-amber-400/15 text-amber-500",
  Tech: "bg-cyan-500/15 text-cyan-400",
};


function ThemeEditor() {
  const [colors, setColors] = useState<Colors>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("primary_color, background_color, text_color")
      .eq("id", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        if (data) setColors(data);
        setLoading(false);
      });
  }, []);

  function patch(key: keyof Colors, value: string) {
    setColors((c) => ({ ...c, [key]: value }));
  }

  function applyPreview(c: Colors) {
    applyTheme(document.documentElement, {
      primary: c.primary_color,
      background: c.background_color,
      text: c.text_color,
    });
  }

  useEffect(() => {
    applyPreview(colors);
  }, [colors]);

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: true, ...colors }, { onConflict: "id" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Theme saved — applied site-wide");
  }

  function reset() {
    setColors(DEFAULTS);
  }

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  const fields: { key: keyof Colors; label: string; hint: string }[] = [
    { key: "primary_color",    label: "Primary",    hint: "Buttons, links, accents" },
    { key: "background_color", label: "Background", hint: "Page background" },
    { key: "text_color",       label: "Text",       hint: "Foreground text" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Theme</h1>
      <p className="mt-1 text-muted-foreground">
        Pick colors or a preset. Changes preview live and apply site-wide on save.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">Custom colors</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {fields.map((f) => (
              <label key={f.key} className="block">
                <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </span>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background/60 p-2">
                  <input
                    type="color"
                    value={colors[f.key]}
                    onChange={(e) => patch(f.key, e.target.value)}
                    className="size-10 cursor-pointer rounded border-0 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={colors[f.key]}
                    onChange={(e) => patch(f.key, e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                    spellCheck={false}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{f.hint}</p>
              </label>
            ))}
          </div>

          <h2 className="mt-8 font-display text-lg font-semibold">Presets</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setColors(p.colors)}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50"
              >
                <span
                  className="flex h-12 w-16 shrink-0 overflow-hidden rounded-md border border-white/10"
                  aria-hidden
                >
                  <span className="flex-1" style={{ background: p.colors.background_color }} />
                  <span className="flex-1" style={{ background: p.colors.primary_color }} />
                  <span className="flex-1" style={{ background: p.colors.text_color }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-foreground">{p.name}</span>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLES[p.tag]}`}>
                    {p.tag}
                  </span>
                </span>
              </button>
            ))}
          </div>


          <div className="mt-8 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save theme"}
            </button>
            <button
              onClick={reset}
              className="rounded-md border border-border px-5 py-2 text-sm"
            >
              Reset defaults
            </button>
          </div>
        </div>

        <div
          className="rounded-2xl border border-border p-6"
          style={{ background: colors.background_color, color: colors.text_color }}
        >
          <p className="text-xs uppercase tracking-wider opacity-70">Preview</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Sample heading</h3>
          <p className="mt-2 text-sm opacity-80">
            The quick brown fox jumps over the lazy dog.
          </p>
          <button
            className="mt-4 rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ background: colors.primary_color }}
          >
            Primary button
          </button>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-3 block text-sm underline"
            style={{ color: colors.primary_color }}
          >
            Accent link
          </a>
        </div>
      </div>
    </div>
  );
}

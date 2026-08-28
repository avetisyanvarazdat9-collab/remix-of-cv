import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { type ThemePalette } from "@/lib/theme-derive";

const THEME_STORAGE_KEY = "lovable.theme.v1";

export const Route = createFileRoute("/_authenticated/admin/theme")({
  head: () => ({ meta: [{ title: "Theme Admin" }] }),
  component: ThemeEditor,
});

type PresetColors = {
  primary_color: string;
  background_color: string;
  text_color: string;
};

type Preset = {
  name: string;
  tag: "Dark" | "Light" | "Tech";
  colors: PresetColors;
};

type ModePaletteState = {
  useDefault: boolean;
  colors: ThemePalette;
};

type ThemeFormState = {
  light: ModePaletteState;
  dark: ModePaletteState;
};

const FALLBACK_LIGHT: ThemePalette = {
  primary: "#111827",
  background: "#fafaf9",
  text: "#1c1917",
};

const FALLBACK_DARK: ThemePalette = {
  primary: "#7c5cff",
  background: "#0f172a",
  text: "#f1f5f9",
};

const DEFAULT_FORM: ThemeFormState = {
  light: { useDefault: true, colors: { ...FALLBACK_LIGHT } },
  dark: { useDefault: true, colors: { ...FALLBACK_DARK } },
};

const PRESETS: Preset[] = [
  { name: "Midnight Violet", tag: "Dark", colors: { primary_color: "#7c5cff", background_color: "#0f172a", text_color: "#f1f5f9" } },
  { name: "Obsidian Gold", tag: "Dark", colors: { primary_color: "#f5c451", background_color: "#0a0a0a", text_color: "#f4f4f5" } },
  { name: "Deep Forest", tag: "Dark", colors: { primary_color: "#34d399", background_color: "#0a1410", text_color: "#ecfdf5" } },
  { name: "Crimson Noir", tag: "Dark", colors: { primary_color: "#fb7185", background_color: "#170b10", text_color: "#fff1f2" } },
  { name: "Cyber Cyan", tag: "Tech", colors: { primary_color: "#22d3ee", background_color: "#0b1220", text_color: "#e2e8f0" } },
  { name: "Electric Indigo", tag: "Tech", colors: { primary_color: "#6366f1", background_color: "#0c0a1f", text_color: "#e0e7ff" } },
  { name: "Neon Lime", tag: "Tech", colors: { primary_color: "#a3e635", background_color: "#0a0f0a", text_color: "#f7fee7" } },
  { name: "Soft Minimalist", tag: "Light", colors: { primary_color: "#111827", background_color: "#fafaf9", text_color: "#1c1917" } },
  { name: "Clean Slate", tag: "Light", colors: { primary_color: "#475569", background_color: "#f8fafc", text_color: "#0f172a" } },
  { name: "Gentle Teal", tag: "Light", colors: { primary_color: "#0d9488", background_color: "#f0fdfa", text_color: "#134e4a" } },
  { name: "Sky Pastel", tag: "Light", colors: { primary_color: "#3b82f6", background_color: "#f0f9ff", text_color: "#0c4a6e" } },
  { name: "Warm Sand", tag: "Light", colors: { primary_color: "#c2410c", background_color: "#fffaf0", text_color: "#431407" } },
];

const TAG_STYLES: Record<"Dark" | "Light" | "Tech", string> = {
  Dark: "bg-slate-500/15 text-slate-300",
  Light: "bg-amber-400/15 text-amber-500",
  Tech: "bg-cyan-500/15 text-cyan-400",
};

const COLOR_FIELDS: { key: keyof ThemePalette; label: string; hint: string }[] = [
  { key: "primary", label: "Primary", hint: "Buttons, links, accents" },
  { key: "background", label: "Background", hint: "Page background" },
  { key: "text", label: "Text", hint: "Foreground text" },
];

function presetToPalette(colors: PresetColors): ThemePalette {
  return {
    primary: colors.primary_color,
    background: colors.background_color,
    text: colors.text_color,
  };
}

function paletteFromRow(
  primary: string | null | undefined,
  background: string | null | undefined,
  text: string | null | undefined,
  fallback: ThemePalette,
): ModePaletteState {
  if (primary && background && text) {
    return {
      useDefault: false,
      colors: { primary, background, text },
    };
  }
  return { useDefault: true, colors: { ...fallback } };
}

function formToDbPayload(form: ThemeFormState) {
  return {
    light_primary_color: form.light.useDefault ? null : form.light.colors.primary,
    light_background_color: form.light.useDefault ? null : form.light.colors.background,
    light_text_color: form.light.useDefault ? null : form.light.colors.text,
    dark_primary_color: form.dark.useDefault ? null : form.dark.colors.primary,
    dark_background_color: form.dark.useDefault ? null : form.dark.colors.background,
    dark_text_color: form.dark.useDefault ? null : form.dark.colors.text,
  };
}

function PreviewCard({
  label,
  palette,
  useDefault,
}: {
  label: string;
  palette: ThemePalette;
  useDefault: boolean;
}) {
  return (
    <div
      className="rounded-2xl border border-border p-5"
      style={
        useDefault
          ? undefined
          : { background: palette.background, color: palette.text }
      }
    >
      <p className="text-xs uppercase tracking-wider opacity-70">{label}</p>
      {useDefault ? (
        <p className="mt-3 text-sm text-muted-foreground">Site default theme from styles.css</p>
      ) : (
        <>
          <h3 className="mt-2 font-display text-xl font-bold">Sample heading</h3>
          <p className="mt-2 text-sm opacity-80">The quick brown fox jumps over the lazy dog.</p>
          <button
            type="button"
            className="mt-4 rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ background: palette.primary }}
          >
            Primary button
          </button>
          <span className="mt-3 block text-sm underline" style={{ color: palette.primary }}>
            Accent link
          </span>
        </>
      )}
    </div>
  );
}

function ModeSection({
  title,
  description,
  mode,
  state,
  presets,
  onChange,
}: {
  title: string;
  description: string;
  mode: "light" | "dark";
  state: ModePaletteState;
  presets: Preset[];
  onChange: (next: ModePaletteState) => void;
}) {
  function patchColor(key: keyof ThemePalette, value: string) {
    onChange({
      useDefault: false,
      colors: { ...state.colors, [key]: value },
    });
  }

  function applyPreset(colors: PresetColors) {
    onChange({
      useDefault: false,
      colors: presetToPalette(colors),
    });
  }

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={state.useDefault}
          onChange={(e) => onChange({ ...state, useDefault: e.target.checked })}
          className="size-4 rounded border-input"
        />
        Use site default
      </label>

      <div className={`mt-4 grid gap-4 sm:grid-cols-3 ${state.useDefault ? "pointer-events-none opacity-50" : ""}`}>
        {COLOR_FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">
              {field.label}
            </span>
            <div className="flex items-center gap-2 rounded-md border border-input bg-background/60 p-2">
              <input
                type="color"
                value={state.colors[field.key]}
                onChange={(e) => patchColor(field.key, e.target.value)}
                disabled={state.useDefault}
                className="size-10 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={state.colors[field.key]}
                onChange={(e) => patchColor(field.key, e.target.value)}
                disabled={state.useDefault}
                className="flex-1 bg-transparent text-sm outline-none"
                spellCheck={false}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>
          </label>
        ))}
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {mode === "light" ? "Light" : "Dark & tech"} presets
      </h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => applyPreset(preset.colors)}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50"
          >
            <span
              className="flex h-12 w-16 shrink-0 overflow-hidden rounded-md border border-white/10"
              aria-hidden
            >
              <span className="flex-1" style={{ background: preset.colors.background_color }} />
              <span className="flex-1" style={{ background: preset.colors.primary_color }} />
              <span className="flex-1" style={{ background: preset.colors.text_color }} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium text-foreground">{preset.name}</span>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLES[preset.tag]}`}
              >
                {preset.tag}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ThemeEditor() {
  const [form, setForm] = useState<ThemeFormState>(DEFAULT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select(
        "light_primary_color, light_background_color, light_text_color, dark_primary_color, dark_background_color, dark_text_color",
      )
      .eq("id", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        if (data) {
          setForm({
            light: paletteFromRow(
              data.light_primary_color,
              data.light_background_color,
              data.light_text_color,
              FALLBACK_LIGHT,
            ),
            dark: paletteFromRow(
              data.dark_primary_color,
              data.dark_background_color,
              data.dark_text_color,
              FALLBACK_DARK,
            ),
          });
        }
        setLoading(false);
      });
  }, []);

  async function save() {
    setSaving(true);
    const payload = formToDbPayload(form);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: true, ...payload }, { onConflict: "id" });
    setSaving(false);
    if (error) return toast.error(error.message);
    try {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify({ v: 2, updatedAt: Date.now() }),
      );
    } catch {
      /* ignore */
    }
    toast.success("Theme saved. Visitors will see it on their next page load or refresh.");
  }

  function reset() {
    setForm(DEFAULT_FORM);
  }

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  const lightPresets = PRESETS.filter((p) => p.tag === "Light");
  const darkPresets = PRESETS.filter((p) => p.tag === "Dark" || p.tag === "Tech");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Theme</h1>
      <p className="mt-1 text-muted-foreground">
        Configure independent color palettes for light and dark visitor modes. Each mode can use custom colors or fall back to the site defaults in styles.css.
      </p>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <ModeSection
            title="Light mode colors"
            description="Applied when visitors use light mode. Enable “Use site default” to keep the built-in light theme."
            mode="light"
            state={form.light}
            presets={lightPresets}
            onChange={(light) => setForm((current) => ({ ...current, light }))}
          />

          <ModeSection
            title="Dark mode colors"
            description="Applied when visitors use dark mode. Enable “Use site default” to keep the built-in dark theme."
            mode="dark"
            state={form.dark}
            presets={darkPresets}
            onChange={(dark) => setForm((current) => ({ ...current, dark }))}
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save theme"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-md border border-border px-5 py-2 text-sm"
            >
              Reset to site defaults
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <PreviewCard label="Light mode preview" palette={form.light.colors} useDefault={form.light.useDefault} />
          <PreviewCard label="Dark mode preview" palette={form.dark.colors} useDefault={form.dark.useDefault} />
        </div>
      </div>
    </div>
  );
}

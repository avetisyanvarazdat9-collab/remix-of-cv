import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { updateAdminUsername } from "@/lib/admin-auth.functions";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Admin" }] }),
  component: SettingsPage,
});

const META_KEY = "admin:siteMeta";
type SiteMeta = { title: string; description: string; keywords: string; ogImage: string };
const META_DEFAULTS: SiteMeta = {
  title: "Varazdat Avetisyan — AI/ML Researcher",
  description: "AI/ML researcher, lecturer and entrepreneur.",
  keywords: "AI, ML, research, lecturer, Armenia",
  ogImage: "",
};

function SettingsPage() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState<SiteMeta>(META_DEFAULTS);
  const [pw, setPw] = useState({ next: "", confirm: "" });
  const [savingPw, setSavingPw] = useState(false);
  const [username, setUsername] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [savingContact, setSavingContact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(META_KEY);
      if (raw) setMeta({ ...META_DEFAULTS, ...JSON.parse(raw) });
    } catch { /* ignore */ }
    supabase.auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata as { username?: string } | undefined;
      const fromEmail = data.user?.email?.split("@")[0] ?? "";
      setUsername(meta?.username ?? fromEmail);
    });
    supabase
      .from("site_settings")
      .select("logo_url, contact_email")
      .eq("id", true)
      .maybeSingle()
      .then(({ data }) => {
        setLogoUrl(data?.logo_url ?? null);
        setContactEmail(data?.contact_email ?? "");
      });
  }, []);

  async function saveContactEmail(e: React.FormEvent) {
    e.preventDefault();
    const value = contactEmail.trim();
    if (value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      return toast.error("Please enter a valid email address");
    }
    setSavingContact(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: true, contact_email: value || null }, { onConflict: "id" });
    setSavingContact(false);
    if (error) return toast.error(error.message);
    toast.success("Contact email saved");
  }

  async function uploadLogo(file: File) {
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (file.size > 500_000) return toast.error("Image must be under 500 KB");
    setUploadingLogo(true);
    try {
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const { error } = await supabase
        .from("site_settings")
        .upsert({ id: true, logo_url: dataUrl }, { onConflict: "id" });
      if (error) throw error;
      setLogoUrl(dataUrl);
      toast.success("Logo updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingLogo(false);
    }
  }

  async function removeLogo() {
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: true, logo_url: null }, { onConflict: "id" });
    if (error) return toast.error(error.message);
    setLogoUrl(null);
    toast.success("Logo removed");
  }

  function saveMeta(e: React.FormEvent) {
    e.preventDefault();
    window.localStorage.setItem(META_KEY, JSON.stringify(meta));
    toast.success("Site metadata saved");
  }

  async function changeUsername(e: React.FormEvent) {
    e.preventDefault();
    const next = username.trim().toLowerCase();
    if (!/^[a-z0-9_.-]{3,32}$/.test(next)) {
      return toast.error("Username must be 3-32 chars (a-z, 0-9, _.-)");
    }
    setSavingName(true);
    try {
      await updateAdminUsername({ data: { username: next } });
      toast.success("Username updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update username");
    } finally {
      setSavingName(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pw.next.length < 8) return toast.error("Password must be at least 8 characters");
    if (pw.next !== pw.confirm) return toast.error("Passwords do not match");
    setSavingPw(true);
    const { error } = await supabase.auth.updateUser({ password: pw.next });
    setSavingPw(false);
    if (error) return toast.error(error.message);
    setPw({ next: "", confirm: "" });
    toast.success("Password updated");
  }

  async function signOutAll() {
    await supabase.auth.signOut({ scope: "global" });
    toast.message("Signed out everywhere");
    navigate({ to: "/" });
  }


  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Account security and site-wide metadata.</p>
      </div>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">Site logo</h2>
        <p className="mt-1 text-sm text-muted-foreground">Shown in the top-left of the header. Max 500 KB. PNG or SVG with transparent background looks best.</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex h-16 min-w-[120px] items-center justify-center rounded-md border border-border bg-background/60 px-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Current logo" className="h-10 max-h-10 w-auto object-contain" />
            ) : (
              <span className="font-display text-sm text-muted-foreground">Varazdat<span className="text-primary">.</span></span>
            )}
          </div>
          <label className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            {uploadingLogo ? "Uploading…" : logoUrl ? "Replace logo" : "Upload logo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingLogo}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadLogo(f);
                e.target.value = "";
              }}
            />
          </label>
          {logoUrl && (
            <button onClick={removeLogo} className="rounded-md border border-border px-4 py-2 text-sm">
              Remove
            </button>
          )}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">Contact email</h2>
        <p className="mt-1 text-sm text-muted-foreground">Destination address shown for contact form notifications. Messages are also saved in Admin → Messages.</p>
        <form onSubmit={saveContactEmail} className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[220px]">
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button disabled={savingContact} className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {savingContact ? "Saving…" : "Save email"}
          </button>
        </form>
      </section>


      <section className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">Change username</h2>
        <p className="mt-1 text-sm text-muted-foreground">Used to sign in. Lowercase letters, digits, and . _ - allowed (3-32 chars).</p>
        <form onSubmit={changeUsername} className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[220px]">
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={32}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button disabled={savingName} className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
            {savingName ? "Saving…" : "Save username"}
          </button>
        </form>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">Change password</h2>

        <form onSubmit={changePassword} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">New password</label>
            <input
              type="password"
              value={pw.next}
              onChange={(e) => setPw({ ...pw, next: e.target.value })}
              required
              minLength={8}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">Confirm</label>
            <input
              type="password"
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
              required
              minLength={8}
              className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="sm:col-span-2 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={signOutAll} className="rounded-md border border-border px-4 py-2 text-sm">
              Sign out everywhere
            </button>
            <button disabled={savingPw} className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
              {savingPw ? "Updating…" : "Update password"}
            </button>
          </div>
        </form>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">Site metadata</h2>
        <p className="mt-1 text-sm text-muted-foreground">Stored locally as a draft. Use these values when updating the site head tags.</p>
        <form onSubmit={saveMeta} className="mt-4 grid gap-4">
          <Field label="Site title" value={meta.title} onChange={(v) => setMeta({ ...meta, title: v })} />
          <Field label="Description" value={meta.description} onChange={(v) => setMeta({ ...meta, description: v })} textarea />
          <Field label="Keywords" value={meta.keywords} onChange={(v) => setMeta({ ...meta, keywords: v })} />
          <Field label="OG image URL" value={meta.ogImage} onChange={(v) => setMeta({ ...meta, ogImage: v })} />
          <div className="flex justify-end">
            <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">Save metadata</button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
      )}
    </div>
  );
}

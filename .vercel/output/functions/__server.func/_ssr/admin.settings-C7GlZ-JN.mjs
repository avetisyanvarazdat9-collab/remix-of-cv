import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-8VUd3M7h.mjs";
import { G as Eye, K as EyeOff } from "../_libs/lucide-react.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BBZdFWpw.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-C7GlZ-JN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
createServerFn({ method: "POST" }).inputValidator((data) => {
	const d = data;
	if (!d?.username || typeof d.username !== "string") throw new Error("username required");
	return { username: d.username.trim().toLowerCase() };
}).handler(createSsrRpc("7367afa100073334325a057de6ce6008287e30297b35ba0d830214064936058f"));
/**
* Update the signed-in admin's username. Stored both in user_metadata and as
* a shadow email (`${username}@admin.local`) so future logins can resolve it.
*/
var updateAdminUsername = createServerFn({ method: "POST" }).inputValidator((data) => {
	const username = String(data?.username ?? "").trim().toLowerCase();
	if (!/^[a-z0-9_.-]{3,32}$/.test(username)) throw new Error("Username must be 3-32 chars (a-z, 0-9, _.-)");
	return { username };
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("9450ca7946261615eb2a8b93487ba6df8ac222de1059194329ef15bb1f217d4a"));
var MIN_PASSWORD_LENGTH = 8;
var EMPTY_PASSWORD_FORM = {
	current: "",
	next: "",
	confirm: ""
};
function mapPasswordChangeError(message) {
	const lower = message.toLowerCase();
	if (lower.includes("invalid login") || lower.includes("invalid credentials")) return "Current password is incorrect.";
	if (lower.includes("same password") || lower.includes("should be different")) return "New password must be different from your current password.";
	if (lower.includes("weak") || lower.includes("at least") || lower.includes("password")) return "Password must meet the minimum security requirements.";
	return "Could not change password. Please try again.";
}
var META_KEY = "admin:siteMeta";
var META_DEFAULTS = {
	title: "Varazdat Avetisyan — AI/ML Researcher",
	description: "AI/ML researcher, lecturer and entrepreneur.",
	keywords: "AI, ML, research, lecturer, Armenia",
	ogImage: ""
};
function SettingsPage() {
	const navigate = useNavigate();
	const [meta, setMeta] = (0, import_react.useState)(META_DEFAULTS);
	const [pw, setPw] = (0, import_react.useState)(EMPTY_PASSWORD_FORM);
	const [savingPw, setSavingPw] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [savingName, setSavingName] = (0, import_react.useState)(false);
	const [logoUrl, setLogoUrl] = (0, import_react.useState)(null);
	const [uploadingLogo, setUploadingLogo] = (0, import_react.useState)(false);
	const [contactEmail, setContactEmail] = (0, import_react.useState)("");
	const [savingContact, setSavingContact] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		try {
			const raw = window.localStorage.getItem(META_KEY);
			if (raw) setMeta({
				...META_DEFAULTS,
				...JSON.parse(raw)
			});
		} catch {}
		supabase.auth.getUser().then(({ data }) => {
			const meta = data.user?.user_metadata;
			const fromEmail = data.user?.email?.split("@")[0] ?? "";
			setUsername(meta?.username ?? fromEmail);
		});
		supabase.from("site_settings").select("logo_url, contact_email").eq("id", true).maybeSingle().then(({ data }) => {
			setLogoUrl(data?.logo_url ?? null);
			setContactEmail(data?.contact_email ?? "");
		});
	}, []);
	async function saveContactEmail(e) {
		e.preventDefault();
		const value = contactEmail.trim();
		if (value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return toast.error("Please enter a valid email address");
		setSavingContact(true);
		const { error } = await supabase.from("site_settings").upsert({
			id: true,
			contact_email: value || null
		}, { onConflict: "id" });
		setSavingContact(false);
		if (error) return toast.error(error.message);
		toast.success("Contact email saved");
	}
	async function uploadLogo(file) {
		if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
		if (file.size > 5e5) return toast.error("Image must be under 500 KB");
		setUploadingLogo(true);
		try {
			const dataUrl = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = () => reject(reader.error);
				reader.readAsDataURL(file);
			});
			const { error } = await supabase.from("site_settings").upsert({
				id: true,
				logo_url: dataUrl
			}, { onConflict: "id" });
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
		const { error } = await supabase.from("site_settings").upsert({
			id: true,
			logo_url: null
		}, { onConflict: "id" });
		if (error) return toast.error(error.message);
		setLogoUrl(null);
		toast.success("Logo removed");
	}
	function saveMeta(e) {
		e.preventDefault();
		window.localStorage.setItem(META_KEY, JSON.stringify(meta));
		toast.success("Site metadata saved");
	}
	async function changeUsername(e) {
		e.preventDefault();
		const next = username.trim().toLowerCase();
		if (!/^[a-z0-9_.-]{3,32}$/.test(next)) return toast.error("Username must be 3-32 chars (a-z, 0-9, _.-)");
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
	async function changePassword(e) {
		e.preventDefault();
		const { current, next, confirm } = pw;
		if (!current.trim()) return toast.error("Current password is required.");
		if (!next.trim()) return toast.error("New password is required.");
		if (next.length < MIN_PASSWORD_LENGTH) return toast.error("Password must meet the minimum security requirements.");
		if (next !== confirm) return toast.error("New passwords do not match.");
		if (next === current) return toast.error("New password must be different from your current password.");
		setSavingPw(true);
		try {
			const { data: userData, error: userError } = await supabase.auth.getUser();
			const email = userData.user?.email;
			if (userError || !email) {
				toast.error("Could not verify your account. Please sign in again.");
				return;
			}
			const { error: verifyError } = await supabase.auth.signInWithPassword({
				email,
				password: current
			});
			if (verifyError) {
				toast.error("Current password is incorrect.");
				return;
			}
			const { error: updateError } = await supabase.auth.updateUser({ password: next });
			if (updateError) {
				toast.error(mapPasswordChangeError(updateError.message));
				return;
			}
			setPw(EMPTY_PASSWORD_FORM);
			toast.success("Password changed successfully.");
		} catch {
			toast.error("Could not change password. Please try again.");
		} finally {
			setSavingPw(false);
		}
	}
	async function signOutAll() {
		await supabase.auth.signOut({ scope: "global" });
		toast.message("Signed out everywhere");
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Account security and site-wide metadata."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Site logo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Shown in the top-left of the header. Max 500 KB. PNG or SVG with transparent background looks best."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-16 min-w-[120px] items-center justify-center rounded-md border border-border bg-background/60 px-3",
								children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: logoUrl,
									alt: "Current logo",
									className: "h-10 max-h-10 w-auto object-contain"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-sm text-muted-foreground",
									children: ["Varazdat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "."
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
								children: [uploadingLogo ? "Uploading…" : logoUrl ? "Replace logo" : "Upload logo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									className: "hidden",
									disabled: uploadingLogo,
									onChange: (e) => {
										const f = e.target.files?.[0];
										if (f) uploadLogo(f);
										e.target.value = "";
									}
								})]
							}),
							logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: removeLogo,
								className: "rounded-md border border-border px-4 py-2 text-sm",
								children: "Remove"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Contact email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Destination address shown for contact form notifications. Messages are also saved in Admin → Messages."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: saveContactEmail,
						className: "mt-4 flex flex-wrap items-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-[220px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: contactEmail,
								onChange: (e) => setContactEmail(e.target.value),
								placeholder: "you@example.com",
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: savingContact,
							className: "rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60",
							children: savingContact ? "Saving…" : "Save email"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Change username"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Used to sign in. Lowercase letters, digits, and . _ - allowed (3-32 chars)."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: changeUsername,
						className: "mt-4 flex flex-wrap items-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-[220px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
								children: "Username"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: username,
								onChange: (e) => setUsername(e.target.value),
								required: true,
								minLength: 3,
								maxLength: 32,
								className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: savingName,
							className: "rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60",
							children: savingName ? "Saving…" : "Save username"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Change password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Update your admin account password. You must enter your current password to confirm the change."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: changePassword,
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
								label: "Current password",
								value: pw.current,
								onChange: (current) => setPw({
									...pw,
									current
								}),
								autoComplete: "current-password",
								className: "sm:col-span-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
								label: "New password",
								value: pw.next,
								onChange: (next) => setPw({
									...pw,
									next
								}),
								autoComplete: "new-password",
								minLength: MIN_PASSWORD_LENGTH
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
								label: "Confirm new password",
								value: pw.confirm,
								onChange: (confirm) => setPw({
									...pw,
									confirm
								}),
								autoComplete: "new-password",
								minLength: MIN_PASSWORD_LENGTH
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 flex flex-wrap justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: signOutAll,
									className: "rounded-md border border-border px-4 py-2 text-sm",
									children: "Sign out everywhere"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: savingPw,
									className: "rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60",
									children: savingPw ? "Changing…" : "Change Password"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Site metadata"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Stored locally as a draft. Use these values when updating the site head tags."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: saveMeta,
						className: "mt-4 grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Site title",
								value: meta.title,
								onChange: (v) => setMeta({
									...meta,
									title: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Description",
								value: meta.description,
								onChange: (v) => setMeta({
									...meta,
									description: v
								}),
								textarea: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Keywords",
								value: meta.keywords,
								onChange: (v) => setMeta({
									...meta,
									keywords: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "OG image URL",
								value: meta.ogImage,
								onChange: (v) => setMeta({
									...meta,
									ogImage: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground",
									children: "Save metadata"
								})
							})
						]
					})
				]
			})
		]
	});
}
function Field({ label, value, onChange, textarea }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
		children: label
	}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		rows: 3,
		value,
		onChange: (e) => onChange(e.target.value),
		className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
	})] });
}
function PasswordField({ label, value, onChange, autoComplete, minLength, className }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "mb-1 block text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: visible ? "text" : "password",
				value,
				onChange: (e) => onChange(e.target.value),
				required: true,
				minLength,
				autoComplete,
				className: "w-full rounded-md border border-input bg-background/60 px-3 py-2 pr-10 text-sm outline-none focus:border-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setVisible((v) => !v),
				"aria-label": visible ? "Hide password" : "Show password",
				className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground",
				children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
			})]
		})]
	});
}
//#endregion
export { SettingsPage as component };

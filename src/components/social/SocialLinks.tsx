import { getSocialPlatform } from "@/lib/social-platforms";
import type { Tables } from "@/integrations/supabase/types";

export type SocialLink = Pick<Tables<"social_links">, "id" | "platform" | "url" | "is_visible" | "display_order">;

function SocialPlatformIcon({ platform, className }: { platform: string; className?: string }) {
  const config = getSocialPlatform(platform);
  if (!config) return null;
  const Icon = config.icon;
  const wrapperClass = className
    ? "flex size-4 items-center justify-center"
    : "flex size-5 items-center justify-center";
  if (Icon) {
    return (
      <span className={wrapperClass}>
        <Icon className={className ?? "size-[18px] shrink-0"} strokeWidth={1.75} />
      </span>
    );
  }
  return (
    <span
      className={`${wrapperClass} ${className ? "text-[10px]" : "text-[11px]"} font-semibold leading-none`}
    >
      {config.glyph}
    </span>
  );
}

export function SocialLinksIconRow({
  links,
  className,
}: {
  links: SocialLink[];
  className?: string;
}) {
  const visible = links.filter((l) => l.url?.trim());
  if (visible.length === 0) return null;

  return (
    <div className={`inline-flex items-center justify-center gap-3.5 ${className ?? ""}`}>
      {visible.map((link) => {
        const config = getSocialPlatform(link.platform);
        return (
          <a
            key={link.id}
            href={link.url!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={config?.label ?? link.platform}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card/90 text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
          >
            <SocialPlatformIcon platform={link.platform} />
          </a>
        );
      })}
    </div>
  );
}

export function SocialLinksContactList({ links }: { links: SocialLink[] }) {
  const visible = links.filter((l) => l.url?.trim());
  if (visible.length === 0) return null;

  return (
    <>
      {visible.map((link) => {
        const config = getSocialPlatform(link.platform);
        return (
          <li key={link.id} className="flex items-center gap-3">
            <span className="flex size-4 shrink-0 items-center justify-center text-primary">
              <SocialPlatformIcon platform={link.platform} className="size-4" />
            </span>
            <a
              href={link.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {config?.label ?? link.platform}
            </a>
          </li>
        );
      })}
    </>
  );
}

export function socialLinkUrls(links: SocialLink[]): string[] {
  return links.map((l) => l.url?.trim()).filter((u): u is string => !!u && /^https?:\/\//i.test(u));
}

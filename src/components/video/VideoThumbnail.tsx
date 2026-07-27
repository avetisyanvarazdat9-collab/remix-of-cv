import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveVideoThumbnail, type VideoThumbnailSource } from "@/lib/video-thumbnail";

type VideoThumbnailProps = {
  video: VideoThumbnailSource;
  title: string;
  fallbackLabel?: string;
  className?: string;
  roundedClassName?: string;
};

export function VideoThumbnail({
  video,
  title,
  fallbackLabel = "Video",
  className,
  roundedClassName = "rounded-lg",
}: VideoThumbnailProps) {
  const src = resolveVideoThumbnail(video);
  const hasImage = !!src;

  return (
    <div
      className={cn(
        "group/thumb relative aspect-video w-full overflow-hidden bg-muted",
        roundedClassName,
        className,
      )}
    >
      {hasImage ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 via-muted to-accent/10">
          <span className="flex size-14 items-center justify-center rounded-full border border-primary/20 bg-background/80 text-primary/70 shadow-sm">
            <Play className="ml-0.5 size-6 fill-current" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {fallbackLabel}
          </span>
        </div>
      )}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-colors duration-300",
          hasImage ? "bg-foreground/0 group-hover/thumb:bg-foreground/20" : "bg-foreground/5 group-hover/thumb:bg-foreground/10",
        )}
      />
      <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-primary">
          <Play className="ml-0.5 size-5 fill-current" />
        </span>
      </span>
    </div>
  );
}

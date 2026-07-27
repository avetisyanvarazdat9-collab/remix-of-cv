/** Extract a YouTube video ID from common URL formats. */
export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtube-nocookie.com")) {
      const fromQuery = u.searchParams.get("v");
      if (fromQuery) return fromQuery;
      const parts = u.pathname.split("/").filter(Boolean);
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
      const shortsIdx = parts.indexOf("shorts");
      if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
    }
  } catch {
    return null;
  }
  return null;
}

/** YouTube CDN thumbnail for a video URL (hqdefault = 480×360). */
export function getYouTubeThumbnailUrl(url: string | null | undefined): string | null {
  const id = getYouTubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export type VideoThumbnailSource = {
  thumbnail_url?: string | null;
  image_url?: string | null;
  video_url?: string | null;
  youtube_url?: string | null;
};

/**
 * Resolve the best thumbnail for a video:
 * 1. Explicit Supabase/custom thumbnail_url
 * 2. Legacy image_url column (init-cms / older schemas)
 * 3. Auto-derived YouTube poster from youtube_url or video_url
 */
export function resolveVideoThumbnail(video: VideoThumbnailSource | null | undefined): string | null {
  if (!video) return null;

  const stored = video.thumbnail_url?.trim() || video.image_url?.trim();
  if (stored) return stored;

  return getYouTubeThumbnailUrl(video.youtube_url) ?? getYouTubeThumbnailUrl(video.video_url);
}

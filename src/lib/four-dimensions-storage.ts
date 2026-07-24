import { supabase } from "@/integrations/supabase/client";

export const FOUR_DIMENSIONS_BUCKET = "four-dimensions";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "gif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function validateFourDimensionImage(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const typeOk = ALLOWED_IMAGE_TYPES.includes(file.type);
  const extOk = ALLOWED_IMAGE_EXTS.includes(ext);
  if (!typeOk && !extOk) {
    return `Unsupported file type. Use JPG, PNG, WebP, or GIF.`;
  }
  if (file.size === 0) return "File is empty.";
  if (file.size > MAX_IMAGE_BYTES) return "Image must be under 5 MB.";
  return null;
}

export function storagePathFromPublicUrl(url: string): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${FOUR_DIMENSIONS_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
}

export async function deleteFourDimensionImage(url: string | null | undefined) {
  const path = url ? storagePathFromPublicUrl(url) : null;
  if (!path) return;
  const { error } = await supabase.storage.from(FOUR_DIMENSIONS_BUCKET).remove([path]);
  if (error) throw error;
}

export async function uploadFourDimensionImage(
  dimensionId: string,
  file: File,
  oldUrl?: string | null,
): Promise<string> {
  const validationError = validateFourDimensionImage(file);
  if (validationError) throw new Error(validationError);

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${dimensionId}/image.${ext}`;

  if (oldUrl) {
    const oldPath = storagePathFromPublicUrl(oldUrl);
    if (oldPath && oldPath !== path) {
      await supabase.storage.from(FOUR_DIMENSIONS_BUCKET).remove([oldPath]);
    }
  }

  const { error: uploadError } = await supabase.storage
    .from(FOUR_DIMENSIONS_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: true, contentType: file.type });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(FOUR_DIMENSIONS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

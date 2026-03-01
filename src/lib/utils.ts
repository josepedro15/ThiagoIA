import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOptimizedImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;

  try {
    // Treat as URL, if not parseable it will throw
    const parsedUrl = new URL(url);

    // Quick handle for google drive links
    if (parsedUrl.hostname.includes('drive.google.com')) {
      let fileId = parsedUrl.searchParams.get('id');

      if (!fileId) {
        // Fallback for /file/d/ID/view format
        const match = parsedUrl.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match) fileId = match[1];
      }

      // Google's thumbnail API still reliably serves images without CORS or strict referrer checks
      // Sz=w1000 ensures high enough resolution for most product displays
      if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      }
    }

    return url;
  } catch (e) {
    // If it's a relative path or invalid URL, just return it as is
    return url;
  }
}

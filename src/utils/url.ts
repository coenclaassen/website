/**
 * Get a URL with the base path prepended
 * Use this for all internal links and assets when using a base path
 */
export function getUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Ensure base ends with / and path doesn't start with /
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseWithSlash}${cleanPath}`;
}


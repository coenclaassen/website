/**
 * Get a URL with the base path prepended
 * Use this for all internal links and assets when using a base path
 */
export function getUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if present, base already has trailing slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}


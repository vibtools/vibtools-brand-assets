/**
 * Resolves an asset path relative to Vite's base path so it works seamlessly on
 * GitHub Pages (e.g. https://<username>.github.io/<repo-name>/),
 * custom root domains, and development preview environments.
 */
export function getAssetUrl(filePath: string): string {
  if (!filePath) return '';
  if (
    filePath.startsWith('http://') ||
    filePath.startsWith('https://') ||
    filePath.startsWith('data:') ||
    filePath.startsWith('blob:')
  ) {
    return filePath;
  }
  const cleanPath = filePath.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || './';
  if (base === './') {
    return `./${cleanPath}`;
  }
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

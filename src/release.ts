// The deploy pipeline rewrites this URL on every release (it greps src/ for
// BlueKit_*.dmg), so everything version-related derives from it.
export const DMG_URL = 'https://downloads.bluekit.md/BlueKit_0.6.5_aarch64.dmg';

// Download buttons go through the bluekit-download Worker (counts the download,
// then redirects to the latest DMG). vercel.json maps /download to the Worker.
export const DOWNLOAD_URL = 'https://www.bluekit.md/download';

export const VERSION = DMG_URL.match(/BlueKit_([\d.]+)_/)?.[1] ?? '';

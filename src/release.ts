// The deploy pipeline rewrites this URL on every release (it greps src/ for
// BlueKit_*.dmg), so everything version-related derives from it.
export const DMG_URL = 'https://downloads.bluekit.md/BlueKit_0.7.0_universal.dmg';

// Download buttons go through the bluekit-download Worker (counts the download,
// then redirects to the latest DMG). vercel.json maps /download to the Worker.
export const DOWNLOAD_URL = 'https://www.bluekit.md/download';

export const VERSION = DMG_URL.match(/BlueKit_([\d.]+)_/)?.[1] ?? '';

// 0.7.0 on ships one universal DMG (Apple Silicon and Intel); earlier releases
// were Apple Silicon only. Follows the file name, so the label changes with the
// release that changes the build.
export const CHIPS = /_universal\.dmg$/.test(DMG_URL) ? 'Apple Silicon and Intel' : 'Apple Silicon';

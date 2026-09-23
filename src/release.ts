// The deploy pipeline rewrites this URL on every release (it greps src/ for
// BlueKit_*.dmg), so everything version-related derives from it.
export const DMG_URL = 'https://pub-bbfe77b031cf40df8b49f3dcd9f96d78.r2.dev/BlueKit_0.5.0_aarch64.dmg';

export const VERSION = DMG_URL.match(/BlueKit_([\d.]+)_/)?.[1] ?? '';

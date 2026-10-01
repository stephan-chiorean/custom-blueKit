import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Static pages in public/<name>/index.html. Vercel serves them at /<name>, but
// Vite's dev and preview servers fall back to the SPA, so rewrite them locally.
// Add a page's folder name here when you add one to public/.
const STATIC_PAGES = ['privacy', 'agent-guide'];

function staticPageRoutes(): Plugin {
  const rewrite = (req: { url?: string }, _res: unknown, next: () => void) => {
    const [path, query] = (req.url ?? '').split('?');
    const name = path.replace(/^\/|\/$/g, '');
    if (STATIC_PAGES.indexOf(name) !== -1) {
      req.url = `/${name}/index.html${query ? `?${query}` : ''}`;
    }
    next();
  };
  return {
    name: 'static-page-routes',
    configureServer: (server) => void server.middlewares.use(rewrite),
    configurePreviewServer: (server) => void server.middlewares.use(rewrite),
  };
}

export default defineConfig({
  plugins: [react(), staticPageRoutes()],
});

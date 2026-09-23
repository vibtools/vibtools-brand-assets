import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// Plugin to serve root asset folders (logos, favicons, bimi, profile, social) in dev and copy during build
function serveBrandAssetDirs(): Plugin {
  const dirs = ['logos', 'favicons', 'bimi', 'profile', 'social'];
  
  const getMimeType = (file: string) => {
    if (file.endsWith('.svg')) return 'image/svg+xml';
    if (file.endsWith('.png')) return 'image/png';
    if (file.endsWith('.ico')) return 'image/x-icon';
    if (file.endsWith('.webmanifest') || file.endsWith('.json')) return 'application/manifest+json';
    if (file.endsWith('.md')) return 'text/markdown';
    return 'application/octet-stream';
  };

  return {
    name: 'serve-brand-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const cleanUrl = req.url.split('?')[0].split('#')[0];
        const firstSegment = cleanUrl.replace(/^\//, '').split('/')[0];
        
        if (dirs.includes(firstSegment)) {
          const filePath = path.join(process.cwd(), cleanUrl.replace(/^\//, ''));
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', getMimeType(filePath));
            res.setHeader('Cache-Control', 'no-cache');
            return fs.createReadStream(filePath).pipe(res);
          }
        }
        next();
      });
    },
    generateBundle() {
      // Copy asset files into build bundle
      for (const dir of dirs) {
        const dirPath = path.join(process.cwd(), dir);
        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath);
          for (const file of files) {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isFile()) {
              this.emitFile({
                type: 'asset',
                fileName: `${dir}/${file}`,
                source: fs.readFileSync(filePath),
              });
            }
          }
        }
      }
      // Emit .nojekyll for GitHub Pages to disable Jekyll processing
      this.emitFile({
        type: 'asset',
        fileName: '.nojekyll',
        source: '',
      });
    },
    closeBundle() {
      // Copy index.html to 404.html so GitHub Pages handles direct routes or refreshes
      const distDir = path.join(process.cwd(), 'dist');
      const distIndex = path.join(distDir, 'index.html');
      const dist404 = path.join(distDir, '404.html');
      if (fs.existsSync(distIndex)) {
        fs.copyFileSync(distIndex, dist404);
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    serveBrandAssetDirs(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
});

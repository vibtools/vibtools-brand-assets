# Vib.Tools Brand Assets

Official brand assets and vector design system for Vib.Tools.

## Repository Structure
- `logos` — Vector SVG logos and PNG variants
- `profile` — Profile avatars and icons
- `favicons` — Multi-resolution favicons and site manifest
- `bimi` — SVG Tiny 1.2 PS certified BIMI avatars
- `social` — OpenGraph and Twitter card banners
- `public` — AI context (`llms.txt`, `ai-context.json`), `robots.txt`, `sitemap.xml`

## GitHub Pages Deployment

The application is deployed at:
`https://vibtools.github.io/vibtools-brand-assets/`

### Recommended GitHub Settings
1. Go to repository **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**:
   - **Recommended:** Select **GitHub Actions**. The included workflow (`.github/workflows/deploy.yml`) builds the Vite app into `./dist` and publishes directly.
   - **Alternative:** Select **Deploy from a branch** -> Branch: **`gh-pages`** -> Folder: **`/ (root)`**. The workflow automatically syncs the compiled build to the `gh-pages` branch.



export interface BrandAsset {
  id: string;
  name: string;
  category: 'logos' | 'bimi' | 'favicons' | 'profile' | 'social';
  categoryLabel: string;
  format: 'SVG' | 'PNG' | 'ICO' | 'MANIFEST';
  filePath: string;
  url: string;
  dimensions: string;
  aspectRatio: string;
  description: string;
  usage: string;
  recommendedBackground: 'any' | 'dark' | 'light';
  tags: string[];
}

export const BRAND_ASSETS: BrandAsset[] = [
  // Logos
  {
    id: 'logo-master',
    name: 'Master Brand Logo',
    category: 'logos',
    categoryLabel: 'Logos & Marks',
    format: 'SVG',
    filePath: '/logos/logo-master.svg',
    url: '/logos/logo-master.svg',
    dimensions: '1254 × 1254',
    aspectRatio: '1:1',
    description: 'The master vector mark featuring the orbital chromatic ring, deep obsidian disc, and electric cyan/blue geometric wings.',
    usage: 'Primary brand mark for web, product splash screens, high-resolution hero placements, and marketing campaigns.',
    recommendedBackground: 'any',
    tags: ['master', 'vector', 'svg', 'emblem', 'icon', 'primary', 'gradient']
  },
  {
    id: 'icon-512',
    name: 'App Icon (512px)',
    category: 'logos',
    categoryLabel: 'Logos & Marks',
    format: 'PNG',
    filePath: '/logos/icon-512.png',
    url: '/logos/icon-512.png',
    dimensions: '512 × 512',
    aspectRatio: '1:1',
    description: 'Crisp raster export of the master emblem with transparent background, optimized for app stores and system launchers.',
    usage: 'App store icon, desktop shortcuts, Electron/mobile applications, launcher tiles.',
    recommendedBackground: 'dark',
    tags: ['icon', 'png', '512px', 'launcher', 'app']
  },
  {
    id: 'vibtools-horizontal-dark',
    name: 'Horizontal Lockup (Dark Theme)',
    category: 'logos',
    categoryLabel: 'Logos & Marks',
    format: 'PNG',
    filePath: '/logos/vibtools-horizontal-dark.png',
    url: '/logos/vibtools-horizontal-dark.png',
    dimensions: '1000 × 260',
    aspectRatio: '3.8:1',
    description: 'Full horizontal brand lockup featuring the Vib.Tools emblem coupled with crisp high-contrast typography designed for dark surfaces.',
    usage: 'Website headers, dashboard navigation bars, documentation headers, and presentation title cards.',
    recommendedBackground: 'dark',
    tags: ['horizontal', 'lockup', 'wordmark', 'dark', 'header', 'nav']
  },
  {
    id: 'vibtools-horizontal-light',
    name: 'Horizontal Lockup (Light Theme)',
    category: 'logos',
    categoryLabel: 'Logos & Marks',
    format: 'PNG',
    filePath: '/logos/vibtools-horizontal-light.png',
    url: '/logos/vibtools-horizontal-light.png',
    dimensions: '1000 × 260',
    aspectRatio: '3.8:1',
    description: 'Full horizontal brand lockup tuned for light and white backgrounds with deep contrast lettering and vivid emblem accents.',
    usage: 'Light theme web headers, invoices, whitepaper printouts, and light UI layouts.',
    recommendedBackground: 'light',
    tags: ['horizontal', 'lockup', 'wordmark', 'light', 'header']
  },
  {
    id: 'vibtools-icon',
    name: 'VibTools Icon (Standard)',
    category: 'logos',
    categoryLabel: 'Logos & Marks',
    format: 'PNG',
    filePath: '/logos/vibtools-icon.png',
    url: '/logos/vibtools-icon.png',
    dimensions: '520 × 520',
    aspectRatio: '1:1',
    description: 'High-contrast standard raster emblem icon with deep black backing and vibrant cyan/blue gradients.',
    usage: 'Compact avatars, product cards, extension icons, and favicon fallbacks.',
    recommendedBackground: 'any',
    tags: ['icon', 'png', 'emblem', 'standard']
  },
  {
    id: 'vibtools-icon-light',
    name: 'VibTools Icon (Light Mode)',
    category: 'logos',
    categoryLabel: 'Logos & Marks',
    format: 'PNG',
    filePath: '/logos/vibtools-icon-light.png',
    url: '/logos/vibtools-icon-light.png',
    dimensions: '520 × 520',
    aspectRatio: '1:1',
    description: 'Optimized emblem icon adjusted for high visibility when displayed over light or white surfaces.',
    usage: 'Light backgrounds, documentation sidebar badges, and print assets.',
    recommendedBackground: 'light',
    tags: ['icon', 'light', 'emblem', 'png']
  },

  // BIMI Email Assets
  {
    id: 'bimi-logo',
    name: 'BIMI Production Logo',
    category: 'bimi',
    categoryLabel: 'BIMI Email',
    format: 'SVG',
    filePath: '/bimi/logo.svg',
    url: '/bimi/logo.svg',
    dimensions: '1254 × 1254',
    aspectRatio: '1:1',
    description: 'Official BIMI (Brand Indicators for Message Identification) SVG Tiny 1.2 PS compliant logo with strict DMARC validation rules.',
    usage: 'DNS TXT record default._bimi.[domain] for verified sender checkmarks in Gmail, Apple Mail, Yahoo Mail, and Fastmail.',
    recommendedBackground: 'any',
    tags: ['bimi', 'dmarc', 'email', 'svg', 'tiny-ps', 'rfc', 'security']
  },
  {
    id: 'bimi-logo-source',
    name: 'BIMI Master Source',
    category: 'bimi',
    categoryLabel: 'BIMI Email',
    format: 'SVG',
    filePath: '/bimi/logo-master-source.svg',
    url: '/bimi/logo-master-source.svg',
    dimensions: '1254 × 1254',
    aspectRatio: '1:1',
    description: 'Source editable vector file containing complete gradient stops and vector layers used to compile BIMI assets.',
    usage: 'Design iterations, vector manipulation, and generating verified certificate graphics (VMC).',
    recommendedBackground: 'any',
    tags: ['bimi', 'source', 'master', 'svg', 'vmc']
  },

  // Profile & Social Avatars
  {
    id: 'profile-photo-svg',
    name: 'Profile Photo (Vector SVG)',
    category: 'profile',
    categoryLabel: 'Profile & Avatars',
    format: 'SVG',
    filePath: '/profile/Profile-Photo-Vib.Tools.svg',
    url: '/profile/Profile-Photo-Vib.Tools.svg',
    dimensions: '1254 × 1254',
    aspectRatio: '1:1',
    description: 'Square avatar vector with deep navy (#000820) container background and perfectly centered emblem.',
    usage: 'Official social profiles on GitHub, Twitter/X, Discord, YouTube, LinkedIn, and Slack organizations.',
    recommendedBackground: 'dark',
    tags: ['profile', 'avatar', 'social', 'svg', 'vector', 'github']
  },
  {
    id: 'profile-photo-png',
    name: 'Profile Photo (High-Res PNG)',
    category: 'profile',
    categoryLabel: 'Profile & Avatars',
    format: 'PNG',
    filePath: '/profile/Profile-Photo-Vib.Tools.png',
    url: '/profile/Profile-Photo-Vib.Tools.png',
    dimensions: '1254 × 1254',
    aspectRatio: '1:1',
    description: 'Universal PNG profile avatar export ready to upload immediately to social and developer accounts.',
    usage: 'Social network profile avatars, developer accounts, forum avatars, and community bots.',
    recommendedBackground: 'dark',
    tags: ['profile', 'avatar', 'png', 'social', 'high-res']
  },

  // Social Open Graph
  {
    id: 'social-og-default',
    name: 'Social Sharing Card (Open Graph)',
    category: 'social',
    categoryLabel: 'Social Cards',
    format: 'PNG',
    filePath: '/social/og-default.png',
    url: '/social/og-default.png',
    dimensions: '1200 × 630',
    aspectRatio: '1.91:1',
    description: 'Official Open Graph preview card for link previews across X (Twitter), Facebook, LinkedIn, iMessage, Discord, and Telegram.',
    usage: '<meta property="og:image"> and <meta name="twitter:image"> across all Vib.Tools web properties.',
    recommendedBackground: 'dark',
    tags: ['og', 'social', 'twitter-card', 'opengraph', 'banner', 'share']
  },

  // Favicons & Web App Manifests
  {
    id: 'favicon-svg',
    name: 'Vector Favicon (Modern)',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'SVG',
    filePath: '/favicons/favicon.svg',
    url: '/favicons/favicon.svg',
    dimensions: '520 × 520',
    aspectRatio: '1:1',
    description: 'Modern SVG favicon for high-DPI retina browsers with embedded lossless graphics.',
    usage: '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    recommendedBackground: 'any',
    tags: ['favicon', 'svg', 'browser', 'tab']
  },
  {
    id: 'favicon-ico',
    name: 'Legacy Favicon (.ico)',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'ICO',
    filePath: '/favicons/favicon.ico',
    url: '/favicons/favicon.ico',
    dimensions: 'Multi-resolution',
    aspectRatio: '1:1',
    description: 'Classic multi-layer ICO container supporting legacy browsers, enterprise clients, and default web crawlers.',
    usage: '<link rel="shortcut icon" href="/favicon.ico">',
    recommendedBackground: 'any',
    tags: ['favicon', 'ico', 'legacy', 'browser']
  },
  {
    id: 'favicon-png',
    name: 'Standard Favicon (PNG)',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'PNG',
    filePath: '/favicons/favicon.png',
    url: '/favicons/favicon.png',
    dimensions: '32 × 32 / 48 × 48',
    aspectRatio: '1:1',
    description: 'Standard 32-bit PNG favicon with transparent background.',
    usage: 'Browser tabs, bookmarks bar, and search engine SERP icons.',
    recommendedBackground: 'any',
    tags: ['favicon', 'png', 'tab']
  },
  {
    id: 'favicon-96',
    name: 'High-DPI Favicon (96px)',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'PNG',
    filePath: '/favicons/favicon-96x96.png',
    url: '/favicons/favicon-96x96.png',
    dimensions: '96 × 96',
    aspectRatio: '1:1',
    description: 'Targeted 96x96 favicon for modern desktop browsers with 2x or 3x device pixel ratios.',
    usage: '<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">',
    recommendedBackground: 'any',
    tags: ['favicon', 'retina', '96px', 'png']
  },
  {
    id: 'apple-touch-icon',
    name: 'Apple Touch Icon',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'PNG',
    filePath: '/favicons/apple-touch-icon.png',
    url: '/favicons/apple-touch-icon.png',
    dimensions: '180 × 180',
    aspectRatio: '1:1',
    description: 'Apple Touch icon optimized for iOS Safari bookmarks and iPhone/iPad home screen bookmark widgets.',
    usage: '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
    recommendedBackground: 'dark',
    tags: ['apple', 'ios', 'touch-icon', 'iphone', 'ipad']
  },
  {
    id: 'manifest-192',
    name: 'PWA Web App Icon (192px)',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'PNG',
    filePath: '/favicons/web-app-manifest-192x192.png',
    url: '/favicons/web-app-manifest-192x192.png',
    dimensions: '192 × 192',
    aspectRatio: '1:1',
    description: 'Standard Android and progressive web app install prompt icon.',
    usage: 'Registered in site.webmanifest under icons array with size 192x192.',
    recommendedBackground: 'dark',
    tags: ['pwa', 'manifest', 'android', '192px']
  },
  {
    id: 'manifest-512',
    name: 'PWA Web App Icon (512px)',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'PNG',
    filePath: '/favicons/web-app-manifest-512x512.png',
    url: '/favicons/web-app-manifest-512x512.png',
    dimensions: '512 × 512',
    aspectRatio: '1:1',
    description: 'High-res PWA splash screen icon and app drawer icon for Chrome OS, Android, and Windows Store apps.',
    usage: 'Registered in site.webmanifest under icons array with size 512x512.',
    recommendedBackground: 'dark',
    tags: ['pwa', 'manifest', 'splash', '512px']
  },
  {
    id: 'vibtools-favicon',
    name: 'VibTools Square Favicon',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'PNG',
    filePath: '/favicons/vibtools-favicon.png',
    url: '/favicons/vibtools-favicon.png',
    dimensions: '520 × 520',
    aspectRatio: '1:1',
    description: 'Dedicated high-resolution square brand favicon PNG.',
    usage: 'CMS favicon uploads, sub-brands, and third-party SaaS integrations.',
    recommendedBackground: 'dark',
    tags: ['favicon', 'square', 'vibtools']
  },
  {
    id: 'site-webmanifest',
    name: 'Web App Manifest (JSON)',
    category: 'favicons',
    categoryLabel: 'Favicons & PWA',
    format: 'MANIFEST',
    filePath: '/favicons/site.webmanifest',
    url: '/favicons/site.webmanifest',
    dimensions: 'N/A',
    aspectRatio: 'N/A',
    description: 'Progressive Web App configuration file declaring standalone display, brand theme colors, and launcher icons.',
    usage: '<link rel="manifest" href="/site.webmanifest">',
    recommendedBackground: 'any',
    tags: ['manifest', 'json', 'pwa', 'webmanifest']
  }
];

export interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  hsl: string;
  cmyk?: string;
  type: 'solid' | 'gradient';
  gradientCss?: string;
  stops?: string[];
  description: string;
}

export const BRAND_COLORS: ColorSwatch[] = [
  {
    name: 'Vib Master Ring',
    role: 'Primary Identity Gradient',
    hex: '#005CFC',
    rgb: 'rgb(0, 92, 252)',
    hsl: 'hsl(218, 100%, 49%)',
    type: 'gradient',
    gradientCss: 'linear-gradient(135deg, #0647ED 0%, #005CFC 34%, #0078FF 62%, #00BDF4 82%, #08E0DE 100%)',
    stops: ['#0647ED', '#005CFC', '#0078FF', '#00BDF4', '#08E0DE'],
    description: 'The defining chromatic gradient on the outer circular ring, flowing from deep electric royal blue to neon cyan.'
  },
  {
    name: 'Cyan Energy Flare',
    role: 'Primary Accent & Highlight',
    hex: '#08E0DE',
    rgb: 'rgb(8, 224, 222)',
    hsl: 'hsl(179, 93%, 45%)',
    type: 'solid',
    description: 'The luminous cyan terminal tone used for the wingtips, glowing borders, and primary interactive call-to-actions.'
  },
  {
    name: 'Electric Blue',
    role: 'Primary Brand Core',
    hex: '#005CFC',
    rgb: 'rgb(0, 92, 252)',
    hsl: 'hsl(218, 100%, 49%)',
    type: 'solid',
    description: 'The core vibrant blue representing precision, high performance, and digital velocity across Vib.Tools services.'
  },
  {
    name: 'Deep Cobalt',
    role: 'Anchor Shade',
    hex: '#0647ED',
    rgb: 'rgb(6, 71, 237)',
    hsl: 'hsl(223, 95%, 48%)',
    type: 'solid',
    description: 'The foundational royal blue providing weight and depth at the base of the emblem ring and left wing.'
  },
  {
    name: 'Aqua Stream',
    role: 'Secondary Accent',
    hex: '#00BDF4',
    rgb: 'rgb(0, 189, 244)',
    hsl: 'hsl(193, 100%, 48%)',
    type: 'solid',
    description: 'Intermediate sky aqua facilitating smooth transition between royal blue and pure neon cyan.'
  },
  {
    name: 'Obsidian Disc',
    role: 'Core Background Disc',
    hex: '#000713',
    rgb: 'rgb(0, 7, 19)',
    hsl: 'hsl(218, 100%, 4%)',
    type: 'gradient',
    gradientCss: 'radial-gradient(circle, #00020A 0%, #000511 58%, #000A20 82%, #031A4C 100%)',
    stops: ['#00020A', '#000511', '#000A20', '#031A4C'],
    description: 'Deep cosmic dark disc background with subtle radial vignette, making the foreground wings and ring glow with intensity.'
  },
  {
    name: 'Deep Space Navy',
    role: 'Profile Background',
    hex: '#000820',
    rgb: 'rgb(0, 8, 32)',
    hsl: 'hsl(225, 100%, 6%)',
    type: 'solid',
    description: 'The canvas tone utilized on official social avatar backgrounds and hero interface backdrops.'
  },
  {
    name: 'Pure Neutral White',
    role: 'Light Backgrounds & Print',
    hex: '#FFFFFF',
    rgb: 'rgb(255, 255, 255)',
    hsl: 'hsl(0, 0%, 100%)',
    type: 'solid',
    description: 'High-clarity canvas background for light mode documentation and corporate communication.'
  }
];

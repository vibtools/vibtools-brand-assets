import JSZip from 'jszip';
import { BRAND_ASSETS } from '../data/brandAssets';

/**
 * Downloads a file directly via a temporary anchor element
 */
export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copies text to clipboard and returns success boolean
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (e) {
      document.body.removeChild(textarea);
      return false;
    }
  }
}

/**
 * Fetches raw SVG text for inspection or copying
 */
export async function fetchRawSvg(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    console.error('Failed to fetch SVG:', err);
    return '<!-- Error loading SVG content -->';
  }
}

/**
 * Rasterizes an SVG file to a PNG image at a custom dimension using HTML5 Canvas
 */
export async function rasterizeSvgToPng(svgUrl: string, targetSize: number): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const svgText = await fetchRawSvg(svgUrl);
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(blobUrl);
          return reject(new Error('Canvas context not available'));
        }
        ctx.drawImage(img, 0, 0, targetSize, targetSize);
        URL.revokeObjectURL(blobUrl);
        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = (e) => {
        URL.revokeObjectURL(blobUrl);
        reject(e);
      };

      img.src = blobUrl;
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Creates and triggers a download of a complete ZIP archive with all brand assets
 */
export async function downloadAllBrandAssetsZip(onProgress?: (percent: number, currentFile: string) => void): Promise<void> {
  const zip = new JSZip();

  const folders: Record<string, JSZip> = {
    logos: zip.folder('logos')!,
    bimi: zip.folder('bimi')!,
    favicons: zip.folder('favicons')!,
    profile: zip.folder('profile')!,
    social: zip.folder('social')!,
  };

  const total = BRAND_ASSETS.length;
  let completed = 0;

  for (const asset of BRAND_ASSETS) {
    try {
      if (onProgress) {
        onProgress(Math.round((completed / total) * 90), asset.name);
      }
      const res = await fetch(asset.url);
      if (res.ok) {
        const blob = await res.blob();
        const filename = asset.filePath.split('/').pop() || `${asset.id}.${asset.format.toLowerCase()}`;
        const folder = folders[asset.category] || zip;
        folder.file(filename, blob);
      }
    } catch (e) {
      console.warn(`Could not add ${asset.filePath} to zip:`, e);
    }
    completed++;
  }

  // Add README & BRAND_GUIDELINES
  zip.file('README.md', `# Vib.Tools Official Brand Assets Kit
Official logo files, BIMI email certificates, favicons, and social cards for Vib.Tools.
Repository: https://github.com/vibtools/vibtools-brand-assets

## Structure:
- /logos: Master SVG emblem, horizontal dark/light lockups, app icons
- /bimi: BIMI RFC-compliant SVG Tiny 1.2 PS email avatars
- /favicons: Modern SVG, multi-res ICO, high-DPI PNGs, and site.webmanifest
- /profile: Official avatars for GitHub, Twitter/X, Discord, Slack
- /social: Open Graph 1200x630 cards for social media sharing

## Colors:
- Electric Blue: #005CFC
- Neon Cyan: #08E0DE
- Deep Cobalt: #0647ED
- Sky Aqua: #00BDF4
- Obsidian Core: #000713

Copyright (c) Vib.Tools. All rights reserved.
`);

  if (onProgress) onProgress(95, 'Compressing archive...');
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  if (onProgress) onProgress(100, 'Complete');

  const downloadUrl = URL.createObjectURL(zipBlob);
  downloadFile(downloadUrl, 'vibtools-brand-assets-complete.zip');
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);
}

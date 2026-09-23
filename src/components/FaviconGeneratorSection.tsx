import React, { useState } from 'react';
import { 
  Globe, 
  Copy, 
  Check, 
  Download, 
  Smartphone, 
  Laptop, 
  Code, 
  FileCode,
  Layers,
  Sparkles
} from 'lucide-react';
import { copyToClipboard, downloadFile, getAssetUrl } from '../utils/assetHelpers';

export const FaviconGeneratorSection: React.FC = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [selectedSnippetType, setSelectedSnippetType] = useState<'html' | 'nextjs' | 'manifest'>('html');

  const handleCopy = async (text: string, type: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedSnippet(type);
      setTimeout(() => setCopiedSnippet(null), 2000);
    }
  };

  const htmlHeadSnippet = `<!-- Vib.Tools Official Favicons & App Icons -->
<link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
<link rel="alternate icon" href="/favicons/favicon.ico" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
<link rel="manifest" href="/favicons/site.webmanifest" />
<meta name="theme-color" content="#000713" />`;

  const nextjsMetadataSnippet = `// Next.js App Router metadata configuration (app/layout.tsx)
export const metadata: Metadata = {
  title: 'Vib.Tools',
  icons: {
    icon: [
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicons/favicon.ico' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
};`;

  const webManifestJson = `{
  "name": "Vib.Tools",
  "short_name": "VibTools",
  "description": "Developer tooling, email authentication, and brand infrastructure suite.",
  "icons": [
    {
      "src": "/favicons/web-app-manifest-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/favicons/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "theme_color": "#000713",
  "background_color": "#000713",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/"
}`;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="relative rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-cyan-950/40 border border-cyan-500/20 p-6 sm:p-10 overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-4">
            <Globe className="w-3.5 h-3.5" />
            Favicon & PWA Deployment Suite
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Favicons & Web App Manifests
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Multi-platform browser icon bundle optimized for ultra-sharp retina tabs, iOS Home Screen shortcuts, Windows taskbar tiles, and Android progressive web apps.
          </p>
        </div>
      </div>

      {/* Simulator: Desktop Browser Tab + Mobile Home Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Browser Tab Simulator */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <Laptop className="w-5 h-5 text-cyan-400" />
              Desktop Browser Tab Simulation
            </h2>
            <p className="text-xs text-slate-400 mb-6">Real-time preview of the SVG/ICO favicon in desktop browser tabs</p>

            {/* Mock Chrome Window */}
            <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl">
              {/* Tab Bar */}
              <div className="bg-[#0f172a] px-3 pt-2.5 flex items-center gap-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>

                {/* Active Vib.Tools Tab */}
                <div className="bg-[#1e293b] text-slate-200 px-3.5 py-1.5 rounded-t-lg text-xs font-medium flex items-center gap-2.5 max-w-xs truncate border-t border-x border-slate-700 shadow">
                  <img 
                    src={getAssetUrl('favicons/favicon.svg')} 
                    alt="VibTools Tab Icon" 
                    className="w-4 h-4 rounded-full object-contain shrink-0" 
                  />
                  <span className="truncate">Vib.Tools — High Performance Dev Tools</span>
                  <span className="text-slate-400 text-[10px] ml-1">✕</span>
                </div>

                {/* Secondary Tab */}
                <div className="text-slate-400 px-3 py-1.5 text-xs truncate max-w-[140px] hidden sm:block">
                  GitHub - vibtools
                </div>
              </div>

              {/* URL Address Bar */}
              <div className="bg-[#1e293b] p-2.5 flex items-center gap-3 border-b border-slate-700/60 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span>←</span>
                  <span>→</span>
                  <span>⟳</span>
                </div>
                <div className="flex-1 bg-[#0f172a] px-3 py-1 rounded-md text-slate-300 font-mono text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-emerald-400">🔒</span>
                    <span className="text-white font-medium">https://</span>
                    <span className="text-cyan-300 font-bold">vib.tools</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">Production</span>
                </div>
              </div>

              {/* Viewport placeholder */}
              <div className="p-6 bg-[#090d16] flex items-center justify-center text-center">
                <div className="flex items-center gap-3">
                  <img src={getAssetUrl('logos/logo-master.svg')} alt="Vib.Tools" className="w-8 h-8" />
                  <span className="font-extrabold text-white text-base">Vib.Tools Ecosystem</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => downloadFile('favicons/favicon.svg', 'favicon.svg')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download favicon.svg
            </button>
            <button
              onClick={() => downloadFile('favicons/favicon.ico', 'favicon.ico')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download favicon.ico
            </button>
          </div>
        </div>

        {/* Mobile / PWA App Launcher Simulator */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              Mobile Home Screen PWA
            </h2>
            <p className="text-xs text-slate-400 mb-6">Preview of the Apple Touch Icon & 192/512px app icon on iOS & Android</p>

            {/* Mock Mobile Grid */}
            <div className="relative rounded-2xl p-6 bg-gradient-to-b from-[#0b132b] to-[#040817] border border-slate-800 shadow-xl max-w-xs mx-auto">
              <div className="grid grid-cols-3 gap-6 text-center">
                
                {/* Vib.Tools Official App Icon */}
                <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="relative w-14 h-14 rounded-2xl p-1 bg-[#000713] border-2 border-cyan-500/60 shadow-lg shadow-cyan-500/30 flex items-center justify-center transform group-hover:scale-105 transition-transform">
                    <img 
                      src={getAssetUrl('favicons/apple-touch-icon.png')} 
                      alt="VibTools App Icon" 
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-white drop-shadow">Vib.Tools</span>
                </div>

                {/* Dummy Mock Icons */}
                <div className="flex flex-col items-center gap-1.5 opacity-40">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-xl font-bold">
                    ⚙️
                  </div>
                  <span className="text-[11px] text-slate-400">Settings</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 opacity-40">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 text-xl font-bold">
                    💬
                  </div>
                  <span className="text-[11px] text-slate-400">Messages</span>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-8 text-center text-[10px] font-mono text-cyan-400">
                PWA Standalone Mode Enabled
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => downloadFile('/favicons/apple-touch-icon.png', 'apple-touch-icon.png')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              apple-touch-icon.png
            </button>
            <button
              onClick={() => downloadFile('/favicons/web-app-manifest-512x512.png', 'web-app-manifest-512x512.png')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              manifest-512.png
            </button>
          </div>
        </div>
      </div>

      {/* Copy-Paste Code Embed Snippets */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              Copy-Paste Integration Snippets
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Ready-to-use snippets for HTML5, Next.js, and PWA manifests</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSnippetType('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${selectedSnippetType === 'html' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              HTML5 &lt;head&gt;
            </button>
            <button
              onClick={() => setSelectedSnippetType('nextjs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${selectedSnippetType === 'nextjs' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              Next.js Metadata
            </button>
            <button
              onClick={() => setSelectedSnippetType('manifest')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${selectedSnippetType === 'manifest' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              site.webmanifest
            </button>
          </div>
        </div>

        {/* Code Box */}
        <div className="relative">
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={() => {
                const code = selectedSnippetType === 'html' ? htmlHeadSnippet : selectedSnippetType === 'nextjs' ? nextjsMetadataSnippet : webManifestJson;
                handleCopy(code, 'tab-snippet');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-cyan-300 text-xs font-mono border border-slate-700 transition-colors shadow-lg"
            >
              {copiedSnippet === 'tab-snippet' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-[#020617] p-5 rounded-xl border border-slate-800 text-cyan-100 font-mono text-xs overflow-auto leading-relaxed select-all">
            <code>
              {selectedSnippetType === 'html' && htmlHeadSnippet}
              {selectedSnippetType === 'nextjs' && nextjsMetadataSnippet}
              {selectedSnippetType === 'manifest' && webManifestJson}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

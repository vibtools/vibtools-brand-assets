import React, { useState } from 'react';
import { 
  Globe, 
  Copy, 
  Check, 
  Download, 
  Smartphone, 
  Laptop
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

  const htmlHeadSnippet = `<!-- Vib.Tools Favicons & App Icons -->
<link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
<link rel="alternate icon" href="/favicons/favicon.ico" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
<link rel="manifest" href="/favicons/site.webmanifest" />
<meta name="theme-color" content="#000713" />`;

  const nextjsMetadataSnippet = `// Next.js App Router (app/layout.tsx)
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
  "display": "standalone"
}`;

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="rounded-xl bg-gradient-to-r from-[#040c24] via-[#020716] to-[#041028] border border-slate-800/90 p-4 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
            <Globe className="w-3.5 h-3.5" />
            <span>BROWSER & PWA INTEGRATION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Favicons & App Icons
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Multi-platform browser icon bundle for retina tabs, iOS Home Screen shortcuts, and Android PWAs.
          </p>
        </div>
      </div>

      {/* Simulator: Browser Tab & Mobile App Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Browser Tab Simulator */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-cyan-400" />
              Browser Tab Simulation
            </h3>

            {/* Mock Chrome Window */}
            <div className="bg-[#1e293b] rounded-lg overflow-hidden border border-slate-700/80 shadow-md">
              <div className="bg-[#0f172a] px-3 pt-2 flex items-center gap-2 border-b border-slate-800">
                <div className="flex items-center gap-1 mr-2">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>

                {/* Active Tab */}
                <div className="bg-[#1e293b] text-slate-200 px-3 py-1 rounded-t-md text-[11px] font-medium flex items-center gap-2 max-w-[200px] truncate border-t border-x border-slate-700 shadow-xs">
                  <img 
                    src={getAssetUrl('favicons/favicon.svg')} 
                    alt="VibTools Tab Icon" 
                    className="w-3.5 h-3.5 rounded-full object-contain shrink-0" 
                  />
                  <span className="truncate">Vib.Tools Ecosystem</span>
                  <span className="text-slate-400 text-[10px] ml-auto">✕</span>
                </div>
              </div>

              {/* URL Address Bar */}
              <div className="bg-[#1e293b] p-2 flex items-center gap-2 border-b border-slate-700/60 text-[11px]">
                <span className="text-slate-400 text-xs">← → ⟳</span>
                <div className="flex-1 bg-[#0f172a] px-2.5 py-0.5 rounded text-slate-300 font-mono text-[10px] flex items-center justify-between">
                  <div className="flex items-center gap-1 truncate">
                    <span className="text-emerald-400">🔒</span>
                    <span className="text-white">https://</span>
                    <span className="text-cyan-300 font-bold">vib.tools</span>
                  </div>
                  <span className="text-slate-400 text-[9px]">Production</span>
                </div>
              </div>

              {/* Minimal Viewport */}
              <div className="p-4 bg-[#090d16] flex items-center justify-center text-center">
                <div className="flex items-center gap-2">
                  <img src={getAssetUrl('logos/logo-master.svg')} alt="Vib.Tools" className="w-6 h-6" />
                  <span className="font-bold text-white text-xs">Vib.Tools Portal</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => downloadFile('favicons/favicon.svg', 'favicon.svg')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              favicon.svg
            </button>
            <button
              onClick={() => downloadFile('favicons/favicon.ico', 'favicon.ico')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              favicon.ico
            </button>
          </div>
        </div>

        {/* Mobile / PWA App Launcher Simulator */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              Home Screen / PWA App Icon
            </h3>

            {/* Mock Mobile Grid */}
            <div className="rounded-xl p-4 bg-gradient-to-b from-[#0b132b] to-[#040817] border border-slate-800 shadow-md max-w-[220px] mx-auto">
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="w-12 h-12 rounded-xl p-1 bg-[#000713] border border-cyan-500/50 shadow-md flex items-center justify-center">
                  <img 
                    src={getAssetUrl('favicons/apple-touch-icon.png')} 
                    alt="VibTools App Icon" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-200">Vib.Tools</span>
                <span className="text-[10px] text-cyan-400 font-mono">PWA App</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => downloadFile('favicons/apple-touch-icon.png', 'apple-touch-icon.png')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              apple-touch-icon (180px)
            </button>
          </div>
        </div>

      </div>

      {/* Code Snippets Section */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-md border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedSnippetType('html')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedSnippetType === 'html' ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTML &lt;head&gt;
            </button>
            <button
              onClick={() => setSelectedSnippetType('nextjs')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedSnippetType === 'nextjs' ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Next.js 14+
            </button>
            <button
              onClick={() => setSelectedSnippetType('manifest')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedSnippetType === 'manifest' ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              site.webmanifest
            </button>
          </div>

          <button
            onClick={() => {
              const code = selectedSnippetType === 'html' ? htmlHeadSnippet : selectedSnippetType === 'nextjs' ? nextjsMetadataSnippet : webManifestJson;
              handleCopy(code, selectedSnippetType);
            }}
            className="flex items-center gap-1 text-[11px] font-mono text-cyan-300 hover:underline self-end sm:self-auto"
          >
            {copiedSnippet === selectedSnippetType ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Snippet
          </button>
        </div>

        <pre className="compact-scrollbar bg-[#020617] p-3 rounded-lg border border-slate-800 text-cyan-200 font-mono text-[11px] overflow-x-auto leading-relaxed select-all">
          {selectedSnippetType === 'html' && htmlHeadSnippet}
          {selectedSnippetType === 'nextjs' && nextjsMetadataSnippet}
          {selectedSnippetType === 'manifest' && webManifestJson}
        </pre>
      </div>
    </div>
  );
};

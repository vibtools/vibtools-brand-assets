import React from 'react';
import { 
  Download, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Palette, 
  BookOpen, 
  Globe, 
  Search,
  SlidersHorizontal,
  Loader2
} from 'lucide-react';

export type NavTab = 'assets' | 'bimi' | 'colors' | 'guidelines' | 'favicons';

export type PreviewBg = 'dark' | 'black' | 'white' | 'checkered-dark' | 'checkered-light';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  previewBg: PreviewBg;
  setPreviewBg: (bg: PreviewBg) => void;
  onDownloadKit: () => void;
  isDownloadingZip: boolean;
  zipProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  previewBg,
  setPreviewBg,
  onDownloadKit,
  isDownloadingZip,
  zipProgress
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#030712]/85 border-b border-slate-800/80 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-center text-cyan-200 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="font-semibold text-white">Official Brand Repository</span>
        <span className="text-slate-400">•</span>
        <span className="hidden sm:inline">Vib.Tools Verified Logos, BIMI SVG Tiny 1.2 PS, Favicons & Vector Assets</span>
        <a 
          href="https://github.com/vibtools/vibtools-brand-assets" 
          target="_blank" 
          rel="noreferrer"
          className="underline hover:text-white transition-colors ml-1 font-mono text-[11px]"
        >
          vibtools/vibtools-brand-assets
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('assets')}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <img 
                src="/logos/logo-master.svg" 
                alt="Vib.Tools Logo" 
                className="relative w-9 h-9 rounded-full bg-[#000713] p-0.5 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  Vib.Tools
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Brand Kit
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">Design System & Assets Hub</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs relative items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search assets (e.g. SVG, BIMI, dark)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900/80 border border-slate-700/60 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Preview Background Switcher */}
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-lg p-1 text-xs">
              <span className="text-[11px] text-slate-400 px-1.5 font-medium flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
                Stage:
              </span>
              <button
                onClick={() => setPreviewBg('dark')}
                title="Dark Stage"
                className={`px-2 py-1 rounded text-xs transition-colors ${previewBg === 'dark' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Dark
              </button>
              <button
                onClick={() => setPreviewBg('white')}
                title="Light Stage"
                className={`px-2 py-1 rounded text-xs transition-colors ${previewBg === 'white' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Light
              </button>
              <button
                onClick={() => setPreviewBg('checkered-dark')}
                title="Dark Checkerboard"
                className={`px-2 py-1 rounded text-xs transition-colors ${previewBg === 'checkered-dark' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Grid
              </button>
            </div>

            {/* Download Brand Kit Archive */}
            <button
              onClick={onDownloadKit}
              disabled={isDownloadingZip}
              className="relative group overflow-hidden flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md shadow-cyan-900/30 hover:shadow-cyan-500/25 active:scale-95 disabled:opacity-75 disabled:pointer-events-none"
            >
              {isDownloadingZip ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Packaging ({zipProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download Kit (.zip)</span>
                  <span className="sm:hidden">ZIP</span>
                </>
              )}
            </button>

            {/* GitHub Link */}
            <a 
              href="https://github.com/vibtools/vibtools-brand-assets" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
              title="View on GitHub"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 pt-1 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'assets'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Brand Assets Gallery
          </button>

          <button
            onClick={() => setActiveTab('bimi')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'bimi'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            BIMI Email Standard
            <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">RFC</span>
          </button>

          <button
            onClick={() => setActiveTab('colors')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'colors'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Color System & Gradients
          </button>

          <button
            onClick={() => setActiveTab('favicons')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'favicons'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Favicons & PWA Snippets
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === 'guidelines'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Brand Guidelines & Usage
          </button>
        </nav>
      </div>
    </header>
  );
};

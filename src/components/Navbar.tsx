import React, { useState } from 'react';
import { getAssetUrl } from '../utils/assetHelpers';
import { 
  Download, 
  Layers, 
  ShieldCheck, 
  Palette, 
  BookOpen, 
  Globe, 
  Search, 
  Menu, 
  X, 
  SlidersHorizontal,
  Loader2,
  ExternalLink
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'assets', label: 'Assets', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'bimi', label: 'BIMI', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'colors', label: 'Colors', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'favicons', label: 'Favicons', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'guidelines', label: 'Guidelines', icon: <BookOpen className="w-3.5 h-3.5" /> }
  ];

  const handleTabClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#030712]/90 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-14 gap-2 sm:gap-4">
          
          {/* Brand Identity */}
          <div 
            className="flex items-center gap-2 sm:gap-2.5 shrink-0 cursor-pointer select-none"
            onClick={() => handleTabClick('assets')}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur-xs opacity-75"></div>
              <img 
                src={getAssetUrl('logos/logo-master.svg')} 
                alt="Vib.Tools" 
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#000713] p-0.5 object-contain"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white">
                Vib.Tools
              </span>
              <span className="text-slate-600 text-xs hidden xs:inline">/</span>
              <span className="text-[11px] sm:text-xs font-mono text-cyan-400 font-medium hidden xs:inline">
                brand
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center p-0.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools Area */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Search Bar */}
            <div className="hidden lg:flex relative items-center w-44 xl:w-52">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-6 py-1 text-xs bg-slate-900/90 border border-slate-800 rounded-md text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Desktop Preview Stage Switcher */}
            <div className="hidden sm:flex items-center p-0.5 bg-slate-900/90 border border-slate-800 rounded-md text-[11px] font-mono">
              <button
                onClick={() => setPreviewBg('dark')}
                title="Dark Stage"
                className={`px-2 py-0.5 rounded transition-colors ${previewBg === 'dark' ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Dark
              </button>
              <button
                onClick={() => setPreviewBg('white')}
                title="Light Stage"
                className={`px-2 py-0.5 rounded transition-colors ${previewBg === 'white' ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Light
              </button>
              <button
                onClick={() => setPreviewBg('checkered-dark')}
                title="Grid Stage"
                className={`px-2 py-0.5 rounded transition-colors ${previewBg === 'checkered-dark' ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Grid
              </button>
            </div>

            {/* Download Kit Button */}
            <button
              onClick={onDownloadKit}
              disabled={isDownloadingZip}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all shadow-xs active:scale-95 disabled:opacity-70"
            >
              {isDownloadingZip ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="font-mono text-[11px]">{zipProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">ZIP</span>
                  <span className="hidden md:inline">Kit</span>
                </>
              )}
            </button>

            {/* GitHub Link */}
            <a 
              href="https://github.com/vibtools/vibtools-brand-assets" 
              target="_blank" 
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
              title="GitHub Repo"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
              title="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Box */}
        {mobileSearchOpen && (
          <div className="lg:hidden pb-2.5 pt-0.5 animate-fadeIn">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search assets (e.g. SVG, favicon, bimi)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-8 pr-7 py-1 text-xs bg-slate-900 border border-slate-700 rounded-md text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Horizontal Quick-Tab Strip (always accessible on mobile) */}
      <div className="md:hidden border-t border-slate-800/60 bg-[#02050e]/95 px-2 py-1 overflow-x-auto no-scrollbar flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#030712] p-4 space-y-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2">Navigation</span>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                </button>
              );
            })}
          </div>

          {/* Stage switch on mobile */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 block mb-2">Stage Background</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setPreviewBg('dark')}
                className={`py-1.5 text-xs rounded-md text-center font-mono ${previewBg === 'dark' ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-bold' : 'bg-slate-900 text-slate-400'}`}
              >
                Dark
              </button>
              <button
                onClick={() => setPreviewBg('white')}
                className={`py-1.5 text-xs rounded-md text-center font-mono ${previewBg === 'white' ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-bold' : 'bg-slate-900 text-slate-400'}`}
              >
                Light
              </button>
              <button
                onClick={() => setPreviewBg('checkered-dark')}
                className={`py-1.5 text-xs rounded-md text-center font-mono ${previewBg === 'checkered-dark' ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-bold' : 'bg-slate-900 text-slate-400'}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

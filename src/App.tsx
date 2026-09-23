import React, { useState, useMemo } from 'react';
import { Navbar, NavTab, PreviewBg } from './components/Navbar';
import { AssetCard } from './components/AssetCard';
import { AssetModal } from './components/AssetModal';
import { BimiSection } from './components/BimiSection';
import { ColorSystemSection } from './components/ColorSystemSection';
import { GuidelinesSection } from './components/GuidelinesSection';
import { FaviconGeneratorSection } from './components/FaviconGeneratorSection';
import { BRAND_ASSETS, BrandAsset } from './data/brandAssets';
import { downloadAllBrandAssetsZip } from './utils/assetHelpers';
import { 
  Sparkles, 
  Download, 
  Layers, 
  Filter, 
  ShieldCheck, 
  Palette, 
  Globe, 
  ExternalLink,
  CheckCircle,
  FileCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('assets');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [previewBg, setPreviewBg] = useState<PreviewBg>('dark');
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null);

  // ZIP packaging state
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<number>(0);

  const handleDownloadKit = async () => {
    if (isDownloadingZip) return;
    setIsDownloadingZip(true);
    setZipProgress(0);
    try {
      await downloadAllBrandAssetsZip((percent) => {
        setZipProgress(percent);
      });
    } catch (e) {
      console.error('Failed to create ZIP package:', e);
    } finally {
      setIsDownloadingZip(false);
      setZipProgress(0);
    }
  };

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return BRAND_ASSETS.filter((asset) => {
      // Category filter
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'all' && asset.format !== selectedFormat) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = asset.name.toLowerCase().includes(query);
        const matchesDesc = asset.description.toLowerCase().includes(query);
        const matchesPath = asset.filePath.toLowerCase().includes(query);
        const matchesTags = asset.tags.some(t => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesPath || matchesTags;
      }
      return true;
    });
  }, [selectedCategory, selectedFormat, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Assets', count: BRAND_ASSETS.length },
    { id: 'logos', label: 'Logos & Marks', count: BRAND_ASSETS.filter(a => a.category === 'logos').length },
    { id: 'bimi', label: 'BIMI Email', count: BRAND_ASSETS.filter(a => a.category === 'bimi').length },
    { id: 'favicons', label: 'Favicons & PWA', count: BRAND_ASSETS.filter(a => a.category === 'favicons').length },
    { id: 'profile', label: 'Profile Avatars', count: BRAND_ASSETS.filter(a => a.category === 'profile').length },
    { id: 'social', label: 'Social OG Cards', count: BRAND_ASSETS.filter(a => a.category === 'social').length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Fixed Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        previewBg={previewBg}
        setPreviewBg={setPreviewBg}
        onDownloadKit={handleDownloadKit}
        isDownloadingZip={isDownloadingZip}
        zipProgress={zipProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* TAB 1: ASSETS GALLERY */}
        {activeTab === 'assets' && (
          <div className="space-y-10">
            {/* Master Spotlight Banner */}
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-950/70 via-slate-900 to-cyan-950/50 border border-cyan-500/20 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                <div className="max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    Official Brand Identity Portal
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                    Vib.Tools <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Brand Assets</span>
                  </h1>
                  
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    Download authentic vector marks, production BIMI email indicators, retina favicons, and social preview cards for the Vib.Tools ecosystem.
                  </p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-mono text-slate-300">
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                      19 Verified Assets
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      BIMI RFC 9495
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      SVG Tiny 1.2 PS
                    </span>
                  </div>
                </div>

                {/* Hero Interactive Logo Orb */}
                <div 
                  onClick={() => setSelectedAsset(BRAND_ASSETS[0])}
                  className="relative group cursor-pointer shrink-0"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition duration-500 animate-pulse" />
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#000713] p-4 border-2 border-cyan-500/40 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/logos/logo-master.svg" 
                      alt="Vib.Tools Master Emblem" 
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                    <div className="absolute bottom-2 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to Inspect
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/50 shadow-sm'
                          : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${selectedCategory === cat.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-500'}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Format Filter */}
                <div className="flex items-center gap-1.5 shrink-0 text-xs">
                  <span className="text-slate-400 text-[11px] font-mono mr-1 flex items-center gap-1">
                    <Filter className="w-3 h-3 text-cyan-400" />
                    Format:
                  </span>
                  {(['all', 'SVG', 'PNG', 'ICO', 'MANIFEST'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-colors ${
                        selectedFormat === fmt
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Results Counter */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Showing {filteredAssets.length} of {BRAND_ASSETS.length} assets</span>
                {(selectedCategory !== 'all' || selectedFormat !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedFormat('all');
                      setSearchQuery('');
                    }}
                    className="text-cyan-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>

            {/* Assets Grid */}
            {filteredAssets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    previewBg={previewBg}
                    onInspect={setSelectedAsset}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
                <p className="text-sm font-semibold text-slate-300">No assets match your current filter.</p>
                <p className="text-xs text-slate-500">Try clearing the search query or selecting "All Assets".</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedFormat('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-cyan-300 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BIMI EMAIL */}
        {activeTab === 'bimi' && <BimiSection />}

        {/* TAB 3: COLOR SYSTEM */}
        {activeTab === 'colors' && <ColorSystemSection />}

        {/* TAB 4: FAVICONS & PWA */}
        {activeTab === 'favicons' && <FaviconGeneratorSection />}

        {/* TAB 5: BRAND GUIDELINES */}
        {activeTab === 'guidelines' && <GuidelinesSection onDownloadKit={handleDownloadKit} />}

      </main>

      {/* Asset Inspection & Export Modal */}
      <AssetModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-8 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logos/logo-master.svg" alt="Vib.Tools" className="w-6 h-6 object-contain" />
            <span className="font-bold text-white tracking-tight">Vib.Tools Brand Assets Portal</span>
          </div>

          <p className="text-center sm:text-right font-mono text-[11px] text-slate-500">
            Imported from <a href="https://github.com/vibtools/vibtools-brand-assets" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">vibtools/vibtools-brand-assets</a> • All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

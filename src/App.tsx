import React, { useState, useMemo, useEffect } from 'react';
import { Navbar, NavTab, PreviewBg } from './components/Navbar';
import { AssetCard } from './components/AssetCard';
import { AssetModal } from './components/AssetModal';
import { BimiSection } from './components/BimiSection';
import { ColorSystemSection } from './components/ColorSystemSection';
import { GuidelinesSection } from './components/GuidelinesSection';
import { FaviconGeneratorSection } from './components/FaviconGeneratorSection';
import { BRAND_ASSETS, BrandAsset } from './data/brandAssets';
import { downloadAllBrandAssetsZip, getAssetUrl } from './utils/assetHelpers';
import { 
  Filter, 
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('assets');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [previewBg, setPreviewBg] = useState<PreviewBg>('dark');
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null);

  // Zip packaging state
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<number>(0);

  // Sync URL hash with activeTab on initial mount & hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['assets', 'bimi', 'colors', 'favicons', 'guidelines'].includes(hash)) {
        setActiveTab(hash as NavTab);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title, description, and OpenGraph metadata dynamically
  useEffect(() => {
    const tabMeta: Record<NavTab, { title: string; desc: string }> = {
      assets: {
        title: 'Vib.Tools — Official Brand Assets, Vector Logos & BIMI System',
        desc: 'Download official Vib.Tools vector logos, SVG Tiny 1.2 PS BIMI indicators, retina favicons, color tokens, and brand guidelines for developers and partners.',
      },
      bimi: {
        title: 'BIMI Email Specification (RFC 9495) — Vib.Tools Verified Logo',
        desc: 'Download and validate the official Vib.Tools BIMI SVG Tiny 1.2 PS indicator for authenticated Google Workspace, Apple Mail, and Yahoo Mail delivery.',
      },
      colors: {
        title: 'Official Brand Colors & Gradient Tokens — Vib.Tools Design System',
        desc: 'Explore the official Vib.Tools chromatic color palette, HEX/RGB/HSL values, Tailwind tokens, CSS variables, and master 135-degree ring gradient.',
      },
      favicons: {
        title: 'Retina Favicon & Icon Generator — Vib.Tools Design System',
        desc: 'Generate and download official multi-size ICO, Retina 96px, Apple Touch Icon 180px, and Android PWA manifest icons from the Vib.Tools emblem.',
      },
      guidelines: {
        title: 'Brand Guidelines, Clearspace & Typography — Vib.Tools Design System',
        desc: 'Official logo clearspace, minimum sizes, geometry breakdown, approved usage rules, and typography standards for Vib.Tools.',
      },
    };

    const current = tabMeta[activeTab] || tabMeta.assets;
    document.title = current.title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', current.desc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', current.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', current.desc);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', current.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', current.desc);

    // Keep URL clean without unexpected scroll jumping
    if (activeTab === 'assets') {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      if (window.location.hash !== `#${activeTab}`) {
        window.history.replaceState(null, '', `#${activeTab}`);
      }
    }
  }, [activeTab]);

  const handleDownloadKit = async () => {
    if (isDownloadingZip) return;
    setIsDownloadingZip(true);
    setZipProgress(0);
    try {
      await downloadAllBrandAssetsZip((percent) => {
        setZipProgress(percent);
      });
    } catch (err) {
      console.error('Error generating ZIP:', err);
    } finally {
      setTimeout(() => {
        setIsDownloadingZip(false);
        setZipProgress(0);
      }, 800);
    }
  };

  // Filtered Assets list
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
        const query = searchQuery.toLowerCase().trim();
        const matchName = asset.name.toLowerCase().includes(query);
        const matchDesc = asset.description.toLowerCase().includes(query);
        const matchTags = asset.tags.some((t) => t.toLowerCase().includes(query));
        const matchFormat = asset.format.toLowerCase().includes(query);
        const matchCategory = asset.categoryLabel.toLowerCase().includes(query);
        const matchFile = asset.filePath.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchTags && !matchFormat && !matchCategory && !matchFile) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedFormat]);

  const categories = [
    { id: 'all', label: 'All', count: BRAND_ASSETS.length },
    { id: 'logos', label: 'Logos', count: BRAND_ASSETS.filter(a => a.category === 'logos').length },
    { id: 'bimi', label: 'BIMI', count: BRAND_ASSETS.filter(a => a.category === 'bimi').length },
    { id: 'favicons', label: 'Favicons', count: BRAND_ASSETS.filter(a => a.category === 'favicons').length },
    { id: 'profile', label: 'Profile', count: BRAND_ASSETS.filter(a => a.category === 'profile').length },
    { id: 'social', label: 'Social', count: BRAND_ASSETS.filter(a => a.category === 'social').length },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Compact Sticky Header */}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
        
        {/* TAB 1: ASSETS GALLERY */}
        {activeTab === 'assets' && (
          <div className="space-y-5 sm:space-y-6">
            
            {/* Clean, Compact Hero Banner */}
            <div className="relative rounded-xl bg-gradient-to-r from-[#040c24] via-[#020716] to-[#041028] border border-slate-800/90 p-4 sm:p-6 overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left space-y-1.5 max-w-xl">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-mono text-cyan-400">
                    <span>VIBTOOLS ECOSYSTEM</span>
                    <span className="text-slate-600">·</span>
                    <span>19 VERIFIED ASSETS</span>
                  </div>
                  
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Vib.Tools Brand Assets
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-normal">
                    Vector marks, production BIMI Tiny 1.2 PS, retina favicons, and design system.
                  </p>

                  <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] font-mono text-slate-400">
                    <span>SVG Tiny 1.2 PS</span>
                    <span className="text-slate-600">·</span>
                    <span>BIMI RFC 9495</span>
                    <span className="text-slate-600">·</span>
                    <span>PWA Manifest</span>
                  </div>
                </div>

                {/* Compact Interactive Emblem Badge */}
                <div 
                  onClick={() => setSelectedAsset(BRAND_ASSETS[0])}
                  className="relative group cursor-pointer shrink-0 mt-2 sm:mt-0"
                  title="Click to inspect master vector mark"
                >
                  <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md group-hover:bg-cyan-500/40 transition-all duration-300" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#000713] p-2.5 border border-cyan-500/30 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                    <img 
                      src={getAssetUrl('logos/logo-master.svg')} 
                      alt="Vib.Tools Master Emblem" 
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-xs">
                    Inspect SVG
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 compact-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1 py-0.2 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Format Filter Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Format:</span>
                </div>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="all">All Formats</option>
                  <option value="SVG">SVG (Vector)</option>
                  <option value="PNG">PNG (Raster)</option>
                  <option value="ICO">ICO (Favicon)</option>
                  <option value="MANIFEST">WebManifest</option>
                </select>
              </div>
            </div>

            {/* Assets Grid */}
            {filteredAssets.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-slate-800">
                <Layers className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-slate-300">No assets match your search</h3>
                <p className="text-xs text-slate-400 mt-1">Try resetting the filters or searching for another term.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedFormat('all'); setSearchQuery(''); }}
                  className="mt-3 text-xs text-cyan-400 hover:underline font-mono"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssets.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    previewBg={previewBg}
                    onInspect={setSelectedAsset}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BIMI SPECIFICATION */}
        {activeTab === 'bimi' && (
          <BimiSection />
        )}

        {/* TAB 3: COLOR SYSTEM */}
        {activeTab === 'colors' && (
          <ColorSystemSection />
        )}

        {/* TAB 4: FAVICON GENERATOR */}
        {activeTab === 'favicons' && (
          <FaviconGeneratorSection />
        )}

        {/* TAB 5: BRAND GUIDELINES */}
        {activeTab === 'guidelines' && (
          <GuidelinesSection onDownloadKit={handleDownloadKit} />
        )}

      </main>

      {/* Compact Clean Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/90 py-3.5 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Vib.Tools</span>
            <span className="text-slate-600">·</span>
            <span>Official Brand Repository</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <a 
              href="https://vib.tools/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              vib.tools
            </a>
            <a 
              href="https://github.com/vibtools/vibtools-brand-assets" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              github.com/vibtools
            </a>
            <a 
              href={getAssetUrl('llms.txt')} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:underline"
            >
              llms.txt
            </a>
          </div>
        </div>
      </footer>

      {/* Asset Inspection Modal */}
      <AssetModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}

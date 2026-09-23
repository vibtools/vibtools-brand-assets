import React, { useState, useEffect } from 'react';
import { BrandAsset } from '../data/brandAssets';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Code, 
  FileText, 
  Info, 
  Layers, 
  Sliders,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { downloadFile, copyToClipboard, fetchRawSvg, rasterizeSvgToPng } from '../utils/assetHelpers';

interface AssetModalProps {
  asset: BrandAsset | null;
  onClose: () => void;
}

type ModalTab = 'preview' | 'code' | 'snippets';

export const AssetModal: React.FC<AssetModalProps> = ({ asset, onClose }) => {
  if (!asset) return null;

  const [activeTab, setActiveTab] = useState<ModalTab>('preview');
  const [zoom, setZoom] = useState<number>(100);
  const [modalBg, setModalBg] = useState<'dark' | 'black' | 'white' | 'gray' | 'checkered-dark' | 'checkered-light'>('dark');
  const [svgSource, setSvgSource] = useState<string>('');
  const [loadingSvg, setLoadingSvg] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [selectedSnippetType, setSelectedSnippetType] = useState<'html' | 'react' | 'datauri' | 'css'>('html');

  useEffect(() => {
    if (asset.format === 'SVG') {
      setLoadingSvg(true);
      fetchRawSvg(asset.url).then((code) => {
        setSvgSource(code);
        setLoadingSvg(false);
      });
    }
    // reset zoom
    setZoom(100);
  }, [asset]);

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedSnippet(type);
      setTimeout(() => setCopiedSnippet(null), 2000);
    }
  };

  const handleDownloadOriginal = () => {
    const filename = asset.filePath.split('/').pop() || `${asset.id}.${asset.format.toLowerCase()}`;
    downloadFile(asset.url, filename);
  };

  const handleExportPng = async (size: number) => {
    if (asset.format !== 'SVG') return;
    setIsExportingPng(true);
    try {
      const dataUrl = await rasterizeSvgToPng(asset.url, size);
      const filename = `${asset.id}-${size}x${size}.png`;
      downloadFile(dataUrl, filename);
    } catch (err) {
      console.error('Failed to export PNG:', err);
    } finally {
      setIsExportingPng(false);
    }
  };

  const getStageBgClass = () => {
    switch (modalBg) {
      case 'black':
        return 'bg-black';
      case 'white':
        return 'bg-white';
      case 'gray':
        return 'bg-slate-100';
      case 'checkered-dark':
        return 'bg-checkerboard-dark';
      case 'checkered-light':
        return 'bg-checkerboard-light';
      case 'dark':
      default:
        return 'bg-[#000713]';
    }
  };

  // Snippets
  const getSnippetContent = () => {
    switch (selectedSnippetType) {
      case 'html':
        return `<img \n  src="${asset.url}" \n  alt="${asset.name}" \n  loading="lazy" \n/>`;
      case 'react':
        return `import React from 'react';\n\nexport const VibToolsLogo = () => (\n  <img \n    src="${asset.url}" \n    alt="${asset.name}" \n    className="w-auto h-8" \n  />\n);`;
      case 'datauri':
        if (asset.format === 'SVG' && svgSource) {
          return `data:image/svg+xml;utf8,${encodeURIComponent(svgSource.trim())}`;
        }
        return `/* Data URI available for SVG vector assets */`;
      case 'css':
        return `.vibtools-brand-emblem {\n  background-image: url('${asset.url}');\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl h-[90vh] max-h-[850px] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {asset.format}
            </span>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {asset.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono">{asset.filePath}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center justify-between px-5 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Preview
            </button>

            {asset.format === 'SVG' && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SVG Source Code
              </button>
            )}

            <button
              onClick={() => setActiveTab('snippets')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'snippets'
                  ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Embed Snippets
            </button>
          </div>

          {/* Quick Download Button */}
          <button
            onClick={handleDownloadOriginal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 font-medium text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download {asset.format}
          </button>
        </div>

        {/* Modal Body Area */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          
          {/* Main Stage Panel */}
          <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-800">
            {activeTab === 'preview' && (
              <div className="flex-1 flex flex-col">
                {/* Stage Controls */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono mr-1">Background:</span>
                    <button
                      onClick={() => setModalBg('dark')}
                      className={`w-5 h-5 rounded-full bg-[#000713] border ${modalBg === 'dark' ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-700'}`}
                      title="Obsidian Dark"
                    />
                    <button
                      onClick={() => setModalBg('black')}
                      className={`w-5 h-5 rounded-full bg-black border ${modalBg === 'black' ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-700'}`}
                      title="Pure Black"
                    />
                    <button
                      onClick={() => setModalBg('white')}
                      className={`w-5 h-5 rounded-full bg-white border ${modalBg === 'white' ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-700'}`}
                      title="Pure White"
                    />
                    <button
                      onClick={() => setModalBg('gray')}
                      className={`w-5 h-5 rounded-full bg-slate-200 border ${modalBg === 'gray' ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-700'}`}
                      title="Light Slate"
                    />
                    <button
                      onClick={() => setModalBg('checkered-dark')}
                      className={`w-5 h-5 rounded-full bg-checkerboard-dark border ${modalBg === 'checkered-dark' ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-700'}`}
                      title="Dark Grid"
                    />
                    <button
                      onClick={() => setModalBg('checkered-light')}
                      className={`w-5 h-5 rounded-full bg-checkerboard-light border ${modalBg === 'checkered-light' ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-700'}`}
                      title="Light Grid"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setZoom(Math.max(50, zoom - 25))}
                      className="p-1 rounded hover:bg-slate-800 text-slate-300"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[11px] w-12 text-center text-slate-200">{zoom}%</span>
                    <button 
                      onClick={() => setZoom(Math.min(300, zoom + 25))}
                      className="p-1 rounded hover:bg-slate-800 text-slate-300"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setZoom(100)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 ml-1"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Viewport Canvas */}
                <div className={`flex-1 min-h-[300px] flex items-center justify-center p-8 overflow-auto transition-colors ${getStageBgClass()}`}>
                  <div 
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                    className="transition-transform duration-150 flex items-center justify-center"
                  >
                    <img 
                      src={asset.url} 
                      alt={asset.name} 
                      className="max-h-[380px] max-w-[420px] object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="flex-1 flex flex-col bg-[#020617] p-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                  <span>SVG XML Markup ({svgSource.length.toLocaleString()} characters)</span>
                  <button
                    onClick={() => handleCopy(svgSource, 'raw-svg')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
                  >
                    {copiedSnippet === 'raw-svg' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SVG</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex-1 overflow-auto bg-[#0a0f1d] p-3 rounded-lg border border-slate-800 text-slate-300 select-all leading-relaxed whitespace-pre font-mono">
                  {loadingSvg ? (
                    <div className="flex items-center justify-center h-full text-slate-500">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading SVG markup...
                    </div>
                  ) : (
                    svgSource
                  )}
                </div>
              </div>
            )}

            {activeTab === 'snippets' && (
              <div className="flex-1 flex flex-col bg-[#020617] p-5">
                <div className="flex items-center gap-2 mb-4">
                  {(['html', 'react', 'datauri', 'css'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedSnippetType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                        selectedSnippetType === type
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 flex flex-col">
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={() => handleCopy(getSnippetContent(), 'snippet')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-cyan-300 text-xs font-mono border border-slate-700 transition-colors shadow-lg"
                    >
                      {copiedSnippet === 'snippet' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="flex-1 bg-[#0a0f1d] p-4 rounded-xl border border-slate-800 text-cyan-100 font-mono text-xs overflow-auto leading-relaxed">
                    <code>{getSnippetContent()}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Right Information & Export Panel */}
          <div className="w-full md:w-80 bg-slate-950/70 p-5 flex flex-col justify-between gap-6 overflow-y-auto">
            <div className="space-y-5">
              <div>
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 mb-2">
                  Asset Details
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Format</span>
                    <span className="font-mono font-semibold text-white">{asset.format}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Dimensions</span>
                    <span className="font-mono text-white">{asset.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Aspect Ratio</span>
                    <span className="font-mono text-white">{asset.aspectRatio}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Category</span>
                    <span className="text-cyan-300">{asset.categoryLabel}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Surface</span>
                    <span className="capitalize text-slate-300">{asset.recommendedBackground}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 mb-2">
                  Recommended Usage
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {asset.usage}
                </p>
              </div>

              {/* Multi-Resolution Raster Exporter for SVG */}
              {asset.format === 'SVG' && (
                <div>
                  <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 mb-2">
                    Rasterize to PNG
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleExportPng(512)}
                      disabled={isExportingPng}
                      className="px-2 py-2 text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-200 flex flex-col items-center gap-1 transition-colors"
                    >
                      <span className="text-[10px] text-slate-400">1x</span>
                      <span>512px</span>
                    </button>
                    <button
                      onClick={() => handleExportPng(1024)}
                      disabled={isExportingPng}
                      className="px-2 py-2 text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-200 flex flex-col items-center gap-1 transition-colors"
                    >
                      <span className="text-[10px] text-slate-400">2x</span>
                      <span>1024px</span>
                    </button>
                    <button
                      onClick={() => handleExportPng(2048)}
                      disabled={isExportingPng}
                      className="px-2 py-2 text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-200 flex flex-col items-center gap-1 transition-colors"
                    >
                      <span className="text-[10px] text-slate-400">4x</span>
                      <span>2048px</span>
                    </button>
                  </div>
                  {isExportingPng && (
                    <p className="text-[11px] text-cyan-400 font-mono mt-1 text-center animate-pulse">
                      Rasterizing vector...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={handleDownloadOriginal}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md shadow-cyan-950/40"
              >
                <Download className="w-4 h-4" />
                Download Original ({asset.format})
              </button>

              <button
                onClick={() => handleCopy(asset.filePath, 'path')}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                {copiedSnippet === 'path' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Path Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Relative Path</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

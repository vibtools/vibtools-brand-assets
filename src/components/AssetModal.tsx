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
  const [modalBg, setModalBg] = useState<'dark' | 'black' | 'white' | 'checkered-dark' | 'checkered-light'>('dark');
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
      case 'checkered-dark':
        return 'bg-checkerboard-dark';
      case 'checkered-light':
        return 'bg-checkerboard-light';
      case 'dark':
      default:
        return 'bg-[#000713]';
    }
  };

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
        return `.vibtools-emblem {\n  background-image: url('${asset.url}');\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl h-[92vh] max-h-[750px] bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Modal Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {asset.format}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white truncate">
              {asset.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              ({asset.dimensions})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Preview
            </button>

            {asset.format === 'SVG' && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-slate-800 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                SVG Source
              </button>
            )}

            <button
              onClick={() => setActiveTab('snippets')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activeTab === 'snippets'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Snippets
            </button>
          </div>

          <button
            onClick={handleDownloadOriginal}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 font-medium text-[11px] transition-colors"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          
          {/* Main Stage */}
          <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-800 min-h-[280px]">
            {activeTab === 'preview' && (
              <div className="flex-1 flex flex-col">
                {/* Stage Controls */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/60 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono mr-1 hidden sm:inline">Stage:</span>
                    <button
                      onClick={() => setModalBg('dark')}
                      className={`w-4 h-4 rounded-full bg-[#000713] border ${modalBg === 'dark' ? 'border-cyan-400 ring-1 ring-cyan-500' : 'border-slate-700'}`}
                      title="Obsidian Dark"
                    />
                    <button
                      onClick={() => setModalBg('black')}
                      className={`w-4 h-4 rounded-full bg-black border ${modalBg === 'black' ? 'border-cyan-400 ring-1 ring-cyan-500' : 'border-slate-700'}`}
                      title="Pure Black"
                    />
                    <button
                      onClick={() => setModalBg('white')}
                      className={`w-4 h-4 rounded-full bg-white border ${modalBg === 'white' ? 'border-cyan-400 ring-1 ring-cyan-500' : 'border-slate-700'}`}
                      title="Pure White"
                    />
                    <button
                      onClick={() => setModalBg('checkered-dark')}
                      className={`w-4 h-4 rounded-full bg-checkerboard-dark border ${modalBg === 'checkered-dark' ? 'border-cyan-400 ring-1 ring-cyan-500' : 'border-slate-700'}`}
                      title="Grid Stage"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setZoom(Math.max(50, zoom - 25))}
                      className="p-0.5 rounded hover:bg-slate-800 text-slate-300"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-[10px] w-10 text-center text-slate-200">{zoom}%</span>
                    <button 
                      onClick={() => setZoom(Math.min(300, zoom + 25))}
                      className="p-0.5 rounded hover:bg-slate-800 text-slate-300"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => setZoom(100)}
                      className="p-0.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 ml-0.5"
                      title="Reset"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                {/* Viewport Canvas */}
                <div className={`flex-1 flex items-center justify-center p-6 overflow-auto transition-colors ${getStageBgClass()}`}>
                  <div 
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                    className="transition-transform duration-100 flex items-center justify-center"
                  >
                    <img 
                      src={asset.url} 
                      alt={asset.name} 
                      className="max-h-[260px] sm:max-h-[320px] max-w-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="flex-1 flex flex-col bg-[#020617] p-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>SVG Markup ({svgSource.length.toLocaleString()} chars)</span>
                  <button
                    onClick={() => handleCopy(svgSource, 'raw-svg')}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
                  >
                    {copiedSnippet === 'raw-svg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copy SVG
                  </button>
                </div>
                <div className="compact-scrollbar flex-1 overflow-auto bg-[#0a0f1d] p-2.5 rounded border border-slate-800 text-slate-300 select-all leading-relaxed whitespace-pre font-mono text-[11px]">
                  {loadingSvg ? (
                    <div className="flex items-center justify-center h-full text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Loading...
                    </div>
                  ) : (
                    svgSource
                  )}
                </div>
              </div>
            )}

            {activeTab === 'snippets' && (
              <div className="flex-1 flex flex-col bg-[#020617] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    {(['html', 'react', 'datauri', 'css'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSnippetType(type)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase transition-colors ${
                          selectedSnippetType === type
                            ? 'bg-slate-800 text-cyan-300 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopy(getSnippetContent(), 'snippet')}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-mono transition-colors"
                  >
                    {copiedSnippet === 'snippet' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copy
                  </button>
                </div>

                <pre className="compact-scrollbar flex-1 bg-[#0a0f1d] p-3 rounded border border-slate-800 text-cyan-100 font-mono text-[11px] overflow-auto leading-relaxed select-all">
                  <code>{getSnippetContent()}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-72 bg-slate-950/80 p-3.5 flex flex-col justify-between gap-4 overflow-y-auto">
            <div className="space-y-3.5">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-1.5">
                  Asset Details
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Dimensions</span>
                    <span className="font-mono text-white text-[11px]">{asset.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Ratio</span>
                    <span className="font-mono text-white text-[11px]">{asset.aspectRatio}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Category</span>
                    <span className="text-cyan-300 text-[11px]">{asset.categoryLabel}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Path</span>
                    <span className="font-mono text-slate-400 text-[10px] truncate max-w-[130px]" title={asset.filePath}>
                      {asset.filePath}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rasterizer */}
              {asset.format === 'SVG' && (
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block mb-1.5">
                    Export PNG
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[512, 1024, 2048].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleExportPng(size)}
                        disabled={isExportingPng}
                        className="py-1 px-1.5 text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-200 flex flex-col items-center transition-colors"
                      >
                        <span className="text-[9px] text-slate-400">{size === 512 ? '1x' : size === 1024 ? '2x' : '4x'}</span>
                        <span className="text-[11px]">{size}px</span>
                      </button>
                    ))}
                  </div>
                  {isExportingPng && (
                    <p className="text-[10px] text-cyan-400 font-mono mt-1 text-center">
                      Rasterizing...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <button
                onClick={handleDownloadOriginal}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Download ({asset.format})
              </button>

              <button
                onClick={() => handleCopy(asset.filePath, 'path')}
                className="w-full flex items-center justify-center gap-1 py-1 px-2 rounded-md text-[11px] font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                {copiedSnippet === 'path' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                Copy Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

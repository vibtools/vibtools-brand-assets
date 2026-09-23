import React, { useState } from 'react';
import { BrandAsset } from '../data/brandAssets';
import { PreviewBg } from './Navbar';
import { Download, Eye, Copy, Check, FileCode } from 'lucide-react';
import { downloadFile, copyToClipboard, fetchRawSvg } from '../utils/assetHelpers';

interface AssetCardProps {
  asset: BrandAsset;
  previewBg: PreviewBg;
  onInspect: (asset: BrandAsset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, previewBg, onInspect }) => {
  const [copied, setCopied] = useState(false);

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'SVG':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'PNG':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'ICO':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'MANIFEST':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStageClass = () => {
    switch (previewBg) {
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

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (asset.format === 'SVG') {
      const rawSvg = await fetchRawSvg(asset.url);
      await copyToClipboard(rawSvg);
    } else {
      await copyToClipboard(asset.filePath);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const filename = asset.filePath.split('/').pop() || `${asset.id}.${asset.format.toLowerCase()}`;
    downloadFile(asset.url, filename);
  };

  return (
    <div 
      className="group relative flex flex-col bg-slate-900/50 rounded-lg border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-200 overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/60 border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-1.5 truncate">
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getFormatBadge(asset.format)}`}>
            {asset.format}
          </span>
          <span className="font-medium text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
            {asset.name}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
          {asset.dimensions}
        </span>
      </div>

      {/* Preview Area */}
      <div 
        onClick={() => onInspect(asset)}
        className={`relative aspect-[4/3] w-full flex items-center justify-center p-4 cursor-pointer overflow-hidden transition-colors ${getStageClass()}`}
        title="Click to inspect asset"
      >
        {asset.format === 'MANIFEST' ? (
          <div className="flex flex-col items-center justify-center text-center p-2 font-mono text-xs text-purple-300">
            <FileCode className="w-8 h-8 text-purple-400 mb-1 opacity-80" />
            <span className="font-semibold text-slate-300 text-[11px]">site.webmanifest</span>
          </div>
        ) : (
          <img 
            src={asset.url} 
            alt={asset.name} 
            className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        )}
      </div>

      {/* Action Footer (compact & directly accessible on mobile and desktop) */}
      <div className="px-2.5 py-1.5 bg-slate-950/80 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]" title={asset.filePath}>
          {asset.filePath}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onInspect(asset)}
            className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded transition-colors"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyCode}
            className="p-1 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 rounded transition-colors"
            title={asset.format === 'SVG' ? 'Copy SVG Code' : 'Copy File Path'}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleDownload}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Download File"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

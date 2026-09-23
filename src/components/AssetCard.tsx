import React, { useState } from 'react';
import { BrandAsset } from '../data/brandAssets';
import { PreviewBg } from './Navbar';
import { Download, Code, Eye, Copy, Check, ExternalLink, FileCode } from 'lucide-react';
import { downloadFile, copyToClipboard, fetchRawSvg } from '../utils/assetHelpers';

interface AssetCardProps {
  asset: BrandAsset;
  previewBg: PreviewBg;
  onInspect: (asset: BrandAsset) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, previewBg, onInspect }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'SVG':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'PNG':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'ICO':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'MANIFEST':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
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
      className="group relative flex flex-col bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Meta Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950/40 border-b border-slate-800/60">
        <div className="flex items-center gap-2 truncate">
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getFormatBadge(asset.format)}`}>
            {asset.format}
          </span>
          <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
            {asset.name}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 shrink-0">
          {asset.dimensions}
        </span>
      </div>

      {/* Main Asset Preview Area */}
      <div 
        onClick={() => onInspect(asset)}
        className={`relative aspect-square sm:aspect-[4/3] w-full flex items-center justify-center p-6 cursor-pointer overflow-hidden transition-colors ${getStageClass()}`}
      >
        {asset.format === 'MANIFEST' ? (
          <div className="flex flex-col items-center justify-center text-center p-4 font-mono text-xs text-purple-300">
            <FileCode className="w-12 h-12 text-purple-400 mb-2 opacity-80" />
            <span className="font-bold text-slate-200">site.webmanifest</span>
            <span className="text-[11px] text-slate-400 mt-1">PWA JSON configuration</span>
          </div>
        ) : (
          <img 
            src={asset.url} 
            alt={asset.name} 
            className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}

        {/* Hover Quick Action Overlay */}
        <div className={`absolute inset-0 bg-[#030712]/75 backdrop-blur-[2px] flex items-center justify-center gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={() => onInspect(asset)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors shadow-md"
            title="Inspect & Export"
          >
            <Eye className="w-3.5 h-3.5" />
            Inspect
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors shadow-md"
            title="Download Asset"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyCode}
            className="p-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors shadow-md"
            title={asset.format === 'SVG' ? 'Copy SVG Code' : 'Copy File Path'}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3 bg-slate-950/60 border-t border-slate-800/60 flex flex-col justify-between flex-1 gap-2">
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
          {asset.description}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/40 text-[10px] text-slate-400 font-mono">
          <span className="truncate max-w-[170px]" title={asset.filePath}>
            {asset.filePath}
          </span>
          <span className="text-cyan-400 hover:underline cursor-pointer flex items-center gap-0.5" onClick={() => onInspect(asset)}>
            Details →
          </span>
        </div>
      </div>
    </div>
  );
};

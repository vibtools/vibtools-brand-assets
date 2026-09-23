import React from 'react';
import { getAssetUrl } from '../utils/assetHelpers';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Maximize2, 
  Sparkles, 
  Type, 
  Download
} from 'lucide-react';

interface GuidelinesSectionProps {
  onDownloadKit: () => void;
}

export const GuidelinesSection: React.FC<GuidelinesSectionProps> = ({ onDownloadKit }) => {
  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="rounded-xl bg-gradient-to-r from-[#040c24] via-[#020716] to-[#041028] border border-slate-800/90 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>BRAND INTEGRITY GUIDELINES</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Usage & Design Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Preserve visual consistency, clearspace, and correct color values across all platforms.
            </p>
          </div>

          <button
            onClick={onDownloadKit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download Brand Kit (.zip)
          </button>
        </div>
      </div>

      {/* Anatomy & Clearspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Geometry Rules */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Emblem Geometry & Structure
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <span><strong className="text-white">Chromatic Ring:</strong> 5-stop orbital gradient signifying uptime and synchronization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <span><strong className="text-white">Obsidian Core (#000713):</strong> Deep dark disc creating optical depth for vector shapes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <span><strong className="text-white">Dynamic V-Folds:</strong> Streamlined chevron geometry reflecting developer flow and efficiency.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-300">
            <span>Primary Master Ratio</span>
            <span className="font-bold">1:1 Square (1254 × 1254)</span>
          </div>
        </div>

        {/* Clearspace Diagram */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              Clearspace & Minimum Sizing
            </h3>
            <p className="text-xs text-slate-300 mb-2">
              Preserve breathing room (<span className="text-cyan-300 font-mono">0.5 × R</span>) around the perimeter:
            </p>

            {/* Clearspace Visual Mock */}
            <div className="relative p-4 rounded-lg bg-[#000713] border border-dashed border-cyan-500/40 flex items-center justify-center">
              <div className="absolute top-1.5 left-2 text-[9px] font-mono text-cyan-400">Clearspace = 0.5 × R</div>
              <img 
                src={getAssetUrl('logos/logo-master.svg')} 
                alt="Clearspace Preview" 
                className="w-14 h-14 object-contain filter drop-shadow" 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono pt-2 border-t border-slate-800/80">
            <div className="bg-slate-950/70 p-1.5 rounded border border-slate-800/60">
              <span className="block text-slate-400">Favicon</span>
              <span className="font-bold text-white">16 × 16 px</span>
            </div>
            <div className="bg-slate-950/70 p-1.5 rounded border border-slate-800/60">
              <span className="block text-slate-400">App Icon</span>
              <span className="font-bold text-white">32 × 32 px</span>
            </div>
            <div className="bg-slate-950/70 p-1.5 rounded border border-slate-800/60">
              <span className="block text-slate-400">Lockup</span>
              <span className="font-bold text-white">≥ 120 px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Do's */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/25 space-y-2.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>APPROVED USAGE</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Use the official SVG Tiny 1.2 PS master for vector rendering.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Display on dark obsidian background (#000713) for best luminance.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Preserve the exact 135° chromatic linear gradient angle.</span>
            </li>
          </ul>
        </div>

        {/* Don'ts */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-rose-500/25 space-y-2.5">
          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
            <XCircle className="w-4 h-4" />
            <span>PROHIBITED MODIFICATIONS</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>Do not stretch, distort, or tilt the 1:1 aspect ratio.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>Do not replace gradient stops with arbitrary hues.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>Do not remove the inner obsidian core disc from the emblem.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Typography Tokens */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-cyan-400" />
          Official Brand Typography
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-cyan-300 font-mono">
              <span>Display & Primary UI</span>
              <span>Plus Jakarta Sans</span>
            </div>
            <p className="text-base font-extrabold text-white">Vib.Tools Platform</p>
            <p className="text-[11px] text-slate-400">Geometric sans-serif with modern clarity.</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-cyan-300 font-mono">
              <span>Code & Metadata</span>
              <span>JetBrains Mono</span>
            </div>
            <p className="text-base font-mono font-bold text-cyan-200">v=BIMI1; l=logo.svg</p>
            <p className="text-[11px] text-slate-400">High-legibility monospace for parameters & hashes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

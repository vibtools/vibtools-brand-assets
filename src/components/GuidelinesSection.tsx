import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Maximize2, 
  Sparkles, 
  Type, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';

interface GuidelinesSectionProps {
  onDownloadKit: () => void;
}

export const GuidelinesSection: React.FC<GuidelinesSectionProps> = ({ onDownloadKit }) => {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-cyan-950/40 border border-cyan-500/20 p-6 sm:p-10 overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Brand Integrity Standard
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Brand Guidelines & Usage
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The Vib.Tools mark represents precision, developer velocity, and cryptographic reliability. Follow these guidelines to maintain visual coherence and brand recognition across all touchpoints.
          </p>
        </div>
      </div>

      {/* Anatomy & Meaning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Logo Anatomy & Geometry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              The emblem is constructed from mathematical geometry centered on an orbital chromatic gradient ring:
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong className="text-white">Orbital Chromatic Ring:</strong> Represents continuous uptime, synchronization, and the unified ecosystem of Vib.Tools services.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong className="text-white">Obsidian Core Disc:</strong> A deep cosmic void (#000713) creating intense depth and radiant contrast for foreground vector shapes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong className="text-white">Dynamic V-Folds:</strong> Streamlined chevron geometry reflecting developer flow, efficiency, and speed.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong className="text-white">Cyan Energy Flare Whips:</strong> Neon terminal segments indicating responsiveness, live sockets, and cryptographic verification.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-300">
            <span>Primary Master Ratio</span>
            <span className="font-bold">1:1 Square (1254 × 1254)</span>
          </div>
        </div>

        {/* Clearspace Diagram */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <Maximize2 className="w-5 h-5 text-cyan-400" />
              Clearspace & Minimum Sizes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              To maintain impact, always preserve minimum breathing room (<span className="text-cyan-300 font-mono">X</span>) equal to 50% of the emblem inner radius around the logo:
            </p>

            {/* Clearspace Visual Mock */}
            <div className="relative p-8 rounded-xl bg-[#000713] border border-dashed border-cyan-500/40 flex items-center justify-center my-4">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400">Clearspace = 0.5 × R</div>
              <img 
                src="/logos/logo-master.svg" 
                alt="Clearspace Preview" 
                className="w-24 h-24 object-contain filter drop-shadow" 
              />
              <div className="absolute inset-2 border border-dashed border-blue-500/30 rounded-lg pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-4 border-t border-slate-800">
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
              <span className="block text-[10px] text-slate-400">Favicon</span>
              <span className="font-bold text-white">16 × 16 px</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
              <span className="block text-[10px] text-slate-400">App Icon</span>
              <span className="font-bold text-white">32 × 32 px</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
              <span className="block text-[10px] text-slate-400">Lockup</span>
              <span className="font-bold text-white">120 px width</span>
            </div>
          </div>
        </div>
      </div>

      {/* Do's and Don'ts Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>Brand Do's & Don'ts</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do's Column */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base pb-3 border-b border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Recommended Practices (Do)</span>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Use original vector files (SVG)</strong> whenever possible for crisp scaling across all screen pixel densities.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Match background variants:</strong> Use <code className="text-cyan-300">vibtools-horizontal-dark.png</code> on dark backgrounds and <code className="text-cyan-300">vibtools-horizontal-light.png</code> on light surfaces.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Respect clearspace rules</strong> to ensure the brand emblem is never crowded by dense UI elements or copy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Use the BIMI-compliant SVG</strong> (<code className="text-cyan-300">bimi/logo.svg</code>) strictly for email authentication with SVG Tiny 1.2 PS parsers.</span>
              </li>
            </ul>
          </div>

          {/* Don'ts Column */}
          <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold text-base pb-3 border-b border-red-500/20">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>Unpermitted Alterations (Don't)</span>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Do not distort or stretch:</strong> Always lock aspect ratio (1:1) when scaling down or up.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Do not alter gradient colors:</strong> Do not recolor the cyan flares or swap the blue gradient tones with unapproved colors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Do not rotate the emblem:</strong> The vertical axis and chevron direction must always point vertically true.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Do not apply heavy drop shadows</strong>, bevels, inner glows, or decorative borders not present in the master source.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Typography Pairing */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
            <Type className="w-5 h-5 text-cyan-400" />
            Official Typography Hierarchy
          </h2>
          <p className="text-xs text-slate-400">
            Paired fonts calibrated for digital tooling, high legibility, and technical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-300 font-mono font-bold">Primary UI & Headings</span>
              <span className="text-slate-400">Google Fonts / Web</span>
            </div>
            <div className="font-sans text-2xl font-extrabold text-white tracking-tight">
              Plus Jakarta Sans
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Weights: 400 (Regular), 500 (Medium), 600 (Semi-bold), 800 (Extra-bold)
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-300 font-mono font-bold">Code, API & Technical Data</span>
              <span className="text-slate-400">Google Fonts / Web</span>
            </div>
            <div className="font-mono text-xl font-bold text-white tracking-tight">
              JetBrains Mono
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Weights: 400 (Regular), 500 (Medium), 600 (Semi-bold)
            </p>
          </div>
        </div>
      </div>

      {/* Press Kit Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg font-bold text-white">Looking for the Complete Brand Package?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Download all master SVGs, high-res PNGs, BIMI certificates, favicons, and manifest files in one archive.
          </p>
        </div>

        <button
          onClick={onDownloadKit}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950/50 transition-all shrink-0 active:scale-95"
        >
          <Download className="w-4 h-4" />
          Download Brand Kit (.zip)
        </button>
      </div>
    </div>
  );
};

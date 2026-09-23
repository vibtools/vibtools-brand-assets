import React, { useState } from 'react';
import { BRAND_COLORS } from '../data/brandAssets';
import { Palette, Copy, Check, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../utils/assetHelpers';

export const ColorSystemSection: React.FC = () => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = async (value: string, label: string) => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopiedValue(label);
      setTimeout(() => setCopiedValue(null), 2000);
    }
  };

  const masterGradientCss = 'linear-gradient(135deg, #0647ED 0%, #005CFC 34%, #0078FF 62%, #00BDF4 82%, #08E0DE 100%)';

  return (
    <div className="space-y-6">
      {/* Compact Section Header */}
      <div className="rounded-xl bg-gradient-to-r from-[#040c24] via-[#020716] to-[#041028] border border-slate-800/90 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
              <Palette className="w-3.5 h-3.5" />
              <span>COLOR PALETTE SPECIFICATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Color System & Tokens
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Calibrated for digital clarity, high-contrast readability, and vibrant dark-mode aesthetics.
            </p>
          </div>

          <button
            onClick={() => handleCopy(masterGradientCss, 'master-gradient')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono font-medium transition-colors shrink-0"
          >
            {copiedValue === 'master-gradient' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Master CSS</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Master Gradient</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Primary Chromatic Gradient Ribbon */}
      <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Vib Master Ring Gradient (5 Stops)
          </h3>
          <span className="text-[10px] font-mono text-slate-400">135° Linear Progression</span>
        </div>

        {/* Gradient Ribbon */}
        <div className="relative h-12 sm:h-14 rounded-lg overflow-hidden border border-slate-700/80 shadow-inner flex items-end p-2.5 bg-[linear-gradient(135deg,#0647ED_0%,#005CFC_34%,#0078FF_62%,#00BDF4_82%,#08E0DE_100%)]">
          <div className="relative z-10 w-full flex items-center justify-between text-white text-[10px] sm:text-xs font-mono drop-shadow">
            <span>#0647ED (0%)</span>
            <span className="hidden sm:inline">#005CFC (34%)</span>
            <span className="hidden sm:inline">#0078FF (62%)</span>
            <span className="hidden sm:inline">#00BDF4 (82%)</span>
            <span>#08E0DE (100%)</span>
          </div>
        </div>

        {/* Stops Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {[
            { hex: '#0647ED', role: 'Cobalt Base', pct: '0%' },
            { hex: '#005CFC', role: 'Electric Core', pct: '34%' },
            { hex: '#0078FF', role: 'Mid Blue', pct: '62%' },
            { hex: '#00BDF4', role: 'Sky Aqua', pct: '82%' },
            { hex: '#08E0DE', role: 'Neon Flare', pct: '100%' },
          ].map((stop) => (
            <div 
              key={stop.hex}
              onClick={() => handleCopy(stop.hex, stop.hex)}
              className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-slate-700/80 shadow-xs" style={{ backgroundColor: stop.hex }} />
                <div>
                  <span className="text-[11px] font-bold text-white group-hover:text-cyan-300 font-mono block">
                    {stop.hex}
                  </span>
                  <span className="text-[9px] text-slate-400 block">{stop.role}</span>
                </div>
              </div>
              {copiedValue === stop.hex ? (
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400 group-hover:text-slate-300 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
            Palette Tokens ({BRAND_COLORS.length})
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Click value to copy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {BRAND_COLORS.map((color) => (
            <div 
              key={color.name}
              className="bg-slate-900/50 border border-slate-800/80 rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual Swatch */}
                <div 
                  className="h-16 w-full p-2 flex items-start justify-between border-b border-slate-800/60"
                  style={{ background: color.gradientCss || color.hex }}
                >
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-black/50 text-white border border-white/10">
                    {color.type}
                  </span>
                </div>

                {/* Swatch Info */}
                <div className="p-3 space-y-2">
                  <div>
                    <h4 className="text-xs font-bold text-white">{color.name}</h4>
                    <p className="text-[10px] text-cyan-300 font-mono">{color.role}</p>
                  </div>

                  {/* Values */}
                  <div className="space-y-1 font-mono text-[11px] pt-1 border-t border-slate-800/60">
                    <div 
                      onClick={() => handleCopy(color.hex, `${color.name}-hex`)}
                      className="flex items-center justify-between px-2 py-1 rounded bg-slate-950/60 hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <span className="text-slate-400 text-[10px]">HEX</span>
                      <span className="font-semibold text-slate-200 flex items-center gap-1">
                        {color.hex}
                        {copiedValue === `${color.name}-hex` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                      </span>
                    </div>

                    <div 
                      onClick={() => handleCopy(color.rgb, `${color.name}-rgb`)}
                      className="flex items-center justify-between px-2 py-1 rounded bg-slate-950/60 hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <span className="text-slate-400 text-[10px]">RGB</span>
                      <span className="text-slate-300 truncate max-w-[130px] flex items-center gap-1">
                        {color.rgb}
                        {copiedValue === `${color.name}-rgb` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Copy Footer */}
              <div className="p-2.5 pt-0">
                <button
                  onClick={() => handleCopy(color.gradientCss || color.hex, `${color.name}-all`)}
                  className="w-full py-1 rounded text-[11px] font-mono text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800/80 transition-colors flex items-center justify-center gap-1"
                >
                  {copiedValue === `${color.name}-all` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied CSS!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy CSS Value</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact CSS Variables Token Box */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            CSS Variables
          </h3>
          <button
            onClick={() => handleCopy(`:root {
  --vib-electric-blue: #005CFC;
  --vib-neon-cyan: #08E0DE;
  --vib-deep-cobalt: #0647ED;
  --vib-sky-aqua: #00BDF4;
  --vib-obsidian-disc: #000713;
  --vib-gradient-ring: linear-gradient(135deg, #0647ED 0%, #005CFC 34%, #0078FF 62%, #00BDF4 82%, #08E0DE 100%);
}`, 'css-vars')}
            className="flex items-center gap-1 text-[11px] font-mono text-cyan-300 hover:underline"
          >
            {copiedValue === 'css-vars' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            Copy Variables
          </button>
        </div>

        <pre className="compact-scrollbar bg-[#020617] p-3 rounded-lg border border-slate-800 text-cyan-200 font-mono text-[11px] overflow-x-auto leading-relaxed select-all">
          {`:root {
  --vib-electric-blue: #005CFC;
  --vib-neon-cyan: #08E0DE;
  --vib-deep-cobalt: #0647ED;
  --vib-sky-aqua: #00BDF4;
  --vib-obsidian-disc: #000713;
  --vib-gradient-ring: linear-gradient(135deg, #0647ED 0%, #005CFC 34%, #0078FF 62%, #00BDF4 82%, #08E0DE 100%);
}`}
        </pre>
      </div>
    </div>
  );
};

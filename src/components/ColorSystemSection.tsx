import React, { useState } from 'react';
import { BRAND_COLORS, ColorSwatch } from '../data/brandAssets';
import { Palette, Copy, Check, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
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

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-cyan-950/40 border border-cyan-500/20 p-6 sm:p-10 overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-4">
            <Palette className="w-3.5 h-3.5" />
            Official Chromatic Specification
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Color System & Gradients
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The Vib.Tools palette balances cosmic deep obsidian voids with radiant electric blues and luminous cyans. Every shade has been calibrated for digital vibrancy, high contrast, and accessibility.
          </p>
        </div>
      </div>

      {/* Primary Chromatic Gradient Showcase Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Primary Master Ring Gradient
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              5-stop linear progression flowing from royal cobalt blue through electric blue to neon cyan
            </p>
          </div>

          <button
            onClick={() => handleCopy('linear-gradient(135deg, #0647ED 0%, #005CFC 34%, #0078FF 62%, #00BDF4 82%, #08E0DE 100%)', 'master-gradient')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono font-medium transition-colors shrink-0"
          >
            {copiedValue === 'master-gradient' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied CSS Gradient</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy CSS Gradient</span>
              </>
            )}
          </button>
        </div>

        {/* Large Gradient Ribbon */}
        <div className="relative h-20 sm:h-28 rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl flex items-end p-4 bg-[linear-gradient(135deg,#0647ED_0%,#005CFC_34%,#0078FF_62%,#00BDF4_82%,#08E0DE_100%)]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="relative z-10 w-full flex items-center justify-between text-white text-xs font-mono drop-shadow">
            <span className="font-bold">#0647ED (0%)</span>
            <span className="font-bold hidden sm:inline">#005CFC (34%)</span>
            <span className="font-bold hidden sm:inline">#0078FF (62%)</span>
            <span className="font-bold hidden sm:inline">#00BDF4 (82%)</span>
            <span className="font-bold">#08E0DE (100%)</span>
          </div>
        </div>

        {/* Color Stops Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
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
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-5 h-5 rounded-md border border-slate-700/80 shadow" style={{ backgroundColor: stop.hex }} />
                <span className="text-[10px] font-mono text-slate-500">{stop.pct}</span>
              </div>
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 font-mono flex items-center justify-between">
                {stop.hex}
                {copiedValue === stop.hex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">{stop.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Swatches Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span>Palette Swatches & Specs</span>
          <span className="text-xs font-normal text-slate-400 font-mono">({BRAND_COLORS.length} defined colors)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_COLORS.map((color) => (
            <div 
              key={color.name}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Swatch */}
                <div 
                  className="h-32 w-full p-3 flex flex-col justify-between relative"
                  style={{
                    background: color.gradientCss || color.hex,
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded backdrop-blur-md bg-black/40 text-white border border-white/10">
                      {color.type}
                    </span>
                  </div>
                </div>

                {/* Swatch Information */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{color.name}</h3>
                    <p className="text-[11px] text-cyan-300 font-medium">{color.role}</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{color.description}</p>
                  </div>

                  {/* Values */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 font-mono text-xs">
                    <div 
                      onClick={() => handleCopy(color.hex, `${color.name}-hex`)}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 cursor-pointer group transition-colors"
                    >
                      <span className="text-[11px] text-slate-400">HEX</span>
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center gap-1">
                        {color.hex}
                        {copiedValue === `${color.name}-hex` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400" />}
                      </span>
                    </div>

                    <div 
                      onClick={() => handleCopy(color.rgb, `${color.name}-rgb`)}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 cursor-pointer group transition-colors"
                    >
                      <span className="text-[11px] text-slate-400">RGB</span>
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center gap-1">
                        {color.rgb}
                        {copiedValue === `${color.name}-rgb` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400" />}
                      </span>
                    </div>

                    <div 
                      onClick={() => handleCopy(color.hsl, `${color.name}-hsl`)}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 cursor-pointer group transition-colors"
                    >
                      <span className="text-[11px] text-slate-400">HSL</span>
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-300 flex items-center gap-1">
                        {color.hsl}
                        {copiedValue === `${color.name}-hsl` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400" />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Copy Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleCopy(color.gradientCss || color.hex, `${color.name}-all`)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
                >
                  {copiedValue === `${color.name}-all` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Value!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CSS Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Integration Code Blocks */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          CSS / Tailwind Variables Integration
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Drop these color tokens into your Tailwind configuration or root CSS stylesheet for automatic brand alignment:
        </p>

        <pre className="bg-[#020617] p-4 rounded-xl border border-slate-800 text-cyan-200 font-mono text-xs overflow-auto leading-relaxed select-all">
          {`:root {
  /* Vib.Tools Primary Brand Tokens */
  --vib-electric-blue: #005CFC;
  --vib-neon-cyan: #08E0DE;
  --vib-deep-cobalt: #0647ED;
  --vib-sky-aqua: #00BDF4;
  --vib-obsidian-disc: #000713;
  --vib-space-navy: #000820;

  /* Primary Identity Gradient */
  --vib-gradient-ring: linear-gradient(135deg, #0647ED 0%, #005CFC 34%, #0078FF 62%, #00BDF4 82%, #08E0DE 100%);
  --vib-gradient-wing-cyan: linear-gradient(135deg, #13E3DE 0%, #00D1EB 48%, #00B9F7 100%);
  --vib-gradient-wing-blue: linear-gradient(135deg, #006CFF 0%, #005BFE 48%, #004DF7 100%);
}`}
        </pre>
      </div>
    </div>
  );
};

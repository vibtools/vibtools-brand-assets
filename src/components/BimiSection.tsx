import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  ExternalLink, 
  Lock,
  BadgeCheck
} from 'lucide-react';
import { copyToClipboard, downloadFile, getAssetUrl } from '../utils/assetHelpers';

export const BimiSection: React.FC = () => {
  const [copiedRecord, setCopiedRecord] = useState(false);
  const [selectedMailClient, setSelectedMailClient] = useState<'gmail' | 'apple' | 'yahoo'>('gmail');

  const bimiDnsRecord = `v=BIMI1; l=https://vib.tools/bimi/logo.svg; a=https://vib.tools/bimi/certificate.pem`;

  const handleCopyDns = async () => {
    const ok = await copyToClipboard(bimiDnsRecord);
    if (ok) {
      setCopiedRecord(true);
      setTimeout(() => setCopiedRecord(false), 2000);
    }
  };

  const bimiChecks = [
    { title: 'SVG Tiny 1.2 PS Profile', desc: 'baseProfile="tiny-ps" declared on root <svg> element.' },
    { title: 'RFC 9495 Compliant', desc: 'version="1.2" defined adhering to BIMI standard.' },
    { title: '1:1 Square Aspect Ratio', desc: 'viewBox="0 0 1254 1254" centered coordinate space.' },
    { title: 'Zero External Scripts / Fonts', desc: 'Self-contained coordinates and linear gradient definitions.' },
    { title: 'Optimized Lightweight Payload', desc: 'Under 5KB compressed for instantaneous inbox caching.' },
  ];

  return (
    <div className="space-y-6">
      {/* Compact Section Header */}
      <div className="rounded-xl bg-gradient-to-r from-[#040c24] via-[#020716] to-[#041028] border border-slate-800/90 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RFC 9495 & BIMI EMAIL STANDARD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              BIMI Email Assets
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Brand Indicators for Message Identification displays the verified emblem in Gmail, Apple Mail, and Yahoo Mail.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => downloadFile('bimi/logo.svg', 'vibtools-bimi-logo.svg')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              BIMI Production SVG
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Spec Checklist & DNS Config */}
        <div className="lg:col-span-5 space-y-4">
          {/* Spec Audit */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Spec Audit (SVG Tiny 1.2 PS)
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">
                100% Valid
              </span>
            </div>

            <div className="space-y-2">
              {bimiChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-md bg-slate-950/60 border border-slate-800/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-slate-200 block">{check.title}</span>
                    <span className="text-[11px] text-slate-400 block leading-tight">{check.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DNS TXT Setup Guide */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                DNS TXT Record
              </span>
              <span className="text-[10px] font-mono text-slate-400">default._bimi.vib.tools</span>
            </div>

            <div className="relative bg-[#020617] border border-slate-800 rounded-lg p-3 font-mono text-xs text-cyan-200 break-all select-all pr-9">
              {bimiDnsRecord}
              <button
                onClick={handleCopyDns}
                className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Copy DNS Record"
              >
                {copiedRecord ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Requirement: DMARC policy must be <code className="text-cyan-400">p=quarantine</code> or <code className="text-cyan-400">p=reject</code>.
            </p>
          </div>
        </div>

        {/* Right: Live Interactive Inbox Simulator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                Live Inbox Avatar Preview
              </h3>

              {/* Client Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-md border border-slate-800 text-xs">
                {(['gmail', 'apple', 'yahoo'] as const).map((client) => (
                  <button
                    key={client}
                    onClick={() => setSelectedMailClient(client)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      selectedMailClient === client
                        ? 'bg-slate-800 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {client === 'gmail' ? 'Gmail' : client === 'apple' ? 'Apple' : 'Yahoo'}
                  </button>
                ))}
              </div>
            </div>

            {/* Email UI Mockup */}
            <div className="bg-[#0b1329] border border-slate-700/80 rounded-lg overflow-hidden shadow-lg">
              {/* Inbox Header Bar */}
              <div className="bg-[#080e1e] px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                  <span className="ml-1.5 font-mono text-[11px] text-slate-300">
                    {selectedMailClient === 'gmail' ? 'Google Workspace / Gmail' : selectedMailClient === 'apple' ? 'Apple Mail' : 'Yahoo Mail'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>DMARC Passed</span>
                </div>
              </div>

              {/* Email Row in Inbox */}
              <div className="p-3.5 flex items-start gap-3 bg-[#0d1630]/90 border-b border-slate-800/60">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400/80 bg-[#000713]">
                    <img 
                      src={getAssetUrl('bimi/logo.svg')} 
                      alt="Vib.Tools Verified BIMI Logo" 
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 text-white" title="Verified BIMI Mark">
                    <BadgeCheck className="w-3.5 h-3.5 fill-cyan-400 text-blue-900" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-xs font-bold text-white truncate">Vib.Tools Security</span>
                      <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">&lt;notifications@vib.tools&gt;</span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 font-mono">10:42 AM</span>
                  </div>

                  <p className="text-xs font-medium text-cyan-200 mt-0.5 truncate">
                    Your API token for Vib.Tools workspace was verified
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    Automated confirmation: SPF alignment, DKIM cryptographic signature, and DMARC enforcement passed.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Inspection of BIMI SVG */}
            <div className="mt-3.5 p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <img 
                  src={getAssetUrl('bimi/logo.svg')} 
                  alt="BIMI SVG" 
                  className="w-8 h-8 rounded-full bg-[#000713] p-0.5 border border-cyan-500/40 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-white text-xs">logo.svg</h4>
                  <p className="text-[10px] text-slate-400 font-mono">1254 × 1254 · SVG Tiny 1.2 PS</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={getAssetUrl('bimi/logo.svg')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-cyan-300 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Raw
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

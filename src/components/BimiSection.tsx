import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  ExternalLink, 
  FileCode, 
  Lock,
  BadgeCheck,
  Smartphone,
  Laptop
} from 'lucide-react';
import { copyToClipboard, downloadFile } from '../utils/assetHelpers';

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
    { title: 'SVG Tiny 1.2 PS Profile', status: 'pass', desc: 'baseProfile="tiny-ps" attribute strictly declared on root <svg> element.' },
    { title: 'SVG Version 1.2', status: 'pass', desc: 'version="1.2" defined compliant with RFC 9495 specification.' },
    { title: 'Strict Square 1:1 Aspect Ratio', status: 'pass', desc: 'viewBox="0 0 1254 1254" ensures exact 1:1 circular/square boundary.' },
    { title: 'No External Scripts or Fonts', status: 'pass', desc: 'Self-contained vector coordinates with pure gradient defs.' },
    { title: 'Payload Optimization', status: 'pass', desc: 'Clean paths optimized under 32KB payload for instant inbox caching.' },
    { title: 'VMC / DMARC Ready', status: 'pass', desc: 'Pre-formatted for Verified Mark Certificate cryptographic binding.' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-cyan-950/40 border border-cyan-500/20 p-6 sm:p-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            RFC 9495 & BIMI Email Security Standard
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Official BIMI Brand Assets
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Brand Indicators for Message Identification (BIMI) empowers Vib.Tools to display its official verified logo alongside authenticated DMARC email messages in Gmail, Apple Mail, Yahoo Mail, and Fastmail.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => downloadFile('/bimi/logo.svg', 'vibtools-bimi-logo.svg')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-cyan-950/50 transition-all"
            >
              <Download className="w-4 h-4" />
              Download BIMI Production SVG
            </button>

            <button
              onClick={() => downloadFile('/bimi/logo-master-source.svg', 'vibtools-bimi-source.svg')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
            >
              <FileCode className="w-4 h-4" />
              Download Master Source SVG
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Compliance Checklist & Live Email Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Spec Checklist */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                BIMI Spec Audit (SVG Tiny 1.2 PS)
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                100% Compliant
              </span>
            </div>

            <div className="space-y-3.5">
              {bimiChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200">{check.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{check.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DNS TXT Setup Guide */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              DNS TXT Record Configuration
            </h3>
            <p className="text-xs text-slate-300 mb-3">
              Publish this TXT record at your subdomain <code className="text-cyan-300 font-mono">default._bimi.vib.tools</code>:
            </p>

            <div className="relative bg-[#020617] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-200 break-all select-all">
              {bimiDnsRecord}
              <button
                onClick={handleCopyDns}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Copy DNS Record"
              >
                {copiedRecord ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Note: DMARC policy must be set to <code className="text-cyan-400">p=quarantine</code> or <code className="text-cyan-400">p=reject</code> with 100% pct.
            </p>
          </div>
        </div>

        {/* Right: Live Interactive Inbox Simulator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Live Inbox Avatar Simulator
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Preview how Vib.Tools emails appear to recipients</p>
              </div>

              {/* Client Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setSelectedMailClient('gmail')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedMailClient === 'gmail' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  Gmail
                </button>
                <button
                  onClick={() => setSelectedMailClient('apple')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedMailClient === 'apple' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  Apple Mail
                </button>
                <button
                  onClick={() => setSelectedMailClient('yahoo')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${selectedMailClient === 'yahoo' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  Yahoo Mail
                </button>
              </div>
            </div>

            {/* Email UI Mockup */}
            <div className="bg-[#0b1329] border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl">
              {/* Inbox Header Bar */}
              <div className="bg-[#080e1e] px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  <span className="ml-2 font-mono text-[11px] text-slate-300">
                    {selectedMailClient === 'gmail' ? 'Google Workspace / Gmail' : selectedMailClient === 'apple' ? 'Apple Mail (macOS & iOS)' : 'Yahoo Mail'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  DMARC & VMC Verified
                </div>
              </div>

              {/* Message Header Item */}
              <div className="p-4 sm:p-5 bg-[#0f172a]/90 flex items-start gap-4 border-b border-slate-800">
                {/* Official BIMI Logo Avatar */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 bg-[#000713]">
                    <img 
                      src="/bimi/logo.svg" 
                      alt="Vib.Tools Verified BIMI Logo" 
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 text-white" title="Verified BIMI Mark">
                    <BadgeCheck className="w-4 h-4 fill-cyan-400 text-blue-900" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm font-bold text-white truncate">Vib.Tools Security</span>
                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">&lt;notifications@vib.tools&gt;</span>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0 font-mono">10:42 AM</span>
                  </div>

                  <p className="text-xs font-semibold text-cyan-200 mt-1">
                    Your API token for MailVib & Vib.Tools platform was regenerated
                  </p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    Hello Victor, this automated notification confirms the successful cryptographic authorization of your Vib.Tools workspace account...
                  </p>
                </div>
              </div>

              {/* Email Content Body Preview */}
              <div className="p-6 bg-[#090d1a] space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 text-blue-200">
                  <p className="font-semibold text-white mb-1">Authenticated Domain Notification</p>
                  <p className="text-[11px] text-slate-300">
                    This email passed SPF alignment, DKIM cryptographic signature, and DMARC enforcement. The sender avatar displayed above is fetched directly from the certified BIMI vector at <code className="text-cyan-300">vib.tools/bimi/logo.svg</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Inspection of BIMI SVG */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/bimi/logo.svg" 
                  alt="BIMI SVG Preview" 
                  className="w-10 h-10 rounded-full bg-[#000713] p-1 border border-cyan-500/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">logo.svg</h4>
                  <p className="text-[11px] text-slate-400 font-mono">1254 × 1254 • SVG Tiny 1.2 PS • 3.2 KB</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/bimi/logo.svg"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Raw SVG
                </a>
                <button
                  onClick={() => downloadFile('/bimi/logo.svg', 'vibtools-bimi-logo.svg')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Radio, Shield, Cpu, RefreshCw, Smartphone, Laptop, CheckCircle2 } from 'lucide-react';

export const CloudArchitectureSection: React.FC = () => {
  return (
    <section id="cloud-tech" className="relative py-20 md:py-28 bg-[#050811] border-t border-blue-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Cloud Native Telephony
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A Complete Android Smartphone on Your Computer
          </h2>
          <p className="mt-3 text-sm text-slate-300 font-light">
            No physical hardware to lose, break, or recharge. Powered by virtual eSIM and cloud stream orchestration.
          </p>
        </div>

        {/* 3 Tech Architecture Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Virtual eSIM Engine */}
          <div className="p-6 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-blue-500/20 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-300 border border-blue-500/30 flex items-center justify-center mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Global Virtual eSIM</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-light">
                Built-in software-defined radio connection. Switch between global carriers, send international SMS, and place
                voice calls without touching a physical SIM card tray.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5G Standalone Cloud Gateway</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5GB Free International Roaming</span>
              </div>
            </div>
          </div>

          {/* Card 2: Zero Local Footprint */}
          <div className="p-6 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-blue-500/20 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Browser-Native Execution</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-light">
                Runs instantly in Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari. No emulator installations,
                heavy APKs, or local CPU heating.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>60 FPS Hardware WebGL Rendering</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sub-15ms Roundtrip Cloud Latency</span>
              </div>
            </div>
          </div>

          {/* Card 3: Encrypted Enclave */}
          <div className="p-6 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-blue-500/20 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">End-to-End Encrypted Cloud</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-light">
                All photos, SMS messages, contacts, and browser cookies reside in an isolated biometric cloud enclave with
                zero third-party data tracking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero Physical Theft Vulnerability</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>128GB High-Speed Cloud NVMe Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudArchitectureSection;

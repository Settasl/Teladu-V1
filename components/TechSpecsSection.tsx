import React from 'react';
import { Check, Minus } from 'lucide-react';

interface ModelSpec {
  name: string;
  tagline: string;
  price: string;
  display: string;
  chassis: string;
  chip: string;
  npu: string;
  camera: string;
  zoom: string;
  battery: string;
  magflow: string;
  satellite: boolean;
  waterproof: string;
}

const MODELS: ModelSpec[] = [
  {
    name: 'ePhone',
    tagline: 'The pure spatial flagship',
    price: '$799',
    display: '6.1" OLED · 120Hz · 3,000 nits',
    chassis: 'Aerospace Aluminum & Ceramic',
    chip: 'Teladu N1 (12-core CPU / 20-core GPU)',
    npu: '40 TOPS Neural Processor',
    camera: '108MP Dual Optical System',
    zoom: '3x Lossless Optical Zoom',
    battery: 'Up to 28 hours video playback',
    magflow: '30W Wireless Induction',
    satellite: true,
    waterproof: 'IP68 (up to 4m, 30 min)',
  },
  {
    name: 'ePhone Pro',
    tagline: 'The titanium powerhouse',
    price: '$999',
    display: '6.3" ProMotion OLED · 120Hz · 4,800 nits',
    chassis: 'Grade 5 Titanium & Sapphire Shield',
    chip: 'Teladu N1 Pro (16-core CPU / 32-core GPU)',
    npu: '60 TOPS Real-Time Neural Engine',
    camera: '200MP Triple Periscope Matrix',
    zoom: '10x Continuous Optical Periscope',
    battery: 'Up to 34 hours video playback',
    magflow: '50W High-Speed MagFlow',
    satellite: true,
    waterproof: 'IP68 (up to 6m, 30 min)',
  },
  {
    name: 'ePhone Ultra',
    tagline: 'Extreme spatial performance',
    price: '$1,199',
    display: '6.8" UltraRetina XDR · 144Hz · 5,000 nits',
    chassis: 'Reinforced Grade 5 Titanium & Ceramic',
    chip: 'Teladu N1 Max (20-core CPU / 40-core GPU)',
    npu: '85 TOPS Dual-Die Neural Engine',
    camera: '200MP Quad Optoelectronic Array + LiDAR 2',
    zoom: '15x Continuous Optical Periscope',
    battery: 'Up to 42 hours video playback',
    magflow: '65W High-Speed MagFlow',
    satellite: true,
    waterproof: 'IP68 (up to 10m, 45 min)',
  },
];

interface TechSpecsSectionProps {
  onSelectModel: (modelName: string) => void;
}

export const TechSpecsSection: React.FC<TechSpecsSectionProps> = ({ onSelectModel }) => {
  return (
    <section id="specs" className="relative py-24 md:py-32 bg-[#05080e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Detailed Comparison
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            05. Find the Perfect ePhone
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light">
            Compare all models across display brilliance, optical reach, neural compute, and battery autonomy.
          </p>
        </div>

        {/* Model Cards Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MODELS.map((model) => {
            const isPro = model.name === 'ePhone Pro';
            return (
              <div
                key={model.name}
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  isPro
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-xl shadow-cyan-950/40 relative'
                    : 'bg-slate-950/50 border-white/10'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold tracking-wide uppercase">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{model.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{model.tagline}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-xs text-slate-400">From</span>
                    <span className="font-mono text-3xl font-extrabold text-white tabular-nums">{model.price}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <button
                    onClick={() => onSelectModel(model.name)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                      isPro
                        ? 'bg-white text-slate-950 hover:bg-cyan-200'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    Select {model.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Specs Table */}
        <div className="rounded-3xl border border-white/10 overflow-hidden bg-slate-950/60 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/80">
                  <th className="py-4 px-6 font-semibold text-slate-400 uppercase tracking-wider w-1/4">Specification</th>
                  <th className="py-4 px-6 font-semibold text-white w-1/4">ePhone</th>
                  <th className="py-4 px-6 font-semibold text-cyan-300 w-1/4">ePhone Pro</th>
                  <th className="py-4 px-6 font-semibold text-white w-1/4">ePhone Ultra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono tabular-nums text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Display</td>
                  <td className="py-4 px-6">{MODELS[0].display}</td>
                  <td className="py-4 px-6 text-white font-medium">{MODELS[1].display}</td>
                  <td className="py-4 px-6">{MODELS[2].display}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Chassis & Glass</td>
                  <td className="py-4 px-6">{MODELS[0].chassis}</td>
                  <td className="py-4 px-6 text-white font-medium">{MODELS[1].chassis}</td>
                  <td className="py-4 px-6">{MODELS[2].chassis}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Chipset</td>
                  <td className="py-4 px-6">{MODELS[0].chip}</td>
                  <td className="py-4 px-6 text-white font-medium">{MODELS[1].chip}</td>
                  <td className="py-4 px-6">{MODELS[2].chip}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Neural Engine</td>
                  <td className="py-4 px-6">{MODELS[0].npu}</td>
                  <td className="py-4 px-6 text-cyan-400 font-semibold">{MODELS[1].npu}</td>
                  <td className="py-4 px-6 text-white font-semibold">{MODELS[2].npu}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Camera Optics</td>
                  <td className="py-4 px-6">{MODELS[0].camera}</td>
                  <td className="py-4 px-6 text-white font-medium">{MODELS[1].camera}</td>
                  <td className="py-4 px-6">{MODELS[2].camera}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Optical Zoom</td>
                  <td className="py-4 px-6">{MODELS[0].zoom}</td>
                  <td className="py-4 px-6 text-cyan-300 font-medium">{MODELS[1].zoom}</td>
                  <td className="py-4 px-6">{MODELS[2].zoom}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Battery Autonomy</td>
                  <td className="py-4 px-6">{MODELS[0].battery}</td>
                  <td className="py-4 px-6 text-white font-medium">{MODELS[1].battery}</td>
                  <td className="py-4 px-6">{MODELS[2].battery}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Inductive MagFlow</td>
                  <td className="py-4 px-6">{MODELS[0].magflow}</td>
                  <td className="py-4 px-6 text-white font-medium">{MODELS[1].magflow}</td>
                  <td className="py-4 px-6">{MODELS[2].magflow}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Emergency Satellite SOS</td>
                  <td className="py-4 px-6"><Check className="w-4 h-4 text-cyan-400" /></td>
                  <td className="py-4 px-6"><Check className="w-4 h-4 text-cyan-400" /></td>
                  <td className="py-4 px-6"><Check className="w-4 h-4 text-cyan-400" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-sans text-slate-400 font-medium">Water Ingress Rating</td>
                  <td className="py-4 px-6">{MODELS[0].waterproof}</td>
                  <td className="py-4 px-6 text-white font-medium">{MODELS[1].waterproof}</td>
                  <td className="py-4 px-6">{MODELS[2].waterproof}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecsSection;

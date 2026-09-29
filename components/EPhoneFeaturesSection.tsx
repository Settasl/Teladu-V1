import React from 'react';
import {
  Phone, MessageSquare, Globe, Camera, Image, ShoppingBag,
  Users, Calendar, Mail, Folder, Radio, Settings,
  Power, ShieldCheck, CheckCircle2, Laptop, Sliders
} from 'lucide-react';

interface FeatureCategory {
  title: string;
  badge: string;
  description: string;
  items: { icon: React.ElementType; name: string; detail: string }[];
}

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: 'Native Android 15 Application Suite',
    badge: 'Core Applications',
    description: 'Every essential communication and productivity tool runs natively in the cloud virtual environment.',
    items: [
      { icon: Phone, name: 'Voice & Video Calls', detail: 'Audio dialer with audible DTMF key tones and call management.' },
      { icon: MessageSquare, name: 'Messages & RCS', detail: 'Instant messaging with automated reply assistance and chat sync.' },
      { icon: Globe, name: 'Cloud Web Browser', detail: 'Encrypted proxy browsing with zero local device cache or tracking.' },
      { icon: Camera, name: 'Live Camera Capture', detail: 'Real camera hardware connection with high-resolution snapshot mode.' },
      { icon: Image, name: 'Cloud Media Gallery', detail: 'Full-resolution photo library synchronized to your cloud partition.' },
      { icon: ShoppingBag, name: 'Teladu App Store', detail: 'Curated cloud repository of productivity, social, and utility apps.' },
    ],
  },
  {
    title: 'Virtual eSIM & Hardware Simulation',
    badge: 'Telephony & Hardware',
    description: 'Hardware controls, virtual radio connectivity, and device lifecycle simulated with precision.',
    items: [
      { icon: Radio, name: 'Global Virtual eSIM', detail: 'Multi-profile carrier switching on Teladu 5G with international roaming.' },
      { icon: Power, name: 'Physical Power Sequence', detail: 'Interactive hardware power button with realistic boot chime animation.' },
      { icon: Sliders, name: 'Neon Side Buttons', detail: 'Physical volume keys with animated on-screen HUD volume toast.' },
      { icon: Laptop, name: 'Universal Browser Run', detail: 'Compatible with Chrome, Edge, Safari, and Firefox on Mac, PC, Linux.' },
      { icon: Folder, name: 'Cloud NVMe Drive', detail: '128GB allocated cloud storage for documents, backups, and media.' },
      { icon: ShieldCheck, name: 'Biometric Cloud Vault', detail: 'Hardware-isolated account encryption protecting all user records.' },
    ],
  },
];

export const EPhoneFeaturesSection: React.FC<{ onOpenPreOrder: () => void }> = ({ onOpenPreOrder }) => {
  return (
    <section id="features" className="relative py-24 bg-[#030611] border-t border-blue-500/20 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-blue-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading (No Teladu logo here, clean normal typography) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Complete Virtual Phone Architecture
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Desktop. Powered by Android.
          </h2>
          <p className="mt-3 text-sm text-slate-300 font-light leading-relaxed">
            From the initial power-on sequence to dialer calls, camera captures, and virtual eSIM connectivity,
            experience the full feature set of a flagship smartphone on your computer.
          </p>
        </div>

        {/* Feature Grids */}
        <div className="space-y-12">
          {FEATURE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-blue-950/70 border border-blue-500/30 px-3 py-1 rounded-full">
                    {cat.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">{cat.title}</h3>
                </div>
                <p className="text-xs text-slate-400 max-w-md">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="p-5 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-blue-500/25 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,71,255,0.25)] flex items-start gap-4 group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-600/20 text-cyan-300 border border-blue-500/30 group-hover:scale-110 transition-transform shrink-0 shadow-[0_0_10px_rgba(0,71,255,0.3)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner with White Button & Neon Blue Halo */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-950/90 backdrop-blur-2xl border border-blue-500/40 shadow-[0_0_40px_rgba(0,71,255,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Ready to activate your Cloud ePhone?</h3>
            <p className="text-xs text-slate-300 mt-1">
              Early bird reservation includes lifetime account access, 128GB cloud storage, and global virtual eSIM.
            </p>
          </div>

          <button
            onClick={onOpenPreOrder}
            className="px-8 py-3.5 rounded-full bg-white text-[#0038ff] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,56,255,0.7)] hover:shadow-[0_0_35px_rgba(0,56,255,0.95)] hover:bg-slate-50 transition-all whitespace-nowrap cursor-pointer"
          >
            Reserve Teladu V1 · $29
          </button>
        </div>
      </div>
    </section>
  );
};

export default EPhoneFeaturesSection;

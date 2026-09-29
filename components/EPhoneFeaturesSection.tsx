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
  isBorderless?: boolean;
  items: { icon: React.ElementType; name: string; detail: string }[];
}

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    title: 'Native Android 15 Application Suite',
    badge: 'Core Applications',
    description: 'Every essential communication and productivity tool runs natively in the cloud virtual environment.',
    isBorderless: true, // REMOVED BOXES & BORDERS AS REQUESTED: Just the texts and the icons!
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
    isBorderless: true, // Clean borderless text & icons
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
    <section id="features" className="relative py-16 sm:py-24 bg-[#030611] border-t border-blue-500/20 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-blue-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Complete Virtual Phone Architecture
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Desktop. Powered by Android.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            From the initial power-on sequence to dialer calls, camera captures, and virtual eSIM connectivity,
            experience the full feature set of a flagship smartphone on your computer.
          </p>
        </div>

        {/* Feature Grids: PURE TEXTS & ICONS - Zero Boxes, Zero Borders */}
        <div className="space-y-12 sm:space-y-16">
          {FEATURE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300">
                    {cat.badge}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{cat.title}</h3>
                </div>
                <p className="text-xs text-slate-400 max-w-md">{cat.description}</p>
              </div>

              {/* Just the icons and texts without boxes/borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-1">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-start gap-3.5 group"
                    >
                      <div className="text-cyan-400 pt-0.5 shrink-0 group-hover:scale-110 group-hover:text-cyan-300 transition-all drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                          {item.name}
                        </h4>
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

        {/* Bottom Banner with Clear Glassy, Smaller Button */}
        <div className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-slate-950/70 backdrop-blur-2xl border border-blue-500/30 shadow-[0_0_35px_rgba(0,71,255,0.2)] flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Ready to activate your Cloud ePhone?</h3>
            <p className="text-xs text-slate-300 mt-1">
              Early bird reservation includes lifetime account access, 128GB cloud storage, and global virtual eSIM.
            </p>
          </div>

          <button
            onClick={onOpenPreOrder}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-xs shadow-[0_0_15px_rgba(0,71,255,0.35)] transition-all whitespace-nowrap cursor-pointer"
          >
            Reserve Teladu V1 · $29
          </button>
        </div>
      </div>
    </section>
  );
};

export default EPhoneFeaturesSection;

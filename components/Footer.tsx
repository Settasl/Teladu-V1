import React from 'react';
import { TeladuLogo } from './TeladuLogo';
import { ArrowRight, Mail, Facebook, Instagram } from 'lucide-react';

const TikTokIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.066-.098a2.892 2.892 0 0 1 2.383-4.526c.294 0 .578.044.845.127V9.387a6.335 6.335 0 0 0-.845-.057c-3.525 0-6.388 2.862-6.388 6.388 0 3.525 2.863 6.388 6.388 6.388 3.483 0 6.315-2.791 6.384-6.257V8.847c1.32.96 2.935 1.528 4.678 1.547v-3.7a4.8 4.8 0 0 1-.963-.008z" />
  </svg>
);

interface FooterProps {
  onOpenPreOrder: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPreOrder, onOpenLegal }) => {
  return (
    <footer className="relative bg-[#020409] border-t border-blue-500/25 py-10 sm:py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Clear Glassy, Smaller Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-5 sm:p-6 rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-blue-500/35 shadow-[0_0_30px_rgba(0,71,255,0.2)] mb-8 sm:mb-10 text-center sm:text-left">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <TeladuLogo size={28} />
            <span className="w-px h-4 sm:h-5 bg-white/20" />
            <span className="text-xs sm:text-sm font-bold text-white font-sans tracking-tight">
              <span className="text-blue-500 font-extrabold">V1</span> - Cloud ePhone
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <a href="https://web.facebook.com/share/p/19ckLix5MU/" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all shadow-[0_0_10px_rgba(0,71,255,0.2)] hover:shadow-[0_0_15px_rgba(0,180,255,0.5)]" title="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.tiktok.com/@teladu6" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all shadow-[0_0_10px_rgba(0,71,255,0.2)] hover:shadow-[0_0_15px_rgba(0,180,255,0.5)]" title="TikTok">
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com/teladu" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all shadow-[0_0_10px_rgba(0,71,255,0.2)] hover:shadow-[0_0_15px_rgba(0,180,255,0.5)]" title="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Clear Glassy, Smaller Button */}
            <button
              onClick={onOpenPreOrder}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,71,255,0.35)] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Get Your Teladu V1</span>
              <ArrowRight className="w-3 h-3 text-cyan-300" />
            </button>
          </div>
        </div>

        {/* Sub Links, Active Legal Buttons, & Contact Email */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-[10px] sm:text-[11px] text-slate-400 font-mono text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            <span className="text-slate-300">© {new Date().getFullYear()} Teladu Inc.</span>
            <span>·</span>
            <span>The First Cloud ePhone</span>
            <span>·</span>
            <a
              href="mailto:teladuv1@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>teladuv1@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-slate-400 hover:text-white underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="text-slate-400 hover:text-white underline transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

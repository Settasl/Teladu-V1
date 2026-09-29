import React from 'react';
import { TeladuLogo } from './TeladuLogo';
import { ArrowRight, Mail } from 'lucide-react';

interface FooterProps {
  onOpenPreOrder: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPreOrder, onOpenLegal }) => {
  return (
    <footer className="relative bg-[#020409] border-t border-blue-500/25 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact Banner Style from T-V1.png */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-blue-500/35 shadow-[0_0_35px_rgba(0,71,255,0.2)] mb-10">
          <div className="flex items-center gap-3">
            <TeladuLogo size={32} />
            <span className="w-px h-5 bg-white/20" />
            <span className="text-sm font-bold text-white font-sans tracking-tight">
              <span className="text-blue-500 font-extrabold">V1</span> - Cloud ePhone
            </span>
          </div>

          {/* White Button with Blue Text & Neon Blue Halo */}
          <button
            onClick={onOpenPreOrder}
            className="px-6 py-3 rounded-full bg-white text-[#0038ff] font-bold text-xs uppercase tracking-wider shadow-[0_0_18px_rgba(0,56,255,0.7)] hover:shadow-[0_0_28px_rgba(0,56,255,0.95)] hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Get Your Teladu V1</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0038ff]" />
          </button>
        </div>

        {/* Sub Links, Active Legal Buttons, & Contact Email */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 text-[11px] text-slate-400 font-mono">
          <div className="flex flex-wrap items-center gap-4">
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

          <div className="flex items-center gap-5">
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

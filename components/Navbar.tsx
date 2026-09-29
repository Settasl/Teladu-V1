import React, { useState, useEffect } from 'react';
import { TeladuLogo } from './TeladuLogo';
import { ArrowUpRight, Menu, X, Facebook, Instagram } from 'lucide-react';

// Custom TikTok SVG Icon
const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.066-.098a2.892 2.892 0 0 1 2.383-4.526c.294 0 .578.044.845.127V9.387a6.335 6.335 0 0 0-.845-.057c-3.525 0-6.388 2.862-6.388 6.388 0 3.525 2.863 6.388 6.388 6.388 3.483 0 6.315-2.791 6.384-6.257V8.847c1.32.96 2.935 1.528 4.678 1.547v-3.7a4.8 4.8 0 0 1-.963-.008z" />
  </svg>
);

interface NavbarProps {
  onOpenPreOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPreOrder }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://web.facebook.com/share/p/19ckLix5MU/',
      icon: Facebook,
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@teladu6',
      icon: TikTokIcon,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/teladu',
      icon: Instagram,
    },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050811]/90 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-black/40 py-2.5 sm:py-3'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Header Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-1.5 sm:gap-2.5 group focus-visible:outline-none"
        >
          <TeladuLogo size={24} className="sm:scale-105 origin-left" />
          <span className="hidden sm:inline-block w-px h-3.5 bg-white/20" />
          <span className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-widest hidden sm:inline-block">
            V1 · Cloud ePhone
          </span>
        </a>

        {/* Social Media Links: Compact and close to each other on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-3.5">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-[0_0_8px_rgba(0,71,255,0.2)] hover:shadow-[0_0_15px_rgba(0,180,255,0.5)] cursor-pointer"
                aria-label={item.name}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            );
          })}
        </div>

        {/* Clear Glassy, Smaller Action Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            onClick={onOpenPreOrder}
            className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-cyan-400/60 text-white font-bold text-[10px] sm:text-[11px] tracking-wide shadow-[0_0_12px_rgba(0,71,255,0.35)] transition-all flex items-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>Early Bird $29</span>
            <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

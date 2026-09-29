import React, { useState, useEffect } from 'react';
import { TeladuLogo } from './TeladuLogo';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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

  const navLinks = [
    { label: 'Virtual ePhone', href: '#virtual-phone' },
    { label: 'Hardware Craft', href: '#pillars' },
    { label: 'ePhone Features', href: '#features' },
    { label: 'Cloud Tech', href: '#cloud-tech' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050811]/90 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Header Brand Logo (Allowed) */}
        <a
          href="#top"
          className="flex items-center gap-3 group focus-visible:outline-none"
        >
          <TeladuLogo size={28} />
          <span className="hidden sm:inline-block w-px h-4 bg-white/20" />
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest hidden sm:inline-block">
            V1 · Cloud ePhone
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-white transition-colors relative py-1 focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Button: White with blue text and neon blue halo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPreOrder}
            className="px-5 py-2.5 rounded-full bg-white text-[#0038ff] font-bold text-xs uppercase tracking-wider shadow-[0_0_18px_rgba(0,56,255,0.7)] hover:shadow-[0_0_28px_rgba(0,56,255,0.95)] hover:bg-slate-50 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>Early Bird $29</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0038ff]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus-visible:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050811]/95 backdrop-blur-2xl border-b border-blue-500/20 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-200 hover:text-cyan-400 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreOrder();
              }}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-white text-[#0038ff] shadow-[0_0_20px_rgba(0,56,255,0.7)] rounded-full"
            >
              Get Your Teladu V1 · $29
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

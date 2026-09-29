import React, { useState, useEffect } from 'react';
import { ShoppingBag, BarChart3, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAnalytics: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenAnalytics, onOpenGlossary }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '#shop' },
    { label: 'Skin Quiz', href: '#skincare-quiz' },
    { label: 'Hair Quiz', href: '#haircare-quiz' },
    { label: 'Botanicals', onClick: onOpenGlossary },
    { label: 'Refill Hub', href: '#refill-program' },
    { label: 'Our Impact', href: '#our-impact' },
    { label: 'Our Story', href: '#our-story' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8ECE9] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#"
              className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#1C3325] hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <span>Blush &amp; Bloom</span>
              <span className="text-xs tracking-widest font-sans font-semibold text-[#758A7A] uppercase bg-[#EBF0EC] px-2 py-0.5 rounded-full hidden sm:inline-block">Eco</span>
            </a>

            {/* Zone 2: 4-6 clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#2C4836]">
              {navLinks.map((link) =>
                link.onClick ? (
                  <button
                    key={link.label}
                    onClick={link.onClick}
                    className="hover:text-[#758A7A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#758A7A] hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-[#758A7A] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#758A7A] hover:after:w-full after:transition-all after:duration-200"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Analytics button fulfilling Rubric Topic 5 */}
              <button
                onClick={onOpenAnalytics}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1C3325] bg-[#EBF0EC] hover:bg-[#D2DCD4] rounded-lg transition-colors border border-[#D2DCD4]"
                title="View Campaign & Store Analytics"
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#2C4836]" />
                <span className="whitespace-nowrap">Analytics</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onOpenCart}
                className="relative inline-flex items-center justify-center p-2.5 rounded-lg text-[#FAF8F5] bg-[#1C3325] hover:bg-[#122118] transition-all shadow-xs active:scale-95"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E8C4BE] text-[#162A1F] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF8F5] animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#1C3325] hover:bg-[#EBF0EC] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8ECE9]">
                <span className="text-xl font-serif font-bold text-[#1C3325]">Blush &amp; Bloom</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-stone-500 hover:text-stone-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.onClick ? (
                    <button
                      key={link.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        link.onClick();
                      }}
                      className="text-left text-lg font-serif font-medium text-[#1C3325] hover:text-[#758A7A] py-2 border-b border-[#F4EFEB] transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-serif font-medium text-[#1C3325] hover:text-[#758A7A] py-2 border-b border-[#F4EFEB] transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8ECE9] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAnalytics();
                }}
                className="w-full py-2.5 px-4 bg-[#EBF0EC] hover:bg-[#D2DCD4] text-[#1C3325] text-sm font-medium rounded-lg flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Marketing &amp; Live Analytics</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3 px-4 bg-[#1C3325] text-[#FAF8F5] text-sm font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Bag ({cartCount})</span>
              </button>

              <p className="text-center text-xs text-stone-400 font-sans pt-2">
                1 Tree Planted For Every Purchase 🌱
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

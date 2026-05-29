import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location              = useLocation();
  const { unreadCount, isAdmin } = usePortfolio();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => setOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/95 backdrop-blur-md border-b border-slate/40 shadow-lg shadow-navy/50' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-display font-bold text-navy text-sm shadow-md group-hover:scale-105 transition-transform">
            TA
          </div>
          <span className="font-display font-bold text-lg text-text tracking-tight">
            Tahseen<span className="text-gold">.</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              className={`text-sm font-medium transition-colors duration-200 relative ${
                location.pathname === link.path ? 'text-gold' : 'text-muted hover:text-text'
              }`}>
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gold rounded-full" />
              )}
            </Link>
          ))}
          <Link to="/admin"
            className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-slate text-muted text-sm hover:border-gold hover:text-gold transition-all duration-200">
            Admin
            {isAdmin && unreadCount > 0 && (
              <span className="w-4 h-4 bg-gold text-navy text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-muted hover:text-gold transition-colors">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-navy/98 backdrop-blur-md border-b border-slate/40 px-6 py-5 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              className={`py-2.5 text-sm font-medium border-b border-slate/30 transition-colors ${
                location.pathname === link.path ? 'text-gold' : 'text-muted'
              }`}>
              {link.label}
            </Link>
          ))}
          <Link to="/admin" className="pt-3 text-sm text-muted">Admin Panel →</Link>
        </div>
      )}
    </nav>
  );
}

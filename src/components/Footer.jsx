import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { profile } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate/40 mt-24 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy font-bold text-xs">
            TA
          </div>
          <span className="font-display font-bold text-text">Tahseen<span className="text-gold">.</span></span>
        </div>

        <p className="text-muted text-xs font-mono">
          © {year} Tahseen Ahmed · Sukkur IBA University
        </p>

        <div className="flex items-center gap-4">
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noreferrer"
              className="text-muted hover:text-text transition-colors text-sm">GitHub</a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer"
              className="text-muted hover:text-teal transition-colors text-sm">LinkedIn</a>
          )}
          <a href={`mailto:${profile?.email || 'tahseen@email.com'}`}
            className="text-muted hover:text-gold transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

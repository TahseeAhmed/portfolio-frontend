import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Language', 'Tools'];

const LEVEL_STYLE = {
  Advanced:     'text-teal bg-teal/10 border-teal/30',
  Intermediate: 'text-gold bg-gold/10 border-gold/30',
  Beginner:     'text-muted bg-slate/30 border-slate/50',
};
const LEVEL_WIDTH = { Advanced: '100%', Intermediate: '65%', Beginner: '35%' };

export default function Skills() {
  const { skills, loading } = usePortfolio();
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-gold text-xs tracking-widest uppercase mb-3">Technologies</p>
          <h1 className="font-display font-extrabold text-5xl text-text mb-4">
            Tech <span className="gradient-gold">Stack</span>
          </h1>
          <p className="text-muted font-body text-base max-w-xl leading-relaxed">
            Skills managed dynamically from the admin panel — always up to date as I learn new technologies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all duration-200 ${
                active === cat
                  ? 'bg-gold text-navy shadow-md glow-gold'
                  : 'border border-slate/50 text-muted hover:border-gold/50 hover:text-gold bg-surface'
              }`}>
              {cat}
              {cat !== 'All' && (
                <span className={`ml-2 text-xs ${active === cat ? 'text-navy/70' : 'text-muted/60'}`}>
                  {skills.filter(s => s.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-surface border border-slate/30 rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate/30 rounded-xl" />
                  <div className="space-y-1.5">
                    <div className="w-24 h-3 bg-slate/30 rounded" />
                    <div className="w-16 h-2.5 bg-slate/20 rounded" />
                  </div>
                </div>
                <div className="h-1 bg-slate/20 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted text-xs font-mono mb-6 tracking-wide">
              Showing {filtered.length} of {skills.length} skills
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((skill, i) => (
                <div key={skill._id || i}
                  className="bg-surface border border-slate/40 rounded-2xl p-5 card-hover group"
                  style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-navy border border-slate/50 rounded-xl flex items-center justify-center text-xl shadow-inner">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-text text-sm group-hover:text-gold transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-[11px] text-muted font-mono mt-0.5">{skill.category}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-lg border font-mono font-semibold ${LEVEL_STYLE[skill.level] || LEVEL_STYLE.Beginner}`}>
                      {skill.level}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 bg-slate/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-700"
                      style={{ width: LEVEL_WIDTH[skill.level] || '30%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-muted font-body text-sm">No skills in this category yet.</p>
            <a href="/admin" className="mt-3 inline-block text-gold text-sm hover:underline">Add skills in Admin →</a>
          </div>
        )}

        {/* Admin CTA */}
        <div className="mt-16 p-5 bg-surface border border-slate/40 rounded-2xl text-center">
          <p className="text-muted font-body text-sm">
            Skills are stored in MongoDB and managed from the{' '}
            <a href="/admin" className="text-gold hover:underline font-medium">Admin Panel →</a>
          </p>
        </div>
      </div>
    </div>
  );
}

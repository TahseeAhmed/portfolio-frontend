import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const GRAD = [
  'from-gold/10 to-gold-light/5',
  'from-teal/10 to-teal/5',
  'from-slate/40 to-navy-light',
  'from-gold/5 to-teal/10',
];

export default function Projects() {
  const { projects, loading } = usePortfolio();
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech?.some(t => t.toLowerCase().includes(q));
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="font-mono text-gold text-xs tracking-widest uppercase mb-3">Portfolio</p>
          <h1 className="font-display font-extrabold text-5xl text-text mb-4">
            My <span className="gradient-gold">Work</span>
          </h1>
          <p className="text-muted font-body text-base max-w-xl leading-relaxed">
            Real projects built with real technologies. Each one pushed my skills further.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative max-w-sm w-full">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search projects, tech..."
              className="w-full bg-surface border border-slate/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-text font-body placeholder:text-muted/50 focus:border-gold/50 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all ${
                  category === cat
                    ? 'bg-gold text-navy glow-gold'
                    : 'border border-slate/50 text-muted hover:border-gold/50 hover:text-gold bg-surface'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface border border-slate/30 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-slate/20" />
                <div className="p-5 space-y-3">
                  <div className="w-40 h-4 bg-slate/30 rounded" />
                  <div className="w-full h-3 bg-slate/20 rounded" />
                  <div className="w-3/4 h-3 bg-slate/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-muted text-xs font-mono mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((project, i) => (
                <div key={project._id || i}
                  className="bg-surface border border-slate/40 rounded-2xl overflow-hidden card-hover group">
                  {/* Image */}
                  <div className={`h-48 bg-gradient-to-br ${GRAD[i % GRAD.length]} flex items-center justify-center relative overflow-hidden`}>
                    {project.image?.url ? (
                      <img src={project.image.url} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-display font-black text-6xl text-slate/30 select-none">
                        {project.title.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.featured && (
                        <span className="bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">featured</span>
                      )}
                      <span className="bg-navy/80 backdrop-blur-sm text-muted text-[10px] px-2 py-0.5 rounded-full font-mono border border-slate/40">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-text group-hover:text-gold transition-colors mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-muted text-sm font-body leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech?.map(t => (
                        <span key={t} className="text-[10px] bg-slate/30 text-muted px-2 py-0.5 rounded-md font-mono border border-slate/30">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-3 border-t border-slate/30">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer"
                          className="text-muted text-xs hover:text-text transition-colors font-mono flex items-center gap-1">
                          GitHub ↗
                        </a>
                      )}
                      {project.live && project.live !== '#' && (
                        <a href={project.live} target="_blank" rel="noreferrer"
                          className="text-muted text-xs hover:text-teal transition-colors font-mono flex items-center gap-1">
                          <ExternalLink size={11} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-muted font-body">No projects match your search.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); }}
              className="mt-4 text-gold text-sm hover:underline font-mono">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

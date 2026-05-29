import { MapPin, GraduationCap, Code2, Target, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { profile } = usePortfolio();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-gold text-xs tracking-widest uppercase mb-3">About Me</p>
          <h1 className="font-display font-extrabold text-5xl text-text leading-tight">
            The person behind<br />the <span className="gradient-gold">code</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Left: Photo + Quick Facts */}
          <div className="md:col-span-2 space-y-5">
            <div className="w-full aspect-square rounded-3xl overflow-hidden border border-slate/50 bg-surface shadow-xl shadow-navy/50">
              {profile?.profileImage?.url ? (
                <img src={profile.profileImage.url} alt="Tahseen Ahmed" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-navy">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-display font-extrabold text-5xl text-navy shadow-xl">
                    TA
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <MapPin size={14} className="text-gold" />, label: 'Location', value: 'Sukkur, Pakistan' },
                { icon: <GraduationCap size={14} className="text-teal" />, label: 'Institute', value: 'Sukkur IBA' },
                { icon: <Code2 size={14} className="text-gold-light" />, label: 'Focus', value: 'Full Stack' },
                { icon: <Calendar size={14} className="text-teal" />, label: 'Batch', value: '2022 – 2026' },
              ].map((item, i) => (
                <div key={i} className="bg-surface border border-slate/40 rounded-xl p-3.5">
                  <div className="flex items-center gap-1.5 mb-1">{item.icon}<span className="text-[10px] text-muted font-mono uppercase tracking-wide">{item.label}</span></div>
                  <p className="text-text text-sm font-display font-semibold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-xl px-4 py-3">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              <span className="text-teal text-sm font-medium">Available for Work</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="md:col-span-3 space-y-10">
            <div>
              <h2 className="font-display font-bold text-2xl text-text mb-4">Hello, World! 👋</h2>
              <div className="space-y-4 text-muted font-body leading-relaxed text-[15px]">
                <p>I'm <span className="text-text font-semibold">Tahseen Ahmed</span>, a Full Stack Developer and Computer Science student at <span className="text-teal font-medium">Sukkur IBA University</span> — one of the top institutions in Sindh, Pakistan.</p>
                <p>I specialize in the <span className="text-gold font-medium">MERN stack</span> (MongoDB, Express.js, React, Node.js) and love architecting clean, scalable systems that solve real-world problems.</p>
                <p>Beyond code, I'm passionate about open source, teaching others, and pushing the boundaries of what's possible with modern web technologies.</p>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-display font-bold text-xl text-text mb-4">Education 🎓</h3>
              <div className="bg-surface border border-slate/50 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold to-gold-light rounded-l-2xl" />
                <div className="pl-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display font-bold text-text text-lg">BS Computer Science</p>
                    <p className="text-teal font-medium text-sm mt-0.5">Sukkur IBA University</p>
                    <p className="text-muted text-sm font-body mt-1">Sukkur, Sindh, Pakistan</p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-mono text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-lg">
                    2022 – 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div>
              <h3 className="font-display font-bold text-xl text-text mb-4">Career Goals 🚀</h3>
              <div className="space-y-3">
                {[
                  'Build impactful software products that reach millions of users',
                  'Contribute to world-class open source projects',
                  'Join a top-tier tech company or launch my own startup',
                  'Mentor the next generation of developers from Sindh',
                ].map((goal, i) => (
                  <div key={i} className="flex items-start gap-3 text-muted text-sm font-body bg-surface border border-slate/30 rounded-xl px-4 py-3">
                    <span className="text-gold font-mono font-bold text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What I bring */}
            <div>
              <h3 className="font-display font-bold text-xl text-text mb-4">What I Bring 💡</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Clean Code', icon: '✨' },
                  { label: 'Fast Delivery', icon: '⚡' },
                  { label: 'Full Stack', icon: '🔗' },
                  { label: 'Problem Solver', icon: '🧠' },
                  { label: 'Team Player', icon: '🤝' },
                  { label: 'Always Learning', icon: '📚' },
                ].map((item, i) => (
                  <div key={i} className="bg-surface border border-slate/40 rounded-xl p-3 text-center card-hover">
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="text-muted text-xs font-body">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

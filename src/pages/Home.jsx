import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Download,
  Mail,
  ExternalLink,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

function TypewriterText({ texts }) {
  const ref = useRef(null);
  useEffect(() => {
    let i = 0,
      j = 0,
      deleting = false;
    const tick = () => {
      const cur = texts[i % texts.length];
      if (ref.current)
        ref.current.textContent = cur.slice(0, deleting ? j - 1 : j + 1);
      deleting ? j-- : j++;
      if (!deleting && j === cur.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      if (deleting && j === 0) {
        deleting = false;
        i++;
      }
      setTimeout(tick, deleting ? 55 : 90);
    };
    tick();
  }, []);
  return <span ref={ref} className="gradient-gold" />;
}

const timeline = [
  {
    year: "2024",
    title: "Started CS at Sukkur IBA",
    desc: "Enrolled in Computer Science at Sukkur IBA University — one of the top institutions in Sindh, Pakistan.",
    icon: "🎓",
  },
  {
    year: "Project",
    title: "Law Management System",
    desc: "Built a complete law firm management system to handle cases, clients, and legal documents efficiently.",
    icon: "⚖️",
  },
  {
    year: "Project",
    title: "Voting System",
    desc: "Developed a secure digital voting system with authentication, real-time results, and tamper-proof records.",
    icon: "🗳️",
  },
  {
    year: "Now",
    title: "Full Stack Development",
    desc: "Building real-world MERN stack applications and growing as a professional developer.",
    icon: "🚀",
  },
];

export default function Home() {
  const { profile, projects, skills, loading } = usePortfolio();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-slate border-t-gold rounded-full animate-spin" />
          <p className="text-muted font-mono text-sm">Loading portfolio...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate/60 bg-surface text-xs text-muted font-mono">
              <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse-gold" />
              Open to internships & freelance work
            </div>

            <div className="space-y-2">
              <p className="font-mono text-gold text-sm tracking-widest uppercase">
                Hello, World!
              </p>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.1] text-text">
                I'm <span className="gradient-gold">Tahseen</span>
                <br />
                Ahmed
              </h1>
              <div className="flex items-center gap-2 text-2xl md:text-3xl font-display font-semibold text-muted mt-2 h-10">
                <TypewriterText
                  texts={[
                    "Full Stack Dev",
                    "MERN Specialist",
                    "Problem Solver",
                    "CS Student",
                  ]}
                />
                <span className="text-gold animate-pulse">|</span>
              </div>
            </div>

            <p className="text-muted font-body text-base leading-relaxed max-w-md">
              {profile?.subtitle ||
                "Building scalable web applications with clean code & creative thinking."}{" "}
              Studying at{" "}
              <span className="text-teal font-medium">
                Sukkur IBA University
              </span>
              .
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-xs text-muted border border-slate/50 rounded-lg px-3 py-1.5 bg-surface">
                <MapPin size={11} className="text-gold" /> Sukkur, Pakistan
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted border border-slate/50 rounded-lg px-3 py-1.5 bg-surface">
                <GraduationCap size={11} className="text-teal" /> Sukkur IBA ·
                2024 – 2028
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="flex items-center gap-2 px-6 py-3 bg-gold text-navy font-display font-bold rounded-xl hover:bg-gold-light transition-all duration-200 glow-gold text-sm"
              >
                View Projects <ExternalLink size={14} />
              </Link>
              <a
                href={profile?.cvUrl || "#"}
                download
                className="flex items-center gap-2 px-6 py-3 border border-slate text-text font-display font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-200 text-sm"
              >
                <Download size={14} /> Download CV
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3 border border-slate text-muted font-display font-semibold rounded-xl hover:border-teal hover:text-teal transition-all duration-200 text-sm"
              >
                <Mail size={14} /> Contact Me
              </Link>
            </div>

            <div className="flex gap-3 pt-1">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-slate rounded-lg text-muted text-sm hover:border-gold hover:text-gold transition-all font-mono"
                >
                  GitHub ↗
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-slate rounded-lg text-muted text-sm hover:border-teal hover:text-teal transition-all font-mono"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl border border-slate/60 overflow-hidden bg-surface shadow-2xl shadow-navy">
                {profile?.profileImage?.url ? (
                  <img
                    src={profile.profileImage.url}
                    alt="Tahseen Ahmed"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-navy">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center font-display font-extrabold text-4xl text-navy shadow-lg">
                      TA
                    </div>
                    <p className="text-muted text-xs font-mono">
                      No photo uploaded yet
                    </p>
                    <Link
                      to="/admin"
                      className="text-xs text-gold hover:underline"
                    >
                      Upload in Admin →
                    </Link>
                  </div>
                )}
              </div>
              <div className="absolute -top-3 -right-3 w-14 h-14 border border-gold/30 rounded-2xl rotate-12" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border border-teal/30 rounded-xl -rotate-12" />
              <div className="absolute -left-10 top-10 bg-surface border border-slate/60 rounded-xl px-3.5 py-2.5 shadow-xl">
                <p className="text-[10px] text-muted font-mono">Projects</p>
                <p className="text-2xl font-display font-bold gradient-gold">
                  {projects.length}+
                </p>
              </div>
              <div className="absolute -right-10 bottom-10 bg-surface border border-slate/60 rounded-xl px-3.5 py-2.5 shadow-xl">
                <p className="text-[10px] text-muted font-mono">Skills</p>
                <p className="text-2xl font-display font-bold gradient-teal">
                  {skills.length}+
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted/50">
          <span className="text-[10px] font-mono tracking-widest uppercase">
            scroll
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 px-6 border-y border-slate/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              label: "Projects Built",
              value: `${projects.length}+`,
              color: "gradient-gold",
            },
            {
              label: "Technologies",
              value: `${skills.length}+`,
              color: "gradient-teal",
            },
            { label: "Institute", value: "SIBA", color: "gradient-gold" },
            { label: "Status", value: "Hiring", color: "gradient-teal" },
          ].map((s, i) => (
            <div key={i}>
              <p className={`font-display font-extrabold text-4xl ${s.color}`}>
                {s.value}
              </p>
              <p className="text-muted text-xs font-mono mt-1 tracking-wide uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-gold text-xs tracking-widest uppercase mb-2">
              Career Path
            </p>
            <h2 className="font-display font-bold text-4xl text-text">
              My Journey
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate to-transparent" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 pl-14 md:pl-0">
                    {i % 2 === 0 && (
                      <div className="bg-surface border border-slate/50 rounded-2xl p-5 card-hover">
                        <span className="font-mono text-xs text-gold">
                          {item.year}
                        </span>
                        <h3 className="font-display font-semibold text-text mt-1">
                          {item.title}
                        </h3>
                        <p className="text-muted text-sm font-body mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-surface border-2 border-gold/60 rounded-full flex items-center justify-center z-10 text-sm shadow-lg shadow-navy">
                    {item.icon}
                  </div>
                  <div className="flex-1 pl-14 md:pl-6">
                    {i % 2 !== 0 && (
                      <div className="bg-surface border border-slate/50 rounded-2xl p-5 card-hover">
                        <span className="font-mono text-xs text-gold">
                          {item.year}
                        </span>
                        <h3 className="font-display font-semibold text-text mt-1">
                          {item.title}
                        </h3>
                        <p className="text-muted text-sm font-body mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      {projects.filter((p) => p.featured).length > 0 && (
        <section className="py-20 px-6 bg-surface/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-gold text-xs tracking-widest uppercase mb-2">
                  Selected Work
                </p>
                <h2 className="font-display font-bold text-4xl text-text">
                  Featured Projects
                </h2>
              </div>
              <Link
                to="/projects"
                className="text-muted text-sm hover:text-gold transition-colors font-mono hidden md:block"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {projects
                .filter((p) => p.featured)
                .slice(0, 2)
                .map((project, i) => (
                  <div
                    key={project._id || i}
                    className="bg-navy border border-slate/50 rounded-2xl overflow-hidden card-hover group"
                  >
                    <div className="h-44 bg-gradient-to-br from-slate/40 to-navy-light flex items-center justify-center relative">
                      {project.image?.url ? (
                        <img
                          src={project.image.url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-display font-bold text-5xl text-slate/40">
                          {project.title.slice(0, 2)}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                        featured
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg text-text group-hover:text-gold transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted text-sm font-body mt-1 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tech?.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] bg-slate/30 text-muted px-2 py-0.5 rounded font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-4 pt-3 border-t border-slate/30">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted text-xs hover:text-text transition-colors font-mono"
                          >
                            GitHub ↗
                          </a>
                        )}
                        {project.live && project.live !== "#" && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted text-xs hover:text-teal transition-colors font-mono"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link
                to="/projects"
                className="text-muted text-sm hover:text-gold transition-colors font-mono"
              >
                View all projects →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

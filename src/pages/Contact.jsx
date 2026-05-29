import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { sendMessage, profile } = usePortfolio();
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message too short (min 10 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      await sendMessage(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setApiError(err.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, error, children }) => (
    <div>
      <label className="block text-xs font-mono text-muted mb-1.5 tracking-wide uppercase">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1 font-mono">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-gold text-xs tracking-widest uppercase mb-3">Get In Touch</p>
          <h1 className="font-display font-extrabold text-5xl text-text mb-4">
            Let's <span className="gradient-gold">Connect</span>
          </h1>
          <p className="text-muted font-body text-base max-w-xl leading-relaxed">
            Have a project, opportunity, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14">

          {/* Left: Info */}
          <div className="space-y-6">
            {[
              { icon: <Mail size={18} className="text-gold" />, label: 'Email', value: profile?.email || 'tahseen@email.com', href: `mailto:${profile?.email || 'tahseen@email.com'}` },
              { icon: <MapPin size={18} className="text-teal" />, label: 'Location', value: 'Sukkur, Sindh, Pakistan', href: null },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-surface border border-slate/40 rounded-2xl p-4 card-hover">
                <div className="w-11 h-11 bg-navy border border-slate/50 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] text-muted font-mono uppercase tracking-widest">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-text text-sm font-body hover:text-gold transition-colors">{item.value}</a>
                    : <p className="text-text text-sm font-body">{item.value}</p>}
                </div>
              </div>
            ))}

            {/* Social links */}
            {(profile?.github || profile?.linkedin) && (
              <div className="grid grid-cols-2 gap-3">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer"
                    className="bg-surface border border-slate/40 rounded-2xl p-4 card-hover text-center group">
                    <p className="text-[10px] text-muted font-mono uppercase tracking-widest mb-1">GitHub</p>
                    <p className="text-text text-sm group-hover:text-gold transition-colors font-mono">↗ Visit</p>
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer"
                    className="bg-surface border border-slate/40 rounded-2xl p-4 card-hover text-center group">
                    <p className="text-[10px] text-muted font-mono uppercase tracking-widest mb-1">LinkedIn</p>
                    <p className="text-text text-sm group-hover:text-teal transition-colors font-mono">↗ Connect</p>
                  </a>
                )}
              </div>
            )}

            {/* Availability card */}
            <div className="bg-teal/10 border border-teal/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                <span className="text-teal font-display font-semibold text-sm">Available for Work</span>
              </div>
              <p className="text-muted text-sm font-body leading-relaxed">
                Open to internships, freelance projects, and full-time roles. Response time: within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {sent ? (
              <div className="h-full min-h-64 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-teal/10 border border-teal/30 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-teal" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-text">Message Sent!</h3>
                  <p className="text-muted font-body text-sm">Thanks for reaching out. I'll reply within 24 hours.</p>
                  <button onClick={() => setSent(false)}
                    className="mt-2 px-5 py-2 border border-slate/50 rounded-xl text-muted text-sm hover:text-text hover:border-text/30 transition-all font-mono">
                    Send another →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="Your Name" error={errors.name}>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full bg-surface border rounded-xl px-4 py-3 text-text text-sm font-body placeholder:text-muted/40 focus:outline-none transition-colors ${errors.name ? 'border-red-500/60' : 'border-slate/50 focus:border-gold/50'}`} />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full bg-surface border rounded-xl px-4 py-3 text-text text-sm font-body placeholder:text-muted/40 focus:outline-none transition-colors ${errors.email ? 'border-red-500/60' : 'border-slate/50 focus:border-gold/50'}`} />
                </Field>
                <Field label="Message" error={errors.message}>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    className={`w-full bg-surface border rounded-xl px-4 py-3 text-text text-sm font-body placeholder:text-muted/40 focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500/60' : 'border-slate/50 focus:border-gold/50'}`} />
                </Field>

                {apiError && (
                  <p className="text-red-400 text-xs font-mono bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-xl">{apiError}</p>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-gold text-navy font-display font-bold rounded-xl hover:bg-gold-light transition-all duration-200 glow-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" /> Sending...</>
                    : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

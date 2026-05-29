import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import {
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Upload,
  Shield,
  CheckCircle,
  X,
  RefreshCw,
} from "lucide-react";

// ─── Reusable Components ──────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fixed top-6 right-6 z-[100] bg-teal/90 backdrop-blur-md text-navy px-4 py-2.5 rounded-xl text-sm font-display font-semibold flex items-center gap-2 shadow-2xl border border-teal/50">
      <CheckCircle size={15} /> {msg}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-slate/50 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate/40">
          <h3 className="font-display font-bold text-text">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-[10px] font-mono text-muted mb-1.5 uppercase tracking-widest">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1 font-mono">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full bg-navy border border-slate/50 rounded-xl px-3.5 py-2.5 text-text text-sm font-body focus:border-gold/50 focus:outline-none transition-colors placeholder:text-muted/40";
const selectCls =
  "w-full bg-navy border border-slate/50 rounded-xl px-3.5 py-2.5 text-text text-sm font-body focus:border-gold/50 focus:outline-none transition-colors";

// ─── Login ────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const { login } = usePortfolio();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Enter username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(username, password);
      onLogin();
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center shadow-lg glow-gold">
            <Shield size={22} className="text-navy" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-text">
              Admin Panel
            </h1>
            <p className="text-muted text-xs font-mono">
              Tahseen Ahmed · Portfolio
            </p>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <FormField label="Username">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="tahseen"
              className={inputCls}
            />
          </FormField>
          <FormField label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className={inputCls}
            />
          </FormField>
          {error && (
            <p className="text-red-400 text-xs font-mono bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold text-navy font-display font-bold rounded-xl hover:bg-gold-light transition-all glow-gold disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />{" "}
                Logging in...
              </>
            ) : (
              "Login →"
            )}
          </button>
        </form>

        {/* ── Info strip ── */}
        <div className="mt-8 pt-6 border-t border-slate/30 flex flex-col gap-3">
          {[
            {
              icon: <Shield size={14} />,
              text: "Secured with JWT authentication",
            },
            {
              icon: <CheckCircle size={14} />,
              text: "MongoDB · Real-time sync",
            },
            { icon: <Eye size={14} />, text: "Admin access only" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-muted">
              <span className="opacity-50">{item.icon}</span>
              <span className="text-xs font-mono">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Skill Form ───────────────────────────────────────────────
function SkillForm({ skill, onSave, onClose, loading }) {
  const [form, setForm] = useState(
    skill || {
      name: "",
      category: "Frontend",
      level: "Intermediate",
      icon: "⭐",
    },
  );
  return (
    <Modal title={skill ? "Edit Skill" : "Add Skill"} onClose={onClose}>
      <div className="space-y-4">
        <FormField label="Skill Name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. React.js"
            className={inputCls}
          />
        </FormField>
        <FormField label="Icon (emoji)">
          <input
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            placeholder="⚛️"
            className={inputCls}
          />
        </FormField>
        <FormField label="Category">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={selectCls}
          >
            {[
              "Frontend",
              "Backend",
              "Database",
              "Language",
              "Tools",
              "Other",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Level">
          <select
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            className={selectCls}
          >
            {["Beginner", "Intermediate", "Advanced"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </FormField>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 border border-slate/50 rounded-xl text-muted text-sm hover:text-text transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={loading}
          className="flex-1 py-2.5 bg-gold text-navy rounded-xl text-sm font-bold hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Skill"}
        </button>
      </div>
    </Modal>
  );
}

// ─── Project Form ─────────────────────────────────────────────
function ProjectForm({ project, onSave, onClose, loading }) {
  const [form, setForm] = useState(
    project || {
      title: "",
      description: "",
      tech: "",
      category: "MERN",
      github: "",
      live: "",
      featured: false,
    },
  );
  const [imageFile, setImageFile] = useState(null);

  const handleSave = () => {
    const fd = new FormData();
    const techArr =
      typeof form.tech === "string" ? form.tech : (form.tech || []).join(", ");
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("tech", techArr);
    fd.append("category", form.category);
    fd.append("github", form.github || "");
    fd.append("live", form.live || "");
    fd.append("featured", form.featured);
    if (imageFile) fd.append("image", imageFile);
    onSave(fd);
  };

  const techValue =
    typeof form.tech === "string" ? form.tech : (form.tech || []).join(", ");

  return (
    <Modal title={project ? "Edit Project" : "Add Project"} onClose={onClose}>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        <FormField label="Title">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Project Name"
            className={inputCls}
          />
        </FormField>
        <FormField label="Description">
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What does it do?"
            className={inputCls + " resize-none"}
          />
        </FormField>
        <FormField label="Tech Stack (comma separated)">
          <input
            value={techValue}
            onChange={(e) => setForm({ ...form, tech: e.target.value })}
            placeholder="React, Node.js, MongoDB"
            className={inputCls}
          />
        </FormField>
        <FormField label="Category">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={selectCls}
          >
            {["MERN", "Java", "Python", "AI/ML", "Finance", "Other"].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </FormField>
        <FormField label="GitHub URL">
          <input
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            placeholder="https://github.com/..."
            className={inputCls}
          />
        </FormField>
        <FormField label="Live URL">
          <input
            value={form.live}
            onChange={(e) => setForm({ ...form, live: e.target.value })}
            placeholder="https://..."
            className={inputCls}
          />
        </FormField>
        <FormField label="Project Image">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full bg-navy border border-slate/50 rounded-xl px-3 py-2 text-muted text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gold/20 file:text-gold file:text-xs file:font-mono cursor-pointer"
          />
        </FormField>
        <label className="flex items-center gap-2 text-sm text-muted font-body cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-yellow-500 w-4 h-4"
          />
          Mark as Featured
        </label>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 border border-slate/50 rounded-xl text-muted text-sm hover:text-text transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex-1 py-2.5 bg-gold text-navy rounded-xl text-sm font-bold hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </Modal>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard() {
  const {
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    projects,
    addProject,
    updateProject,
    deleteProject,
    messages,
    markRead,
    deleteMessage,
    loadMessages,
    uploadProfileImage,
    uploadCV,
    updateProfile,
    profile,
    isAdmin,
    logout,
    unreadCount,
    refresh,
  } = usePortfolio();

  const [tab, setTab] = useState("overview");
  const [toast, setToast] = useState("");
  const [skillModal, setSkillModal] = useState(null);
  const [projectModal, setProjectModal] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [profileForm, setProfileForm] = useState(null);

  useEffect(() => {
    if (isAdmin) loadMessages();
  }, [isAdmin]);
  useEffect(() => {
    if (profile)
      setProfileForm({
        name: profile.name,
        title: profile.title,
        subtitle: profile.subtitle,
        bio: profile.bio,
        email: profile.email,
        location: profile.location,
        github: profile.github,
        linkedin: profile.linkedin,
      });
  }, [profile]);

  const showToast = (msg) => setToast(msg);

  const handleSaveSkill = async (data) => {
    setActionLoading(true);
    try {
      if (skillModal === "new") await addSkill(data);
      else await updateSkill(skillModal._id, data);
      showToast(skillModal === "new" ? "Skill added!" : "Skill updated!");
      setSkillModal(null);
    } catch (e) {
      showToast("Error: " + e.message);
    }
    setActionLoading(false);
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id);
      showToast("Skill deleted");
    } catch (e) {
      showToast("Error: " + e.message);
    }
  };

  const handleSaveProject = async (fd) => {
    setActionLoading(true);
    try {
      if (projectModal === "new") await addProject(fd);
      else await updateProject(projectModal._id, fd);
      showToast(projectModal === "new" ? "Project added!" : "Project updated!");
      setProjectModal(null);
    } catch (e) {
      showToast("Error: " + e.message);
    }
    setActionLoading(false);
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      showToast("Project deleted");
    } catch (e) {
      showToast("Error: " + e.message);
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    setActionLoading(true);
    try {
      await uploadProfileImage(fd);
      showToast("Profile image updated!");
    } catch (e) {
      showToast("Error: " + e.message);
    }
    setActionLoading(false);
  };

  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("cv", file);
    setActionLoading(true);
    try {
      await uploadCV(fd);
      showToast("CV uploaded!");
    } catch (e) {
      showToast("Error: " + e.message);
    }
    setActionLoading(false);
  };

  const handleSaveProfile = async () => {
    setActionLoading(true);
    try {
      await updateProfile(profileForm);
      showToast("Profile saved!");
    } catch (e) {
      showToast("Error: " + e.message);
    }
    setActionLoading(false);
  };

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: `Skills (${skills.length})` },
    { id: "projects", label: `Projects (${projects.length})` },
    {
      id: "messages",
      label: `Messages${unreadCount > 0 ? ` (${unreadCount})` : ""}`,
    },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 pb-16">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}
      {skillModal && (
        <SkillForm
          skill={skillModal === "new" ? null : skillModal}
          onSave={handleSaveSkill}
          onClose={() => setSkillModal(null)}
          loading={actionLoading}
        />
      )}
      {projectModal && (
        <ProjectForm
          project={projectModal === "new" ? null : projectModal}
          onSave={handleSaveProject}
          onClose={() => setProjectModal(null)}
          loading={actionLoading}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-text">
              Admin Panel
            </h1>
            <p className="text-muted text-xs font-mono mt-0.5">
              MongoDB · Real-time data
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                refresh();
                showToast("Refreshed!");
              }}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate/50 rounded-lg text-muted hover:text-teal hover:border-teal/50 transition-all text-xs font-mono"
            >
              <RefreshCw size={12} /> Refresh
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate/50 rounded-lg text-muted hover:text-red-400 hover:border-red-400/50 transition-all text-xs font-mono"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 mb-8 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-xl text-sm font-display font-semibold transition-all ${
                tab === t.id
                  ? "bg-gold text-navy"
                  : "border border-slate/50 text-muted hover:border-gold/50 hover:text-gold bg-surface"
              }`}
            >
              {t.label}
              {t.id === "messages" && unreadCount > 0 && tab !== "messages" && (
                <span className="ml-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full inline-flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Total Skills",
                  value: skills.length,
                  color: "gradient-gold",
                },
                {
                  label: "Total Projects",
                  value: projects.length,
                  color: "gradient-teal",
                },
                {
                  label: "Messages",
                  value: messages.length,
                  color: "gradient-gold",
                },
                { label: "Unread", value: unreadCount, color: "text-red-400" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-surface border border-slate/40 rounded-2xl p-5 text-center card-hover"
                >
                  <p
                    className={`font-display font-extrabold text-3xl ${s.color}`}
                  >
                    {s.value}
                  </p>
                  <p className="text-muted text-[10px] font-mono mt-1 uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-surface border border-slate/40 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-text mb-3 text-sm">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  {
                    label: "Add New Skill",
                    action: () => {
                      setSkillModal("new");
                      setTab("skills");
                    },
                  },
                  {
                    label: "Add New Project",
                    action: () => {
                      setProjectModal("new");
                      setTab("projects");
                    },
                  },
                  { label: "View Messages", action: () => setTab("messages") },
                  { label: "Update Profile", action: () => setTab("profile") },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full text-left px-3 py-2.5 rounded-xl border border-slate/30 text-muted text-sm hover:border-gold/40 hover:text-gold transition-all font-body"
                  >
                    {item.label} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg text-text">
                Manage Skills
              </h2>
              <button
                onClick={() => setSkillModal("new")}
                className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-xl text-sm font-bold hover:bg-gold-light transition-all glow-gold"
              >
                <Plus size={14} /> Add Skill
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-surface border border-slate/40 rounded-xl p-4 flex items-center justify-between gap-3 card-hover"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl flex-shrink-0">{skill.icon}</span>
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-text text-sm truncate">
                        {skill.name}
                      </p>
                      <p className="text-[10px] text-muted font-mono">
                        {skill.category} · {skill.level}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => setSkillModal(skill)}
                      className="w-7 h-7 rounded-lg border border-slate/50 flex items-center justify-center text-muted hover:text-teal hover:border-teal/50 transition-all"
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="w-7 h-7 rounded-lg border border-slate/50 flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/50 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {skills.length === 0 && (
              <div className="text-center py-16 text-muted">
                <p className="text-4xl mb-3">🔧</p>
                <p className="text-sm font-body">
                  No skills yet. Add your first skill!
                </p>
              </div>
            )}
          </div>
        )}

        {tab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg text-text">
                Manage Projects
              </h2>
              <button
                onClick={() => setProjectModal("new")}
                className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-xl text-sm font-bold hover:bg-gold-light transition-all glow-gold"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-surface border border-slate/40 rounded-xl p-4 flex items-start justify-between gap-4 card-hover"
                >
                  <div className="flex gap-3 items-start min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-navy border border-slate/40 flex-shrink-0 overflow-hidden">
                      {project.image?.url ? (
                        <img
                          src={project.image.url}
                          className="w-full h-full object-cover"
                          alt={project.title}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate/50 font-display font-bold text-sm">
                          {project.title.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-display font-semibold text-text">
                          {project.title}
                        </p>
                        <span className="text-[10px] border border-slate/40 text-muted px-1.5 py-0.5 rounded font-mono">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded font-mono">
                            featured
                          </span>
                        )}
                      </div>
                      <p className="text-muted text-sm font-body mt-0.5 truncate">
                        {project.description}
                      </p>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {project.tech?.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] bg-slate/30 text-muted px-1.5 py-0.5 rounded font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => setProjectModal(project)}
                      className="w-7 h-7 rounded-lg border border-slate/50 flex items-center justify-center text-muted hover:text-teal hover:border-teal/50 transition-all"
                    >
                      <Edit3 size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="w-7 h-7 rounded-lg border border-slate/50 flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/50 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-lg text-text">
                Contact Messages
                {unreadCount > 0 && (
                  <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-mono">
                    {unreadCount} unread
                  </span>
                )}
              </h2>
            </div>
            {messages.length === 0 ? (
              <div className="text-center py-16 text-muted">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm font-body">No messages yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`bg-surface border rounded-2xl p-5 ${msg.read ? "border-slate/40" : "border-gold/30 bg-gold/5"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <p className="font-display font-bold text-text">
                            {msg.name}
                          </p>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-muted font-mono hover:text-gold transition-colors"
                          >
                            {msg.email}
                          </a>
                          {!msg.read && (
                            <span className="text-[10px] bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-mono">
                              NEW
                            </span>
                          )}
                          <span className="text-[10px] text-muted/60 font-mono ml-auto">
                            {new Date(msg.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <p className="text-muted text-sm font-body leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {!msg.read && (
                          <button
                            onClick={() => markRead(msg._id)}
                            className="w-7 h-7 rounded-lg border border-slate/50 flex items-center justify-center text-muted hover:text-teal hover:border-teal/50 transition-all"
                            title="Mark as read"
                          >
                            <Eye size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm("Delete this message?"))
                              deleteMessage(msg._id).then(() =>
                                showToast("Message deleted"),
                              );
                          }}
                          className="w-7 h-7 rounded-lg border border-slate/50 flex items-center justify-center text-muted hover:text-red-400 hover:border-red-400/50 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "profile" && profileForm && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-display font-semibold text-lg text-text">
              Profile Settings
            </h2>
            <div className="bg-surface border border-slate/40 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-text mb-4 text-sm">
                Profile Photo
              </h3>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl border border-slate/50 overflow-hidden bg-navy flex-shrink-0">
                  {profile?.profileImage?.url ? (
                    <img
                      src={profile.profileImage.url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display font-bold text-2xl gradient-gold">
                      TA
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className={`flex items-center gap-2 px-4 py-2.5 bg-gold text-navy rounded-xl text-sm font-bold cursor-pointer hover:bg-gold-light transition-all glow-gold ${actionLoading ? "opacity-50" : ""}`}
                  >
                    <Upload size={14} /> Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                      disabled={actionLoading}
                    />
                  </label>
                  <p className="text-xs text-muted font-mono mt-2">
                    JPG, PNG, WebP · Max 5MB
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-slate/40 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-text mb-2 text-sm">
                Resume / CV
              </h3>
              <p className="text-muted text-xs font-body mb-4">
                Upload your latest CV. Visitors can download it from the Home
                page.
              </p>
              <label
                className={`flex items-center gap-2 px-4 py-2.5 border border-slate/50 text-muted rounded-xl text-sm cursor-pointer hover:border-gold/50 hover:text-gold transition-all w-fit ${actionLoading ? "opacity-50" : ""}`}
              >
                <Upload size={14} /> Upload PDF
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCVUpload}
                  className="hidden"
                  disabled={actionLoading}
                />
              </label>
              {profile?.cvUrl && (
                <p className="text-xs text-teal font-mono mt-2">
                  ✓ CV uploaded
                </p>
              )}
            </div>

            <div className="bg-surface border border-slate/40 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-text mb-4 text-sm">
                Personal Info
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Full Name",
                    key: "name",
                    placeholder: "Tahseen Ahmed",
                  },
                  {
                    label: "Job Title",
                    key: "title",
                    placeholder: "Full Stack Developer",
                  },
                  {
                    label: "Email",
                    key: "email",
                    placeholder: "tahseen@email.com",
                  },
                  {
                    label: "Location",
                    key: "location",
                    placeholder: "Sukkur, Pakistan",
                  },
                  {
                    label: "GitHub URL",
                    key: "github",
                    placeholder: "https://github.com/...",
                  },
                  {
                    label: "LinkedIn URL",
                    key: "linkedin",
                    placeholder: "https://linkedin.com/in/...",
                  },
                ].map((f) => (
                  <FormField key={f.key} label={f.label}>
                    <input
                      value={profileForm[f.key] || ""}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          [f.key]: e.target.value,
                        })
                      }
                      placeholder={f.placeholder}
                      className={inputCls}
                    />
                  </FormField>
                ))}
                <div className="sm:col-span-2">
                  <FormField label="Subtitle / Tagline">
                    <input
                      value={profileForm.subtitle || ""}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="Building digital experiences..."
                      className={inputCls}
                    />
                  </FormField>
                </div>
                <div className="sm:col-span-2">
                  <FormField label="Bio">
                    <textarea
                      rows={3}
                      value={profileForm.bio || ""}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, bio: e.target.value })
                      }
                      placeholder="Short biography..."
                      className={inputCls + " resize-none"}
                    />
                  </FormField>
                </div>
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={actionLoading}
                className="mt-5 px-6 py-2.5 bg-gold text-navy rounded-xl text-sm font-bold hover:bg-gold-light transition-all glow-gold disabled:opacity-50"
              >
                {actionLoading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────
export default function Admin() {
  const { isAdmin } = usePortfolio();
  const [loggedIn, setLoggedIn] = useState(isAdmin);

  useEffect(() => {
    setLoggedIn(isAdmin);
  }, [isAdmin]);

  if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  return <Dashboard />;
}

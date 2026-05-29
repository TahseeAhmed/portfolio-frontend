import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { skillsAPI, projectsAPI, messagesAPI, profileAPI, authAPI, getToken, setToken, removeToken } from '../services/api';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [skills, setSkills]       = useState([]);
  const [projects, setProjects]   = useState([]);
  const [messages, setMessages]   = useState([]);
  const [profile, setProfile]     = useState(null);
  const [isAdmin, setIsAdmin]     = useState(false);
  const [loading, setLoading]     = useState(true);
  const [apiOnline, setApiOnline] = useState(true);

  const loadPublicData = useCallback(async () => {
    try {
      const [skillsRes, projectsRes, profileRes] = await Promise.all([
        skillsAPI.getAll(),
        projectsAPI.getAll(),
        profileAPI.get(),
      ]);
      setSkills(skillsRes.data || []);
      setProjects(projectsRes.data || []);
      setProfile(profileRes.data || null);
      setApiOnline(true);
    } catch {
      setApiOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPublicData(); }, [loadPublicData]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      authAPI.verify()
        .then(() => setIsAdmin(true))
        .catch(() => { removeToken(); setIsAdmin(false); });
    }
  }, []);

  const login = async (username, password) => {
    const res = await authAPI.login({ username, password });
    setToken(res.token);
    setIsAdmin(true);
    const msgRes = await messagesAPI.getAll();
    setMessages(msgRes.data || []);
    return res;
  };

  const logout = () => { removeToken(); setIsAdmin(false); setMessages([]); };

  const loadMessages = async () => {
    const res = await messagesAPI.getAll();
    setMessages(res.data || []);
  };

  const addSkill = async (data) => {
    const res = await skillsAPI.create(data);
    setSkills(prev => [...prev, res.data]);
    return res;
  };
  const updateSkill = async (id, data) => {
    const res = await skillsAPI.update(id, data);
    setSkills(prev => prev.map(s => s._id === id ? res.data : s));
    return res;
  };
  const deleteSkill = async (id) => {
    await skillsAPI.delete(id);
    setSkills(prev => prev.filter(s => s._id !== id));
  };

  const addProject = async (formData) => {
    const res = await projectsAPI.create(formData);
    setProjects(prev => [res.data, ...prev]);
    return res;
  };
  const updateProject = async (id, formData) => {
    const res = await projectsAPI.update(id, formData);
    setProjects(prev => prev.map(p => p._id === id ? res.data : p));
    return res;
  };
  const deleteProject = async (id) => {
    await projectsAPI.delete(id);
    setProjects(prev => prev.filter(p => p._id !== id));
  };

  const sendMessage = async (data) => messagesAPI.send(data);
  const markRead = async (id) => {
    await messagesAPI.markRead(id);
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
  };
  const deleteMessage = async (id) => {
    await messagesAPI.delete(id);
    setMessages(prev => prev.filter(m => m._id !== id));
  };

  const updateProfile = async (data) => {
    const res = await profileAPI.update(data);
    setProfile(res.data);
    return res;
  };
  const uploadProfileImage = async (formData) => {
    const res = await profileAPI.uploadImage(formData);
    setProfile(prev => ({ ...prev, profileImage: { url: res.imageUrl } }));
    return res;
  };
  const uploadCV = async (formData) => {
    const res = await profileAPI.uploadCV(formData);
    setProfile(prev => ({ ...prev, cvUrl: res.cvUrl }));
    return res;
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <PortfolioContext.Provider value={{
      skills, projects, messages, profile, isAdmin, loading, apiOnline, unreadCount,
      login, logout,
      addSkill, updateSkill, deleteSkill,
      addProject, updateProject, deleteProject,
      sendMessage, markRead, deleteMessage, loadMessages,
      updateProfile, uploadProfileImage, uploadCV,
      refresh: loadPublicData,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);

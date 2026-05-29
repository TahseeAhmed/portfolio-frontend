// Central API service — all backend calls go through here
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Token helpers ──────────────────────────────────────────
export const getToken = () => localStorage.getItem('portfolio_token');
export const setToken = (t) => localStorage.setItem('portfolio_token', t);
export const removeToken = () => localStorage.removeItem('portfolio_token');

// ─── Base fetch wrapper ─────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { ...options.headers };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// ─── Auth ───────────────────────────────────────────────────
export const authAPI = {
  login: (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  verify: () => request('/auth/verify'),
  seed: () => request('/auth/seed', { method: 'POST' }),
};

// ─── Skills ─────────────────────────────────────────────────
export const skillsAPI = {
  getAll: () => request('/skills'),
  create: (data) => request('/skills', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/skills/${id}`, { method: 'DELETE' }),
  seed: () => request('/skills/seed', { method: 'POST' }),
};

// ─── Projects ───────────────────────────────────────────────
export const projectsAPI = {
  getAll: (params = '') => request(`/projects${params}`),
  getOne: (id) => request(`/projects/${id}`),
  create: (formData) => request('/projects', { method: 'POST', body: formData }),
  update: (id, formData) => request(`/projects/${id}`, { method: 'PUT', body: formData }),
  delete: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
};

// ─── Messages ───────────────────────────────────────────────
export const messagesAPI = {
  send: (data) => request('/messages', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => request('/messages'),
  markRead: (id) => request(`/messages/${id}/read`, { method: 'PATCH' }),
  delete: (id) => request(`/messages/${id}`, { method: 'DELETE' }),
};

// ─── Profile ────────────────────────────────────────────────
export const profileAPI = {
  get: () => request('/profile'),
  update: (data) => request('/profile', { method: 'PUT', body: JSON.stringify(data) }),
  uploadImage: (formData) => request('/profile/image', { method: 'POST', body: formData }),
  uploadCV: (formData) => request('/profile/cv', { method: 'POST', body: formData }),
};

// Centralized API client for Diyazhu Makeovers

const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('diyazhu_token');
export const setAuthToken = (token) => {
  if (token) localStorage.setItem('diyazhu_token', token);
  else localStorage.removeItem('diyazhu_token');
};

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) headers['Content-Type'] = 'application/json';
  const token = getAuthToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export const api = {
  // Public
  getServices: async () => {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },
  getGallery: async (category = '') => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/gallery${query}`);
    return res.json();
  },
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },
  bookAppointment: async (appointmentData) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit appointment request');
    return data;
  },

  // Auth
  login: async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    return res.json();
  },
  changePassword: async (currentPassword, newPassword) => {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to change password');
    return data;
  },

  // Admin Stats
  getStats: async () => {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  // Admin Appointments
  getAdminAppointments: async (status = '', search = '') => {
    const params = new URLSearchParams();
    if (status && status !== 'All') params.append('status', status);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/appointments?${params.toString()}`, {
      headers: getHeaders()
    });
    return res.json();
  },
  updateAppointmentStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update status');
    return data;
  },
  updateAppointmentNotes: async (id, admin_notes) => {
    const res = await fetch(`${API_BASE}/appointments/${id}/notes`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ admin_notes })
    });
    return res.json();
  },
  deleteAppointment: async (id) => {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Admin Services
  getAdminServices: async () => {
    const res = await fetch(`${API_BASE}/services/admin`, {
      headers: getHeaders()
    });
    return res.json();
  },
  createService: async (serviceData) => {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(serviceData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create service');
    return data;
  },
  updateService: async (id, serviceData) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(serviceData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update service');
    return data;
  },
  toggleServiceStatus: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}/toggle`, {
      method: 'PATCH',
      headers: getHeaders()
    });
    return res.json();
  },
  deleteService: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Admin Gallery
  getAdminGallery: async () => {
    const res = await fetch(`${API_BASE}/gallery/admin`, {
      headers: getHeaders()
    });
    return res.json();
  },
  addGalleryItem: async (formData) => {
    // If formData is FormData instance, don't set Content-Type header so browser sets boundary
    const token = getAuthToken();
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers,
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add gallery item');
    return data;
  },
  deleteGalleryItem: async (id) => {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.json();
  },

  // Admin Settings
  updateSettings: async (settingsData) => {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settingsData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update settings');
    return data;
  }
};

// src/services/adminApi.ts
const API_BASE = import.meta.env.VITE_API_BASE;

// Get token from localStorage
function getToken() {
  return localStorage.getItem('adminToken');
}

async function adminFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok && data.token) {
    localStorage.setItem('adminToken', data.token);
    return true;
  }
  throw new Error(data.message || 'Login failed');
}

export async function adminLogout() {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
}

export async function fetchAllIssues(filter?: { status?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filter?.status) params.append('status', filter.status);
  if (filter?.search) params.append('search', filter.search);
  return adminFetch(`/admin/issues?${params.toString()}`);
}

export async function approveIssue(id: string) {
  return adminFetch(`/admin/issues/${id}/approve`, { method: 'PUT' });
}

export async function rejectIssue(id: string) {
  return adminFetch(`/admin/issues/${id}/reject`, { method: 'PUT' });
}
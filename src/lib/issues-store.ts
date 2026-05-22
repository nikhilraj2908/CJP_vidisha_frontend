// src/lib/issues-store.ts
import { useEffect, useState } from "react";

// Keep your existing types (they already match backend fields well)
export type IssueStatus = "Reported" | "Under Review" | "In Progress" | "Resolved";
export type IssueCategory =
  | "Roads" | "Water" | "Electricity" | "Garbage" | "Sewage"
  | "Streetlights" | "Corruption" | "Pollution" | "Jobs" | "Other";

export interface Issue {
  id: string;            // maps to _id from backend
  name: string;
  anonymous: boolean;
  locality: string;      // maps to areaLocality
  ward: string;          // maps to wardNo
  category: IssueCategory;
  title: string;
  description: string;
  image: string;         // full URL (backend URL + imageUrl)
  contact: string;       // maps to emailOrPhone
  supportCount: number;
  status: IssueStatus;
  approved: boolean;     // true if backend status === 'approved'
  createdAt: number;     // timestamp
}

// ========== API base URL from .env ==========
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

// Helper to map backend issue → frontend Issue
function mapBackendToFrontend(backend: any): Issue {
  const isApproved = backend.status === 'approved';
  // Map backend status to your display statuses (adjust as you like)
  let displayStatus: IssueStatus = "Reported";
  if (backend.status === 'approved') displayStatus = "In Progress";
  if (backend.status === 'rejected') displayStatus = "Reported"; // or keep as is

  return {
    id: backend._id,
    name: backend.anonymous ? '' : backend.name,
    anonymous: backend.anonymous,
    locality: backend.areaLocality,
    ward: backend.wardNo,
    category: backend.category as IssueCategory,
    title: backend.title,
    description: backend.description,
    image: backend.imageUrl ? `${API_BASE.replace('/api', '')}${backend.imageUrl}` : '',
    contact: backend.emailOrPhone,
    supportCount: backend.supportCount || 0,
    status: displayStatus,
    approved: isApproved,
    createdAt: new Date(backend.createdAt).getTime(),
  };
}

// ========== Public API calls ==========
async function fetchApprovedIssues(): Promise<Issue[]> {
  const res = await fetch(`${API_BASE}/issues?limit=100`); // get latest 100
  if (!res.ok) throw new Error('Failed to fetch issues');
  const data = await res.json();
  return data.issues.map(mapBackendToFrontend);
}

// ========== Store state & reactive hook ==========
let cachedIssues: Issue[] = [];
const listeners = new Set<() => void>();

async function refreshIssues() {
  try {
    const issues = await fetchApprovedIssues();
    cachedIssues = issues;
    listeners.forEach(l => l());
  } catch (err) {
    console.error('Failed to refresh issues:', err);
  }
}

// Initial load (non‑blocking)
if (typeof window !== 'undefined') {
  refreshIssues();
}

// Exported functions – same signatures as before
export function getIssues(): Issue[] {
  return cachedIssues;
}

export async function createIssue(input: Omit<Issue, "id" | "supportCount" | "status" | "approved" | "createdAt">) {
  const formData = new FormData();
  formData.append('areaLocality', input.locality);
  formData.append('category', input.category);
  formData.append('title', input.title);
  formData.append('description', input.description);
  formData.append('name', input.anonymous ? '' : input.name);
  formData.append('anonymous', String(input.anonymous));
  formData.append('wardNo', input.ward);
  formData.append('emailOrPhone', input.contact);
  // If input.image is a data URL, convert to Blob
  if (input.image && input.image.startsWith('data:')) {
    const blob = await (await fetch(input.image)).blob();
    formData.append('image', blob, 'upload.jpg');
  }

  const res = await fetch(`${API_BASE}/issues`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error(await res.text());
  const result = await res.json();
  // After submission, refresh list to show pending? (Pending issues won't appear until approved)
  await refreshIssues();
  return result.issue;
}

export function updateIssue(id: string, patch: Partial<Issue>) {
  // Not supported in public API; admin only. You can ignore or implement via admin endpoint.
  console.warn('updateIssue not implemented for public store');
}

export function deleteIssue(id: string) {
  console.warn('deleteIssue not implemented');
}

// Support / vote – we need a backend endpoint for this.
// If you haven't added it yet, this will fallback to localStorage (optional).
const VOTE_KEY = "cjp_issue_votes_v1";

export async function supportIssue(id: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  
  // Check if already supported (localStorage)
  const votes: string[] = JSON.parse(localStorage.getItem(VOTE_KEY) ?? "[]");
  if (votes.includes(id)) return false;
  
  // Try calling backend support endpoint (if exists)
  try {
    const res = await fetch(`${API_BASE}/issues/${id}/support`, { method: 'PUT' });
    if (!res.ok) throw new Error();
    await res.json();
  } catch {
    // If backend doesn't have support endpoint, just increment locally
    console.warn('Backend support endpoint not available – support count will not persist');
  }
  
  votes.push(id);
  localStorage.setItem(VOTE_KEY, JSON.stringify(votes));
  await refreshIssues(); // refresh to get updated supportCount from backend
  return true;
}

export function hasSupported(id: string): boolean {
  if (typeof window === "undefined") return false;
  const votes: string[] = JSON.parse(localStorage.getItem(VOTE_KEY) ?? "[]");
  return votes.includes(id);
}

// React hook that provides reactive updates
export function useIssues(): Issue[] {
  const [issues, setIssues] = useState<Issue[]>(cachedIssues);
  useEffect(() => {
    setIssues(cachedIssues);
    const handler = () => setIssues(cachedIssues);
    listeners.add(handler);
    // initial refresh
    refreshIssues().then(() => handler());
    return () => {
      listeners.delete(handler);
    };
  }, []);
  return issues;
}

// Keep existing constants
export const CATEGORIES: IssueCategory[] = [
  "Roads", "Water", "Electricity", "Garbage", "Sewage",
  "Streetlights", "Corruption", "Pollution", "Jobs", "Other",
];
export const STATUSES: IssueStatus[] = ["Reported", "Under Review", "In Progress", "Resolved"];
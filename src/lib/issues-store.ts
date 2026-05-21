import { useEffect, useState } from "react";

export type IssueStatus = "Reported" | "Under Review" | "In Progress" | "Resolved";
export type IssueCategory =
  | "Roads"
  | "Water"
  | "Electricity"
  | "Garbage"
  | "Sewage"
  | "Streetlights"
  | "Corruption"
  | "Pollution"
  | "Jobs"
  | "Other";

export interface Issue {
  id: string;
  name: string;
  anonymous: boolean;
  locality: string;
  ward: string;
  category: IssueCategory;
  title: string;
  description: string;
  image: string; // data URL
  contact: string;
  supportCount: number;
  status: IssueStatus;
  approved: boolean;
  createdAt: number;
}

const KEY = "cjp_issues_v1";
const VOTE_KEY = "cjp_issue_votes_v1";

const SEED: Issue[] = [
  {
    id: "seed-1",
    name: "",
    anonymous: true,
    locality: "Ward 12",
    ward: "12",
    category: "Sewage",
    title: "Sewage Spill in Ward 12",
    description: "Residents have been dealing with drainage overflow for two weeks.",
    image: "",
    contact: "",
    supportCount: 154,
    status: "Reported",
    approved: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "seed-2",
    name: "",
    anonymous: true,
    locality: "Bus Stand",
    ward: "",
    category: "Garbage",
    title: "Garbage pile near bus stand",
    description: "Daily waste collection has been irregular for over a month.",
    image: "",
    contact: "",
    supportCount: 89,
    status: "Under Review",
    approved: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "seed-3",
    name: "",
    anonymous: true,
    locality: "Patel Nagar",
    ward: "",
    category: "Streetlights",
    title: "Broken streetlights in Patel Nagar",
    description: "Entire lane goes pitch dark after 7pm. Unsafe for women & kids.",
    image: "",
    contact: "",
    supportCount: 212,
    status: "In Progress",
    approved: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "seed-4",
    name: "",
    anonymous: true,
    locality: "Kailaras Road",
    ward: "",
    category: "Water",
    title: "Water leakage near Kailaras Road",
    description: "Lakhs of litres wasted while colonies wait for tankers.",
    image: "",
    contact: "",
    supportCount: 67,
    status: "Reported",
    approved: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
];

const listeners = new Set<() => void>();

function read(): Issue[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw) as Issue[];
  } catch {
    return SEED;
  }
}

function write(next: Issue[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function getIssues(): Issue[] {
  return read();
}

export function createIssue(input: Omit<Issue, "id" | "supportCount" | "status" | "approved" | "createdAt">) {
  const issue: Issue = {
    ...input,
    id: `iss-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    supportCount: 0,
    status: "Reported",
    approved: false,
    createdAt: Date.now(),
  };
  write([issue, ...read()]);
  return issue;
}

export function updateIssue(id: string, patch: Partial<Issue>) {
  write(read().map((i) => (i.id === id ? { ...i, ...patch } : i)));
}

export function deleteIssue(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function supportIssue(id: string): boolean {
  if (typeof window === "undefined") return false;
  const votes: string[] = JSON.parse(localStorage.getItem(VOTE_KEY) ?? "[]");
  if (votes.includes(id)) return false;
  votes.push(id);
  localStorage.setItem(VOTE_KEY, JSON.stringify(votes));
  updateIssue(id, { supportCount: (read().find((i) => i.id === id)?.supportCount ?? 0) + 1 });
  return true;
}

export function hasSupported(id: string): boolean {
  if (typeof window === "undefined") return false;
  const votes: string[] = JSON.parse(localStorage.getItem(VOTE_KEY) ?? "[]");
  return votes.includes(id);
}

export function useIssues(): Issue[] {
  const [issues, setIssues] = useState<Issue[]>(() => (typeof window === "undefined" ? SEED : read()));
  useEffect(() => {
    setIssues(read());
    const sync = () => setIssues(read());
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return issues;
}

export const CATEGORIES: IssueCategory[] = [
  "Roads", "Water", "Electricity", "Garbage", "Sewage",
  "Streetlights", "Corruption", "Pollution", "Jobs", "Other",
];

export const STATUSES: IssueStatus[] = ["Reported", "Under Review", "In Progress", "Resolved"];

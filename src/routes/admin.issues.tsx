import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  STATUSES,
  deleteIssue,
  updateIssue,
  useIssues,
  type IssueCategory,
  type IssueStatus,
} from "@/lib/issues-store";

export const Route = createFileRoute("/admin/issues")({
  component: AdminIssues,
  head: () => ({
    meta: [{ title: "Admin · Issues — Cockroach Janta Party Vidisha" }],
  }),
});

function AdminIssues() {
  const all = useIssues();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
  const [cat, setCat] = useState<"" | IssueCategory>("");

  const list = useMemo(() => {
    return all
      .filter((i) => (filter === "pending" ? !i.approved : filter === "approved" ? i.approved : true))
      .filter((i) => (cat ? i.category === cat : true))
      .filter((i) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.locality.toLowerCase().includes(q) ||
          i.name.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [all, query, filter, cat]);

  const pending = all.filter((i) => !i.approved).length;
  const approved = all.filter((i) => i.approved).length;

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="stamp bg-ink text-paper border-paper">Admin Panel</span>
            <h1 className="font-display text-4xl md:text-5xl mt-3">Issues Moderation</h1>
            <p className="font-mono text-xs text-ink/70 mt-2 uppercase tracking-widest">
              {pending} pending · {approved} approved · {all.length} total
            </p>
          </div>
          <Link to="/" className="brutal-btn bg-paper text-ink text-sm">← Back to Site</Link>
        </div>

        <div className="brutal-card p-4 mb-6 grid md:grid-cols-3 gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, locality, name..."
            className="border-[3px] border-ink bg-paper px-3 py-2 font-mono text-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "pending" | "approved")}
            className="border-[3px] border-ink bg-paper px-3 py-2 font-mono text-sm uppercase"
          >
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="all">All</option>
          </select>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as "" | IssueCategory)}
            className="border-[3px] border-ink bg-paper px-3 py-2 font-mono text-sm uppercase"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {list.length === 0 ? (
          <div className="brutal-card p-10 text-center">
            <p className="font-display text-2xl">Nothing matches.</p>
            <p className="font-mono text-sm text-ink/70 mt-2">Try a different filter.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {list.map((i) => (
              <div key={i.id} className="brutal-card p-5">
                <div className="grid md:grid-cols-[160px_1fr] gap-5">
                  <div>
                    {i.image ? (
                      <img src={i.image} alt={i.title} className="w-full h-32 object-cover border-[3px] border-ink" />
                    ) : (
                      <div className="w-full h-32 grid place-content-center border-[3px] border-dashed border-ink font-mono text-[10px] uppercase tracking-widest text-ink/50">
                        No image
                      </div>
                    )}
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/60">
                      {new Date(i.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="stamp bg-alert text-paper border-paper">{i.category}</span>
                      <span className="stamp bg-ink text-paper border-paper">{i.status}</span>
                      {i.approved
                        ? <span className="stamp bg-green text-paper border-paper">Approved</span>
                        : <span className="stamp bg-saffron text-paper border-paper">Pending</span>}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl mt-3 leading-tight">{i.title}</h3>
                    <p className="text-sm text-ink/80 mt-1">{i.description}</p>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink/60">
                      📍 {i.locality}{i.ward && ` · Ward ${i.ward}`} · 👥 {i.supportCount} supporters
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-ink/60">
                      By: {i.anonymous ? "Anonymous" : i.name || "—"}
                      {i.contact && ` · ${i.contact}`}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                      {!i.approved && (
                        <button
                          onClick={() => updateIssue(i.id, { approved: true })}
                          className="brutal-btn bg-green text-paper text-xs px-3 py-2"
                        >
                          ✓ Approve
                        </button>
                      )}
                      {i.approved && (
                        <button
                          onClick={() => updateIssue(i.id, { approved: false })}
                          className="brutal-btn bg-saffron text-paper text-xs px-3 py-2"
                        >
                          Unpublish
                        </button>
                      )}
                      <select
                        value={i.status}
                        onChange={(e) => updateIssue(i.id, { status: e.target.value as IssueStatus })}
                        className="border-[3px] border-ink bg-paper px-2 py-2 font-mono text-xs uppercase"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button
                        onClick={() => {
                          if (confirm("Reject and delete this issue?")) deleteIssue(i.id);
                        }}
                        className="brutal-btn bg-alert text-paper text-xs px-3 py-2"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

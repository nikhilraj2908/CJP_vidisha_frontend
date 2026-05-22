import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchAllIssues, approveIssue, rejectIssue, adminLogout } from "@/services/adminApi";
import { CATEGORIES } from "@/lib/issues-store";

export const Route = createFileRoute("/admin/issues")({
  component: AdminIssues,
  beforeLoad: () => {
    // Redirect to login if no token
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Not authenticated');
    }
  },
  head: () => ({
    meta: [{ title: "Admin · Issues — Cockroach Janta Party Vidisha" }],
  }),
});

function AdminIssues() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");
  const [cat, setCat] = useState<string>("");
  const navigate = useNavigate();

  const loadIssues = async () => {
    try {
      setLoading(true);
      const status = filter === "all" ? undefined : filter;
      const data = await fetchAllIssues({ status, search: query || undefined });
      setIssues(data.issues || []);
    } catch (err: any) {
      if (err.message?.includes('401')) {
        navigate({ to: '/admin/login' });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, [filter, query, cat]); // reload when filters change

  const handleApprove = async (id: string) => {
    await approveIssue(id);
    loadIssues();
  };

  const handleReject = async (id: string) => {
    await rejectIssue(id);
    loadIssues();
  };

  const handleLogout = () => {
    adminLogout();
    navigate({ to: '/admin/login' });
  };

  const pendingCount = issues.filter((i: any) => i.status === 'pending').length;
  const approvedCount = issues.filter((i: any) => i.status === 'approved').length;

  // Apply frontend category filter (since backend doesn't filter by category yet)
  const filteredByCat = cat ? issues.filter((i: any) => i.category === cat) : issues;

  if (loading) return <div className="p-8">Loading issues...</div>;

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="stamp bg-ink text-paper border-paper">Admin Panel</span>
            <h1 className="font-display text-4xl md:text-5xl mt-3">Issues Moderation</h1>
            <p className="font-mono text-xs text-ink/70 mt-2 uppercase tracking-widest">
              {pendingCount} pending · {approvedCount} approved · {issues.length} total
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleLogout} className="brutal-btn bg-alert text-paper text-sm">Logout</button>
            <Link to="/" className="brutal-btn bg-paper text-ink text-sm">← Back to Site</Link>
          </div>
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
            onChange={(e) => setFilter(e.target.value as any)}
            className="border-[3px] border-ink bg-paper px-3 py-2 font-mono text-sm uppercase"
          >
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="all">All</option>
          </select>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="border-[3px] border-ink bg-paper px-3 py-2 font-mono text-sm uppercase"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {filteredByCat.length === 0 ? (
          <div className="brutal-card p-10 text-center">
            <p className="font-display text-2xl">Nothing matches.</p>
            <p className="font-mono text-sm text-ink/70 mt-2">Try a different filter.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredByCat.map((issue: any) => (
              <div key={issue._id} className="brutal-card p-5">
                <div className="grid md:grid-cols-[160px_1fr] gap-5">
                  <div>
                    {issue.imageUrl ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE?.replace('/api', '')}${issue.imageUrl}`}
                        alt={issue.title}
                        className="w-full h-32 object-cover border-[3px] border-ink"
                      />
                    ) : (
                      <div className="w-full h-32 grid place-content-center border-[3px] border-dashed border-ink font-mono text-[10px] uppercase tracking-widest text-ink/50">
                        No image
                      </div>
                    )}
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/60">
                      {new Date(issue.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="stamp bg-alert text-paper border-paper">{issue.category}</span>
                      <span className="stamp bg-ink text-paper border-paper">
                        {issue.status === 'approved' ? 'Approved' : issue.status === 'rejected' ? 'Rejected' : 'Pending'}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl mt-3 leading-tight">{issue.title}</h3>
                    <p className="text-sm text-ink/80 mt-1">{issue.description}</p>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink/60">
                      📍 {issue.areaLocality}{issue.wardNo && ` · Ward ${issue.wardNo}`} · 👥 {issue.supportCount || 0} supporters
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-ink/60">
                      By: {issue.anonymous ? "Anonymous" : issue.name || "—"}
                      {issue.emailOrPhone && ` · ${issue.emailOrPhone}`}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                      {issue.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(issue._id)}
                            className="brutal-btn bg-green text-paper text-xs px-3 py-2"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleReject(issue._id)}
                            className="brutal-btn bg-alert text-paper text-xs px-3 py-2"
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}
                      {issue.status === 'approved' && (
                        <button
                          onClick={() => handleReject(issue._id)}
                          className="brutal-btn bg-saffron text-paper text-xs px-3 py-2"
                        >
                          Unpublish
                        </button>
                      )}
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
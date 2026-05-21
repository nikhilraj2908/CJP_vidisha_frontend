import { useState } from "react";
import { Reveal, SectionHeader } from "./Section";
import { IssueFormModal } from "./IssueFormModal";
import { hasSupported, supportIssue, useIssues, type Issue, type IssueStatus } from "@/lib/issues-store";

const STATUS_STYLES: Record<IssueStatus, string> = {
  "Reported": "bg-alert text-paper border-paper",
  "Under Review": "bg-saffron text-paper border-paper",
  "In Progress": "bg-ink text-paper border-paper",
  "Resolved": "bg-green text-paper border-paper",
};

export function Rants() {
  const [open, setOpen] = useState(false);
  const issues = useIssues()
    .filter((i) => i.approved)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <section id="rants" className="px-4 py-20 border-b-[3px] border-ink">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader kicker="Live Feed" title="What's Bugging Vidisha?" />
        </Reveal>

        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-ink/70">
              {issues.length} approved issue{issues.length === 1 ? "" : "s"} · sorted newest first
            </p>
            <button onClick={() => setOpen(true)} className="brutal-btn bg-saffron text-paper text-sm px-5 py-3">
              + Add Your Issue
            </button>
          </div>
        </Reveal>

        {issues.length === 0 ? (
          <Reveal>
            <div className="brutal-card p-10 text-center">
              <p className="font-display text-2xl">No approved issues yet.</p>
              <p className="font-mono text-sm text-ink/70 mt-2">Be the first to raise a concern from your area.</p>
              <button onClick={() => setOpen(true)} className="brutal-btn bg-alert text-paper mt-6 text-sm">
                Raise the first issue
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((i) => <IssueCard key={i.id} issue={i} />)}
          </div>
        )}
      </div>

      <IssueFormModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function IssueCard({ issue }: { issue: Issue }) {
  const [count, setCount] = useState(issue.supportCount);
  const [supported, setSupported] = useState(() => hasSupported(issue.id));

  function onSupport() {
    if (supported) return;
    if (supportIssue(issue.id)) {
      setSupported(true);
      setCount(count + 1);
    }
  }

  function onShare() {
    const url = typeof window !== "undefined" ? `${window.location.origin}/#rants` : "";
    const text = `${issue.title} — ${issue.locality} · Cockroach Janta Party Vidisha`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: issue.title, text, url }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("Link copied!");
    }
  }

  return (
    <Reveal>
      <div className="brutal-card p-6 h-full flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="stamp bg-alert text-paper border-paper">{issue.category}</span>
          <span className={`stamp ${STATUS_STYLES[issue.status]}`}>{issue.status}</span>
        </div>

        {issue.image && (
          <img src={issue.image} alt={issue.title} className="mt-4 h-40 w-full object-cover border-[3px] border-ink" />
        )}

        <h3 className="font-display text-xl md:text-2xl mt-4 leading-tight">{issue.title}</h3>
        <p className="mt-2 text-sm text-ink/80 flex-1">{issue.description}</p>

        <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink/60">
          📍 {issue.locality}{issue.ward && ` · Ward ${issue.ward}`}
        </div>

        <div className="mt-5 pt-4 border-t-2 border-dashed border-ink flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink/60">Bheed Counter</div>
            <div className="font-display text-2xl text-saffron">
              {count} <span className="text-xs font-mono text-ink/70">Supporters</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSupport}
              disabled={supported}
              className={`brutal-btn text-xs px-3 py-2 ${supported ? "bg-green text-paper" : "bg-ink text-paper"}`}
            >
              {supported ? "✓ Supported" : "👍 Support"}
            </button>
            <button onClick={onShare} className="brutal-btn bg-paper text-ink text-xs px-3 py-2">
              📤 Share
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

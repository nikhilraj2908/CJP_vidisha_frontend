import rallyImage from "@/assets/cockroach-rally.jpg";

const STATS = [
  { n: "5", l: "Core Demands" },
  { n: "0", l: "Corporate Sponsors" },
  { n: "∞", l: "Patience" },
  { n: "1", l: "Founder (No PA)" },
];

export function Hero() {
  return (
    <section id="home" className="relative px-4 py-16 md:py-24 border-b-[3px] border-ink overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <span className="stamp bg-paper">Est. 2026 · Vidisha, M.P.</span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mt-4">
            Voice of <span className="text-saffron">Vidisha's</span> Lazy & Unemployed
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-2xl font-medium">
            A political party for the people the system forgot to count.
          </p>
          <p className="mt-4 text-base md:text-lg max-w-2xl text-ink/80 border-l-4 border-alert pl-4 italic">
            "We don't eat promises. We demand accountability, jobs, and a voice for every young citizen."
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <button onClick={() => alert("Feature coming soon!")} className="brutal-btn bg-ink text-paper">
              Join the Movement →
            </button>
            <button onClick={() => alert("Feature coming soon!")} className="brutal-btn bg-alert text-paper">
              File a Grievance →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-2xl">
            {STATS.map((s) => (
              <div key={s.l} className="brutal-card p-4 text-center">
                <div className="font-display text-3xl md:text-4xl text-saffron">{s.n}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="brutal-card p-4 md:p-5 bg-paper rotate-[-2deg]" style={{ boxShadow: "12px 12px 0 var(--ink)" }}>
            <div className="border-[3px] border-ink bg-saffron">
              <img
                src={rallyImage}
                alt="Cockroach politician rallying young citizens of Vidisha"
                width={1024}
                height={1280}
                className="block w-full h-auto"
              />
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
              <span>Serial #001 · Vidisha Rally</span>
              <span className="text-alert">Paste anywhere</span>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 stamp bg-alert text-paper border-paper rotate-12">
            For Public · Free
          </div>
        </div>

      </div>
    </section>
  );
}

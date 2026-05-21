import { Reveal, SectionHeader } from "./Section";

const ITEMS = [
  "Tired of waiting. Sick of excuses.",
  "Physically lazy but politically active.",
  "Chronically online and updated with every issue.",
  "Can rant professionally.",
  "Wants clean surroundings.",
  "Believes garbage belongs in bins and corruption belongs in history books.",
];

export function Membership() {
  return (
    <section id="join" className="px-4 py-20 border-b-[3px] border-ink bg-saffron/10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionHeader kicker="Form A-1 · Free" title="Are you eligible to join?" />
        </Reveal>
        <Reveal>
          <div className="brutal-card p-8 md:p-10 bg-paper">
            <ul className="grid md:grid-cols-2 gap-4">
              {ITEMS.map((it) => (
                <li key={it} className="flex items-start gap-3 text-lg">
                  <span className="font-display text-2xl text-green leading-none">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={() => alert("Feature coming soon!")} className="brutal-btn bg-ink text-paper text-base">
                Join the Party (It's Free)
              </button>
              <span className="font-mono text-xs uppercase tracking-widest text-ink/60">No fees · No forms · No drama</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

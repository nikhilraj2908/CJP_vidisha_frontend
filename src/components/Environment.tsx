import { Reveal, SectionHeader } from "./Section";

const CARDS = [
  { t: "Clean Air", d: "Reduce pollution and improve public awareness.", icon: "💨", bg: "bg-paper" },
  { t: "Clean Water", d: "Safe drinking water and regular water-quality checks.", icon: "💧", bg: "bg-paper" },
  { t: "Clean Environment", d: "Increase green spaces and improve city sanitation.", icon: "🌳", bg: "bg-paper" },
  { t: "Remove Dirt Everywhere", d: "Garbage, corruption, broken systems, and neglect — everything dirty has to go.", icon: "🧹", bg: "bg-paper" },
];

export function Environment() {
  return (
    <section id="environment" className="px-4 py-20 border-b-[3px] border-ink bg-green/5">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader kicker="Clean Vidisha Movement" title="Eat Dirt. Clean Vidisha." />
          <p className="text-lg md:text-xl max-w-3xl -mt-4 mb-12">
            Just like cockroaches survive anywhere and eat waste, our party members remove every kind of dirt from society.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {CARDS.map((c, i) => (
            <Reveal key={c.t}>
              <div className={`brutal-card p-8 ${c.bg} h-full`}>
                <div className="flex items-start justify-between">
                  <div className="text-5xl">{c.icon}</div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-saffron">#{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl mt-5">{c.t}</h3>
                <p className="mt-3 text-base md:text-lg text-ink/80">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

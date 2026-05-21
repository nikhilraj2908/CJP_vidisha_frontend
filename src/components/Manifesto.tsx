import { Reveal, SectionHeader } from "./Section";

const POINTS = [
  "Accountability for municipal funds — no more ghost projects.",
  "Free high-speed WiFi in all Vidisha chowks and parks.",
  "Bi-weekly cleaning of Sironj Nadi with public reports.",
  "Mandatory ethics and anti-corruption training for corporators.",
  "Annual public Vidisha Development Summit.",
  "City-wide clean air and clean water monitoring systems.",
  "Weekly public cleanliness drives.",
  "Public reporting dashboard for garbage and civic issues.",
  "Clean air monitoring stations across all Vidisha wards.",
  "Quarterly public drinking water quality reports.",
  "Clean environment initiatives in parks, chowks, and public spaces.",
  "1 Ghar = 1 Ped — every household plants and adopts one tree.",
  "Citizen issue tracking dashboard with live status updates.",
  "Public accountability hearings for environmental concerns.",
];

export function Manifesto() {
  return (
    <section id="manifesto" className="px-4 py-20 border-b-[3px] border-ink">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader kicker="Document 01" title="The Manifesto" />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POINTS.map((p, i) => (
            <Reveal key={i}>
              <div className="brutal-card p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-4xl text-saffron">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest">Demand</span>
                </div>
                <p className="text-base font-medium leading-snug">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

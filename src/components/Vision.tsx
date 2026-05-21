import { Reveal } from "./Section";
import podiumImage from "@/assets/cockroach-podium.jpg";
import VisionRoaches from "./VisionRoaches";
export function Vision() {
  return (
   <section className="relative px-4 py-20 border-b-[3px] border-ink bg-[#f5f1e8]">
     <VisionRoaches />
      <div className="max-w-7xl mx-auto">

        {/* HERO TEXT SECTION */}
        

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">

          {/* LEFT CARD */}
          <div className="space-y-6">
            <Reveal>
          <div className="mb-5 max-w-5xl">
            <p className="font-mono uppercase tracking-[0.4em] text-alert text-sm mb-6">
              Chapter One
            </p>

            <h1 className="leading-[0.9]">
              <span className="block font-black text-[clamp(3rem,8vw,5rem)] text-ink">
                Our
              </span>

              <span className="block font-black text-[clamp(3rem,8vw,6rem)] text-ink">
                Movement's
              </span>

              <span className="block italic font-serif text-[clamp(2rem,6vw,6rem)] text-[#1c6b3a]">
                Vision.
              </span>
            </h1>

            <p className="mt-4 text-lg md:text-2xl leading-relaxed text-ink max-w-4xl">
              We are not here to create another boring movement full of
              speeches and empty promises. We are here for the people who were
              called lazy, distracted, chronically online —
              <span className="font-bold">
                {" "}and somehow still expected to fix everything.
              </span>
            </p>
          </div>
        </Reveal>
            <Reveal>
              <div className="brutal-card p-8 bg-paper">
                <p className="text-lg md:text-xl leading-relaxed">
                  "Build a party for the young people who keep getting called
                  lazy, chronically online, and —
                  <span className="text-alert font-bold">
                    {" "}most recently — cockroaches.
                  </span>"
                </p>

                <p className="mt-5 font-display text-2xl md:text-3xl leading-tight">
                  That's it. That's the mission.
                </p>

                <p className="mt-3 font-mono text-sm text-ink/70">
                  // The rest is satire.
                </p>
              </div>
            </Reveal>
          </div>

          {/* POSTER */}
          <Reveal>
            <div className="relative lg:sticky lg:top-28">

              <div
                className="brutal-card p-4 md:p-5 bg-paper rotate-[2deg]"
                style={{
                  boxShadow: "12px 12px 0 var(--ink)",
                }}
              >
                <div className="border-[3px] border-ink bg-alert">
                  <img
                    src={podiumImage}
                    alt="Cockroach politician giving a speech"
                    className="block w-full h-auto"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                  <span>Serial #002 · Mission Rally</span>
                  <span className="text-alert">
                    Vote Cockroach
                  </span>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 stamp bg-ink text-paper border-paper -rotate-6">
                Official Poster
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
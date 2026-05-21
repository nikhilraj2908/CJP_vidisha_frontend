import { useState } from "react";
import { CockroachLogo } from "./CockroachLogo";
import { Reveal, SectionHeader } from "./Section";

export function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <section id="connect" className="px-4 py-20 bg-ink text-paper">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-10">
            <span className="stamp border-paper text-paper">Talk to a citizen</span>
            <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[0.95]">Connect with the Movement</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">
          <Reveal>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Feature coming soon!"); }}
              className="border-[3px] border-paper p-6 md:p-8 bg-ink"
              style={{ boxShadow: "8px 8px 0 var(--saffron)" }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="bg-paper text-ink border-[3px] border-paper px-4 py-3 font-medium focus:outline-none focus:border-saffron"
                />
                <input
                  required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="bg-paper text-ink border-[3px] border-paper px-4 py-3 font-medium focus:outline-none focus:border-saffron"
                />
              </div>
              <textarea
                required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your rant, idea, or complaint..."
                className="mt-4 w-full bg-paper text-ink border-[3px] border-paper px-4 py-3 font-medium focus:outline-none focus:border-saffron"
              />
              <button type="submit" className="brutal-btn bg-saffron text-paper mt-5 border-paper" style={{ boxShadow: "6px 6px 0 var(--paper)" }}>
                Send Message →
              </button>
            </form>
          </Reveal>
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CockroachLogo className="h-12 w-12" />
                <div>
                  <div className="font-display text-xl">Cockroach Janta Party</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-saffron">Vidisha Chapter</div>
                </div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest opacity-70">Email</div>
                <a href="mailto:hello@cockroachvidisha.org" className="font-display text-xl hover:text-saffron break-all">
                  hello@cockroachvidisha.org
                </a>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest opacity-70 mb-2">Follow the noise</div>
                <div className="flex gap-3 flex-wrap">
                  {["Instagram", "Twitter", "Facebook"].map((s) => (
                    <a key={s} href="#" onClick={(e) => { e.preventDefault(); alert("Feature coming soon!"); }}
                      className="brutal-btn bg-paper text-ink text-xs">{s}</a>
                  ))}
                </div>
              </div>
              <div className="border-t-2 border-paper/30 pt-5 font-mono text-xs uppercase tracking-widest opacity-70">
                © Cockroach Janta Party Vidisha<br/>For citizens, by citizens.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

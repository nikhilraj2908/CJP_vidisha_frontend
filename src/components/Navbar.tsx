import { useEffect, useState } from "react";
import { CockroachLogo } from "./CockroachLogo";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#join", label: "Join" },
  { href: "#rants", label: "Rants" },
  { href: "#environment", label: "Environment" },
  { href: "#connect", label: "Connect" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className="sticky top-0 z-50 border-b-[3px] border-ink backdrop-blur-md transition-all"
      style={{ backgroundColor: scrolled ? "rgba(244,235,215,0.85)" : "rgba(244,235,215,0.65)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-3">
          <CockroachLogo className="h-10 w-10" />
          <div className="leading-tight">
            <div className="font-display text-base sm:text-lg">Cockroach Janta Party</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-saffron">Vidisha Chapter</div>
          </div>
        </a>
        <ul className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="font-condensed uppercase tracking-wider text-sm hover:text-saffron transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Feature coming soon!")}
            className="hidden sm:inline-flex brutal-btn bg-saffron text-paper text-xs"
          >
            Join Us
          </button>
          <button className="lg:hidden brutal-btn bg-paper text-ink text-xs px-3 py-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <ul className="lg:hidden border-t-[3px] border-ink bg-paper px-4 py-4 space-y-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block font-condensed uppercase tracking-wider">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button onClick={() => alert("Feature coming soon!")} className="brutal-btn bg-saffron text-paper text-xs w-full">
              Join Us
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

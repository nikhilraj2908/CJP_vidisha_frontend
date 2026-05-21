import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ animation: visible ? "fade-up 0.7s ease-out both" : "none", opacity: visible ? 1 : 0 }}>
      {children}
    </div>
  );
}

export function SectionHeader({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-10">
      {kicker && <span className="stamp bg-paper">{kicker}</span>}
      <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[0.95]">{title}</h2>
    </div>
  );
}

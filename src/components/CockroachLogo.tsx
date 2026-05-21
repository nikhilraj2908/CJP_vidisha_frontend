export function CockroachLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="34" rx="18" ry="22" fill="var(--ink)" />
      <ellipse cx="32" cy="30" rx="14" ry="10" fill="var(--saffron)" />
      <path d="M32 12 L26 2 M32 12 L38 2" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="28" cy="12" r="2" fill="var(--ink)" />
      <circle cx="36" cy="12" r="2" fill="var(--ink)" />
      <path d="M14 28 L2 22 M14 36 L0 38 M14 44 L4 52" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 28 L62 22 M50 36 L64 38 M50 44 L60 52" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="18" x2="32" y2="54" stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  );
}

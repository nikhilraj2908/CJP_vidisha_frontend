const SLOGANS = [
  "Vidisha ka pukar, ab hoga sudhaar",
  "Sadak toot gayi? Complaint kar bhai",
  "Hum corruption nahi, kachra khate hain",
  "Clean Air, Clean Water, Clean Vidisha",
  "Cockroach Janta Party: Dirt se direct takkar",
];

export function Ticker() {
  const items = [...SLOGANS, ...SLOGANS, ...SLOGANS, ...SLOGANS];
  return (
    <div className="bg-ink text-paper border-b-[3px] border-ink overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-ticker" style={{ width: "max-content" }}>
        {items.map((s, i) => (
          <span key={i} className="px-8 font-condensed uppercase tracking-widest text-sm flex items-center gap-8">
            <span className="text-saffron">★</span> {s}
          </span>
        ))}
      </div>
    </div>
  );
}

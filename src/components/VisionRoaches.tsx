import { useEffect, useRef, useState } from "react";

type Roach = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  duration: number;
};

export default function VisionRoaches() {
  const [roaches, setRoaches] = useState<Roach[]>([]);
  const [played, setPlayed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = containerRef.current;

    if (!section || played) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;

        setPlayed(true);

        const generated = Array.from(
          {
            // fewer bugs
            length: window.innerWidth < 768 ? 6 : 8,
          },
          (_, i): Roach => ({
            id: i,

            x: Math.random() * window.innerWidth,

            y: Math.random() * 300,

            dx: (Math.random() - 0.5) * 500,

            dy: (Math.random() - 0.5) * 200,

            duration: 2 + Math.random() * 1.5,
          })
        );

        setRoaches(generated);

        // stay visible for some time
        setTimeout(() => {
          setRoaches([]);
        }, 5000);

        observer.disconnect();
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [played]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-50"
    >
      <style>{`

      .vision-roach{
        position:absolute;

        animation:
        visionMove var(--duration) ease-out forwards,
        fadeOut 5s forwards;
      }

      .vision-roach img{

        /* Bigger size */

        width:100px;
        height:100px;

        opacity:0.9;
      }

      @media(max-width:768px){

      .vision-roach img{

        width:65px;
        height:65px;

      }

      }

      @keyframes visionMove{

      from{

      transform:
      translate(0,0)
      rotate(0deg);

      }

      to{

      transform:
      translate(var(--dx),var(--dy))
      rotate(20deg);

      }

      }

      @keyframes fadeOut{

      0%,80%{
      opacity:1;
      }

      100%{
      opacity:0;
      }

      }

      `}</style>

      {roaches.map((roach) => (
        <div
          key={roach.id}
          className="vision-roach"
          style={
            {
              left: `${roach.x}px`,
              top: `${roach.y}px`,
              "--dx": `${roach.dx}px`,
              "--dy": `${roach.dy}px`,
              "--duration": `${roach.duration}s`,
            } as React.CSSProperties
          }
        >
          <img src="/cockroach.gif" alt="" />
        </div>
      ))}
    </div>
  );
}
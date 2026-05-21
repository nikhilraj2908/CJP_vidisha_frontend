import { useEffect, useState } from "react";

type Roach = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  scale: number;
  rotate: number;
  duration: number;
};

export default function CockroachSwarm() {
  const [mounted, setMounted] = useState(false);
  const [roaches, setRoaches] = useState<Roach[]>([]);

  useEffect(() => {
    setMounted(true);

    const shown = sessionStorage.getItem("roachIntro");

    if (shown) return;

    sessionStorage.setItem("roachIntro", "true");

    const count = window.innerWidth < 768 ? 10 : 15;

    const generated: Roach[] = Array.from(
      { length: count },
      (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 700,
        dy: (Math.random() - 0.5) * 700,
        scale: 0.5 + Math.random(),
        rotate: Math.random() * 360,
        duration: 1 + Math.random() * 2,
      })
    );

    setRoaches(generated);

    const timer = setTimeout(() => {
      setRoaches([]);
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`

      .roach-layer{
        position:fixed;
        inset:0;
        overflow:hidden;
        pointer-events:none;
        z-index:9999;
      }

      .roach{
        position:absolute;
        animation:
          run var(--duration) linear forwards,
          fadeOut 3s forwards;
      }

      .roach img{
        width:60px;
        height:60px;
      }

      @media(max-width:768px){
        .roach img{
          width:35px;
          height:35px;
        }
      }

      @keyframes run{
        from{
          transform:
          translate(0,0)
          scale(var(--scale))
          rotate(0deg);
        }

        to{
          transform:
          translate(var(--dx),var(--dy))
          scale(var(--scale))
          rotate(var(--rotate));
        }
      }

      @keyframes fadeOut{
        0%,70%{
          opacity:1;
        }

        100%{
          opacity:0;
        }
      }

      `}</style>

      <div className="roach-layer">
        {roaches.map((roach) => (
          <div
            key={roach.id}
            className="roach"
            style={
              {
                left: `${roach.x}px`,
                top: `${roach.y}px`,
                "--dx": `${roach.dx}px`,
                "--dy": `${roach.dy}px`,
                "--scale": roach.scale,
                "--rotate": `${roach.rotate}deg`,
                "--duration": `${roach.duration}s`,
              } as React.CSSProperties
            }
          >
            <img
              src="/cockroach.gif"
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}
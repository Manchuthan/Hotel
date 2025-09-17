import { useEffect, useRef, useState } from "react";
import r1 from "../assets/resturant/r1.jpg";
import r2 from "../assets/resturant/r2.jpg";
import r3 from "../assets/resturant/r3.jpg";
import r4 from "../assets/resturant/r4.jpg";
import r5 from "../assets/resturant/r5.jpg";
import r6 from "../assets/resturant/r6.jpg";
import r7 from "../assets/resturant/r7.jpg";
import r8 from "../assets/resturant/r8.jpg";
import r9 from "../assets/resturant/r9.jpg";
import r10 from "../assets/resturant/r10.jpg";
import r11 from "../assets/resturant/r11.jpg";
import r12 from "../assets/resturant/r12.jpg";
import r13 from "../assets/resturant/r13.jpg";
import r14 from "../assets/resturant/r14.jpeg";

const OUTLETS = [
  {
    title: "Saffron",
    subtitle: "International & Local Cuisines",
    image: r1,
  },
  {
    title: "Olives",
    subtitle: "International & Local Cuisines",
    image: r2,
  },
  {
    title: "Te'Lounge",
    subtitle: "Coffee Shop & Lobby Bar",
    image: r4,
  },
  {
    title: "Beach Club Bar",
    subtitle: "A La Carte/ Sea Food",
    image: r5,
  },
    {
    title: "Sun Deck",
    subtitle: "Pool Bar",
    image: r6,
  },
  {
    title: "555 One",
    subtitle: "Night Club Bar",
    image: r11,
  },
  {
    title: "Shark Bite",
    subtitle: "Sea Food with Live Cooking",
    image: r12,
  },
  {
    title: "Signature Lounge",
    subtitle: "VIP Lounge",
    image: r10,
  },
    {
    title: "Infinity",
    subtitle: "Infinity Bar",
    image: r7,
  },
  {
    title: "Sky Lounge",
    subtitle: "A La Carte with Premium Beverages",
    image: r8,
  },
  {
    title: "Baby View",
    subtitle: "Open Bar",
    image:r9,
  },
  {
    title: "Dutch Fort",
    subtitle: "Shisha Lounge",
    image: r13,
  },
    {
    title: "Tiki Bar",
    subtitle: "A La Carte with Beverages",
    image: r9,
  },
  {
    title: "Pizzarea",
    subtitle: "A La Carte",
    image: r14,
  },

];

import { useParallaxTilt } from "@/hooks/use-parallax";

function TiltCard({ title, subtitle, image, speed = 0.15 }: { title: string; subtitle: string; image: string; speed?: number }) {
  const { ref } = useParallaxTilt({ speed });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = () => {};
  const onLeave = () => {};

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden rounded-2xl ring-1 ring-border shadow-lg bg-card transition-all duration-500 will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative h-40">
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <p className="font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">{title}</p>
        <p className="text-xs opacity-90">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Highlights() {
  return (
    <section className="mt-6 px-4">
      <h2 className="font-serif text-lg mb-2">Outlets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {OUTLETS.map((h, i) => (
          <TiltCard key={h.title} {...h} speed={[0.12, 0.18, 0.1, 0.16][i % 4]} />
        ))}
      </div>
    </section>
  );
}

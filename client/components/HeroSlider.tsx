import { useEffect, useRef, useState } from "react";
import s1 from "../assets/hero/h1.jpg";
import s2 from "../assets/hero/h2.jpg";

const HERO_IMAGES = [
  "https://cdn.builder.io/api/v1/image/assets%2F7ae52d6bd8c7493b8e62f39b6ed33048%2Fc940fea4ad2540429f36189c8fa78330?format=webp&width=800",
  s1,
  s2
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const SLIDE_COUNT = HERO_IMAGES.length + 1; // images + video

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDE_COUNT), 6000);
    return () => clearInterval(id);
  }, [SLIDE_COUNT]);

  useEffect(() => {
    if (index === HERO_IMAGES.length) {
      videoRef.current?.play?.();
    } else {
      videoRef.current?.pause?.();
    }
  }, [index]);

  return (
    <section className="relative overflow-hidden">
      <div
        className="relative h-72 w-full"
        aria-roledescription="carousel"
        aria-label="Resort highlights"
      >
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {/* Image slides */}
          {HERO_IMAGES.map((img, idx) => (
            <div key={idx} className="relative min-w-full">
              <div
                className="h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 75%), 
                                   radial-gradient(120% 70% at 50% 20%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 60%), 
                                   url('${img}')`,
                }}
              />
              {/* You can add text overlays only for the first image if you want */}
              {idx === 0 && (
                <>
                  <div className="absolute top-3 left-3 bg-white/15 backdrop-blur-md border border-white/30 text-[11px] text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[hsl(var(--araliya-gold))]" aria-hidden="true">
                      <path d="M7 7l5 5 5-5 2 8H5l2-8z" />
                    </svg>
                    No. 1 Best Value in Sri Lanka
                  </div>
                  <div className="absolute inset-0 flex items-end p-5 pb-8">
                    <div className="max-w-[92%] text-white bg-white/12 backdrop-blur-md border border-white/25 rounded-2xl shadow-2xl px-4 py-3">
                      <p className="uppercase tracking-[0.3em] text-[10px] opacity-95">Where Ocean Meets Elegance</p>
                      <h1 className="mt-1 text-3xl leading-tight font-display">Luxury by the Shore</h1>
                      <span className="block mt-1 h-0.5 w-14 rounded-full bg-[hsl(var(--araliya-gold))]" />
                      <p className="mt-2 text-sm opacity-95 max-w-[30ch]">Experience Sri Lanka’s coastal gem at Araliya Beach Resort & Spa.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Video slide */}
          <div className="relative min-w-full">
            <video
              ref={videoRef}
              src="https://videos.pexels.com/video-files/33682024/14319379_360_640_60fps.mp4"
              className="w-full h-72 object-cover"
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 right-3 flex gap-1.5">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-4 rounded-full transition ${
              index === i ? "bg-[hsl(var(--araliya-gold))]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

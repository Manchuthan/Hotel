import { useEffect, useRef } from "react";

export function useParallaxTilt(options?: { speed?: number; maxTilt?: number }) {
  const { speed = 0.15, maxTilt = 10 } = options || {};
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useRef(0);
  const ry = useRef(0);
  const ty = useRef(0);
  const raf = useRef<number | null>(null);
  const active = useRef(false);

  function update(now?: number) {
    if (raf.current != null) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const tz = Math.max(-40, Math.min(40, -ty.current * 0.4));
      const scale = 1 + Math.min(0.04, Math.abs(tz) / 1000);
      el.style.willChange = "transform";
      el.style.transform = `perspective(1000px) translate3d(0, ${ty.current.toFixed(2)}px, ${tz.toFixed(2)}px) rotateX(${rx.current.toFixed(2)}deg) rotateY(${ry.current.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    });
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (!active.current) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const deltaFromViewportCenter = center - window.innerHeight / 2;
      ty.current = -deltaFromViewportCenter * speed * 0.12; // subtle float
      update();
    };

    const onEnter = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ry.current = x * maxTilt;
      rx.current = -y * maxTilt;
      update();
    };

    const onMove = (e: MouseEvent) => onEnter(e);

    const onLeave = () => {
      rx.current = 0;
      ry.current = 0;
      update();
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          active.current = en.isIntersecting;
          if (active.current) onScroll();
        });
      },
      { threshold: 0.1 },
    );
    obs.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    // initial
    onScroll();

    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll as any);
      el.removeEventListener("mousemove", onMove as any);
      el.removeEventListener("mouseenter", onEnter as any);
      el.removeEventListener("mouseleave", onLeave as any);
      obs.disconnect();
    };
  }, [speed, maxTilt]);

  return { ref } as const;
}

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
export { Reveal, MaskedLines } from "../lib/animations";

// Animated number counter that runs when scrolled into view.
export function Counter({ to, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Section overline + serif heading.
export function SectionHeading({ no, label, title, className = "", light }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 mb-6">
        {no && <span className="font-sans text-sm font-semibold text-brand tracking-[0.2em]">{no}</span>}
        <span className="h-px w-10 bg-brand" />
        <span className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
      </div>
      <h2 className={`font-serif text-4xl md:text-6xl tracking-tight leading-[0.95] ${light ? "" : ""}`}>
        {title}
      </h2>
    </div>
  );
}

// Magnetic button / link with cursor-follow pull.
export function Magnetic({ children, className = "", strength = 0.35, as = "button", ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const M = as === "a" ? motion.a : motion.button;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <M
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}

// Editorial marquee ribbon (CSS animated, duplicated for seamless loop).
export function Marquee({ items, slow, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      <div className={`marquee-track ${slow ? "marquee-slow" : ""}`}>
        {row.map((it, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-serif text-5xl md:text-7xl tracking-tight text-foreground/80 px-8">{it}</span>
            <span className="inline-block h-3 w-3 rotate-45 bg-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}

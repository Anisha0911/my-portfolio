import { useEffect, useState } from "react";
import { motion, useSpring, useScroll, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Blending circle cursor that grows over interactive elements.
export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useSpring(0, { stiffness: 500, damping: 40, mass: 0.5 });
  const y = useSpring(0, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("cursor-hidden");
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target;
      setHovering(!!(t.closest && t.closest("a,button,[data-cursor='hover'],input,textarea")));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full bg-white"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 48 : 12, height: hovering ? 48 : 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}

// Top scroll-progress bar.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-brand origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

// Back-to-top button.
export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          data-testid="scroll-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="fixed bottom-8 right-8 z-[60] h-12 w-12 flex items-center justify-center bg-brand text-white shadow-lg hover:bg-brand-hover transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// On-load intro loader.
export function PageLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-background flex items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block font-serif text-5xl md:text-7xl tracking-tight"
            >
              Anisha<span className="text-brand">.</span>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

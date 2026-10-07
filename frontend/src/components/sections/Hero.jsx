import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Globe, Mail } from "lucide-react";
import { personal } from "../../data/portfolio";
import { MaskedLines } from "../../lib/animations";
import { Magnetic } from "../common";

const iconMap = { github: Github, linkedin: Linkedin, globe: Globe, mail: Mail };

function Typer({ words }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      if (!del) {
        setTxt(word.slice(0, txt.length + 1));
        if (txt.length + 1 === word.length) setTimeout(() => setDel(true), 1400);
      } else {
        setTxt(word.slice(0, txt.length - 1));
        if (txt.length === 0) { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return (
    <span className="text-brand">
      {txt}<span className="inline-block w-[2px] h-[1em] align-middle bg-brand ml-1 animate-pulse" />
    </span>
  );
}

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    setMouse({ x: (e.clientX / w - 0.5) * 2, y: (e.clientY / h - 0.5) * 2 });
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen flex items-center overflow-hidden grain pt-28 pb-16"
      data-testid="hero-section"
    >
      {/* gradient blobs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-[38rem] h-[38rem] rounded-full bg-brand/20 blur-[120px] animate-blob" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-brand/10 blur-[120px] animate-blob" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-12 gap-12 items-center">
        <motion.div style={{ y: yText }} className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-px w-12 bg-brand" />
            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {personal.location.split("—")[0]}
            </span>
          </motion.div>

          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tighter leading-[0.85]">
            <MaskedLines lines={[personal.firstName]} start={1.7} className="block" />
            <MaskedLines lines={[personal.lastName]} start={1.85} className="block text-brand" />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}
            className="mt-8 font-sans text-xl md:text-2xl h-9"
          >
            <Typer words={personal.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.35 }}
            className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic
              as="a" href="#contact"
              data-testid="hero-hire-me-btn"
              className="inline-block px-8 py-4 bg-brand text-white text-sm uppercase tracking-[0.15em] hover:bg-brand-hover transition-colors"
            >
              Hire Me
            </Magnetic>
            <Magnetic
              as="a" href={personal.resumeUrl} target="_blank" rel="noopener noreferrer"
              data-testid="hero-resume-btn"
              className="inline-block px-8 py-4 border border-border text-sm uppercase tracking-[0.15em] hover:border-brand hover:text-brand transition-colors"
            >
              Download CV
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.65 }}
            className="mt-10 flex items-center gap-4"
          >
            {personal.socials.map((s) => {
              const Icon = iconMap[s.icon] || Globe;
              return (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  data-testid={`hero-social-${s.icon}`} aria-label={s.label}
                  className="h-11 w-11 flex items-center justify-center border border-border hover:border-brand hover:text-brand transition-colors">
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* portrait */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            style={{ y: yImg, x: mouse.x * 12, rotate: mouse.x * 1.2 }}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[16rem] sm:w-[20rem] lg:w-[24rem]"
          >
            <div className="relative overflow-hidden clip-arch aspect-[3/4] border border-border">
              <img src={personal.photo} alt={`${personal.firstName} ${personal.lastName}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            {/* floating card */}
            <motion.div
              style={{ x: mouse.x * -20, y: mouse.y * -14 }}
              className="absolute -left-6 bottom-16 glass border border-border p-4 shadow-xl animate-float">
              <p className="font-serif text-3xl">5+</p>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Years Exp.</p>
            </motion.div>
            <motion.div
              style={{ x: mouse.x * 18, y: mouse.y * 12 }}
              className="absolute -right-4 top-10 glass border border-border px-4 py-3 shadow-xl animate-float" >
              <p className="text-xs uppercase tracking-[0.15em] text-brand">Available for work</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        data-testid="hero-scroll-indicator"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "../data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic } from "./common";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [location.pathname]);

  const go = (href) => {
    setOpen(false);
    if (location.pathname !== "/") { navigate("/" + href); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-border py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button
            data-testid="nav-logo"
            onClick={() => go("#home")}
            className="font-serif text-2xl tracking-tight"
          >
            {personal.firstName}<span className="text-brand">.</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                data-testid={`nav-${l.label.toLowerCase()}-link`}
                onClick={() => go(l.href)}
                className={`font-sans text-sm uppercase tracking-[0.15em] transition-colors ${
                  active === l.href.slice(1) ? "text-brand" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Magnetic
                as="a"
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="nav-resume-btn"
                className="inline-block px-5 py-2.5 bg-brand text-white text-sm uppercase tracking-[0.15em] hover:bg-brand-hover transition-colors"
              >
                Resume
              </Magnetic>
            </div>
            <ThemeToggle />
            <button
              data-testid="nav-mobile-toggle"
              className="md:hidden h-10 w-10 flex items-center justify-center border border-border"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-background flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex justify-end p-6">
              <button data-testid="nav-mobile-close" onClick={() => setOpen(false)} className="h-10 w-10 flex items-center justify-center border border-border" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.href}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}-link`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => go(l.href)}
                  className="text-left font-serif text-5xl tracking-tight py-2"
                >
                  {l.label}
                </motion.button>
              ))}
              <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block px-6 py-4 bg-brand text-white text-center text-sm uppercase tracking-[0.15em]">
                Download Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

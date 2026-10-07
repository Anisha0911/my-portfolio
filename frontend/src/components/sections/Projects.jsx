import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Search } from "lucide-react";
import { projects, otherProjects } from "../../data/portfolio";
import { SectionHeading, Reveal, Marquee } from "../common";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function Projects() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = projects.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.tech.join(" ").toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <section id="projects" className="relative py-24 md:py-32 lg:py-40 bg-secondary/40" data-testid="projects-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHeading no="04" label="Selected Work" title={<>Featured<br />projects.</>} />
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="projects-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-background border border-border pl-9 pr-3 py-3 text-sm focus:border-brand outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              data-testid={`projects-filter-${c.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setCat(c)}
              className={`px-5 py-2.5 text-sm uppercase tracking-[0.1em] border transition-colors ${
                cat === c ? "bg-brand text-white border-brand" : "border-border hover:border-brand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
                className={`group ${i % 3 === 0 ? "md:col-span-2" : ""}`}
                data-testid={`project-card-${p.slug}`}
              >
                <Link to={`/project/${p.slug}`} className="block">
                  <div className="relative overflow-hidden aspect-[16/10] border border-border">
                    <img src={p.cover} alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 text-white text-sm uppercase tracking-[0.15em]">
                        View Case Study <ArrowUpRight size={18} />
                      </span>
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 glass border border-border text-xs uppercase tracking-[0.15em]">{p.category}</span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-3xl tracking-tight group-hover:text-brand transition-colors">{p.title}</h3>
                      <p className="text-muted-foreground mt-1 max-w-lg">{p.tagline}</p>
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0">{p.year}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{t} ·</span>
                    ))}
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16" data-testid="projects-empty">No projects match your search.</p>
        )}

        <Reveal className="mt-20">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">More client work</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {otherProjects.map((o) => (
              <span key={o} className="font-serif text-2xl md:text-3xl text-foreground/50 hover:text-brand transition-colors">{o}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

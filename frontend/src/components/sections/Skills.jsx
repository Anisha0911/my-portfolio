import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { skillCategories } from "../../data/portfolio";
import { SectionHeading, Reveal } from "../common";

export function Skills() {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");

  const cats = skillCategories;
  const visible = cats.filter((c) => active === "all" || c.id === active);

  return (
    <section id="skills" className="relative py-24 md:py-32 lg:py-40 bg-secondary/40" data-testid="skills-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHeading no="02" label="Capabilities" title={<>Skills &<br />toolkit.</>} />
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="skills-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a skill..."
              className="w-full bg-background border border-border pl-9 pr-3 py-3 text-sm focus:border-brand outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-14">
          {[{ id: "all", name: "All" }, ...cats].map((c) => (
            <button
              key={c.id}
              data-testid={`skills-filter-${c.id}`}
              onClick={() => setActive(c.id)}
              className={`px-5 py-2.5 text-sm uppercase tracking-[0.1em] border transition-colors ${
                active === c.id ? "bg-brand text-white border-brand" : "border-border hover:border-brand"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => {
              const skills = cat.skills.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
              if (!skills.length) return null;
              return (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  data-testid={`skills-group-${cat.id}`}
                >
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-brand mb-6">{cat.name}</p>
                  <div className="space-y-6">
                    {skills.map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-base">{s.name}</span>
                          <span className="text-sm text-muted-foreground">{s.level}%</span>
                        </div>
                        <div className="h-[3px] bg-border overflow-hidden">
                          <motion.div
                            className="h-full bg-brand"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

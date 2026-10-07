import { motion } from "framer-motion";
import { experience } from "../../data/portfolio";
import { SectionHeading, Reveal } from "../common";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 lg:py-40" data-testid="experience-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading no="03" label="Career" title={<>Where I've<br />worked.</>} className="mb-16" />

        <div className="relative">
          <div className="absolute left-0 md:left-[220px] top-0 bottom-0 w-px bg-border" aria-hidden />
          <div className="space-y-14">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.05}>
                <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-12 relative pl-8 md:pl-0">
                  <motion.span
                    className="absolute left-[-5px] md:left-[215px] top-2 h-3 w-3 rounded-full bg-brand ring-4 ring-background"
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                  />
                  <div className="md:text-right md:pr-12">
                    <p className="font-sans text-xs uppercase tracking-[0.15em] text-brand">{e.duration}</p>
                    <p className="text-sm text-muted-foreground mt-1">{e.location}</p>
                  </div>
                  <div className="md:pl-12 pb-2">
                    <h3 className="font-serif text-3xl md:text-4xl tracking-tight">{e.role}</h3>
                    <p className="text-lg text-muted-foreground mt-1 mb-5">{e.company}</p>
                    <ul className="space-y-2 mb-5">
                      {e.responsibilities.map((r, j) => (
                        <li key={j} className="flex gap-3 text-muted-foreground">
                          <span className="text-brand mt-1.5 h-1 w-1 rounded-full bg-brand shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                    {e.achievements?.length > 0 && (
                      <div className="mb-5 space-y-1.5">
                        {e.achievements.map((a, j) => (
                          <p key={j} className="text-sm italic text-foreground/80">★ {a}</p>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {e.tech.map((t) => (
                        <span key={t} className="text-xs uppercase tracking-[0.1em] px-3 py-1 border border-border text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

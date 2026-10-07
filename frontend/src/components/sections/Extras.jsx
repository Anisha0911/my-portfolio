import { motion } from "framer-motion";
import { Rocket, Layout, GitBranch, Award, GraduationCap } from "lucide-react";
import { techStack, achievements, education, languages } from "../../data/portfolio";
import { SectionHeading, Reveal } from "../common";

const iconMap = { rocket: Rocket, layout: Layout, gitBranch: GitBranch, award: Award };

export function TechStack() {
  return (
    <section id="tech" className="relative py-24 md:py-32" data-testid="tech-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading no="05" label="Tech Stack" title={<>Tools of<br />the trade.</>} className="mb-14" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border border border-border">
          {techStack.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.04 }}
              className="group bg-background aspect-square flex flex-col items-center justify-center gap-3 p-4 hover:bg-brand transition-colors duration-300"
              data-testid={`tech-item-${t.toLowerCase().replace(/\s/g, "-")}`}
            >
              <span className="font-serif text-3xl text-brand group-hover:text-white transition-colors">
                {t.slice(0, 2)}
              </span>
              <span className="text-xs uppercase tracking-[0.1em] text-muted-foreground group-hover:text-white transition-colors text-center">{t}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32 bg-secondary/40" data-testid="achievements-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading no="06" label="Milestones" title={<>Achievements<br />& impact.</>} className="mb-14" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon] || Award;
            return (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="border border-border p-8 bg-background h-full hover:border-brand transition-colors group" data-testid={`achievement-${i}`}>
                  <Icon size={28} className="text-brand mb-6" />
                  <h3 className="font-serif text-2xl tracking-tight mb-2">{a.title}</h3>
                  <p className="text-muted-foreground">{a.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32" data-testid="education-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SectionHeading no="07" label="Education" title={<>Academic<br />foundation.</>} />
          <div className="mt-12">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-brand mb-4">Languages</p>
            <div className="space-y-3">
              {languages.map((l) => (
                <div key={l.name} className="flex justify-between border-b border-border pb-2" data-testid={`language-${l.name.toLowerCase()}`}>
                  <span>{l.name}</span>
                  <span className="text-muted-foreground text-sm">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-6">
          {education.map((e, i) => (
            <Reveal key={e.institution} delay={i * 0.08}>
              <div className="border border-border p-8 hover:border-brand transition-colors flex gap-6" data-testid={`education-${i}`}>
                <GraduationCap size={32} className="text-brand shrink-0" />
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-1">
                    <h3 className="font-serif text-2xl md:text-3xl tracking-tight">{e.degree}</h3>
                    <span className="px-3 py-1 bg-brand/10 text-brand text-sm">{e.score}</span>
                  </div>
                  <p className="text-muted-foreground">{e.institution}</p>
                  <p className="text-sm text-muted-foreground mt-1">{e.period} — {e.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

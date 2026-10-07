import { personal, stats, manifesto } from "../../data/portfolio";
import { SectionHeading, Reveal, Counter, Marquee } from "../common";
import { techStack } from "../../data/portfolio";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeading no="01" label="About Me" title={<>The story<br />so far.</>} />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-serif text-2xl md:text-4xl leading-[1.3] tracking-tight">
                {personal.about}
              </p>
            </Reveal>
            <div className="mt-12 flex flex-wrap gap-3">
              {personal.values.map((v, i) => (
                <Reveal key={v} delay={i * 0.05}>
                  <span className="inline-block px-4 py-2 border border-border text-sm text-muted-foreground">{v}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Manifesto chapters */}
        <div className="mt-24 grid md:grid-cols-3 gap-px bg-border border border-border">
          {manifesto.map((m, i) => (
            <Reveal key={m.no} delay={i * 0.1} className="bg-background p-8 md:p-10">
              <p className="font-serif text-5xl text-brand mb-6">{m.no}</p>
              <h3 className="text-xl md:text-2xl mb-4">{m.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{m.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
              <p className="font-serif text-5xl md:text-7xl tracking-tight">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 py-8 border-y border-border">
        <Marquee items={techStack.slice(0, 8)} slow />
      </div>
    </section>
  );
}

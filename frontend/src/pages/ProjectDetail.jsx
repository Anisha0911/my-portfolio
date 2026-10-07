import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";
import { Footer } from "../components/Footer";
import { Reveal, Magnetic } from "../components/common";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" data-testid="project-not-found">
        <p className="font-serif text-4xl">Project not found</p>
        <Link to="/" className="text-brand underline">Back home</Link>
      </div>
    );
  }

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
    { label: "Stack", value: project.tech.join(", ") },
  ];

  return (
    <main data-testid="project-detail-page">
      <section className="relative pt-32 pb-16 grain">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <button onClick={() => navigate(-1)} data-testid="project-back-btn" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-brand transition-colors mb-12">
            <ArrowLeft size={16} /> Back
          </button>
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-brand mb-4">{project.category} — {project.year}</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9]">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">{project.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            {project.demo && (
              <Magnetic as="a" href={project.demo} target="_blank" rel="noopener noreferrer" data-testid="project-demo-btn" className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white text-sm uppercase tracking-[0.15em]">
                Live Demo <ExternalLink size={16} />
              </Magnetic>
            )}
            {project.github && (
              <Magnetic as="a" href={project.github} target="_blank" rel="noopener noreferrer" data-testid="project-github-btn" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm uppercase tracking-[0.15em] hover:border-brand">
                GitHub <Github size={16} />
              </Magnetic>
            )}
            {!project.demo && !project.github && (
              <span className="text-sm text-muted-foreground italic">Live links available on request — add your URLs in projects data.</span>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="overflow-hidden border border-border aspect-[16/9]">
            <img src={project.cover} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-14">
          {[
            { h: "Overview", p: project.description },
            { h: "The Problem", p: project.problem },
            { h: "The Solution", p: project.solution },
            { h: "Challenges", p: project.challenges },
            { h: "Outcome", p: project.outcome },
          ].map((b) => (
            <Reveal key={b.h}>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">{b.h}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{b.p}</p>
            </Reveal>
          ))}
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">Key Features</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 border border-border p-4">
                  <span className="text-brand">→</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit space-y-8 border border-border p-8">
          {meta.map((m) => (
            <div key={m.label}>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{m.label}</p>
              <p className="text-lg">{m.value}</p>
            </div>
          ))}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs uppercase tracking-[0.1em] px-3 py-1 border border-border">{t}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="border-t border-border">
        <Link to={`/project/${next.slug}`} data-testid="project-next-link" className="group block max-w-7xl mx-auto px-6 md:px-12 py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Next Project</p>
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight group-hover:text-brand transition-colors">{next.title}</h2>
            <ArrowUpRight size={40} className="text-brand shrink-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </div>
        </Link>
      </section>
      <Footer />
    </main>
  );
}

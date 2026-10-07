import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials, blogPosts } from "../../data/portfolio";
import { SectionHeading, Reveal } from "../common";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((v) => (v + 1) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-secondary/40" data-testid="testimonials-section">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <SectionHeading no="08" label="Kind Words" title="Testimonials" className="mb-14 flex flex-col items-center [&>div]:justify-center [&_h2]:text-center" />
        <Quote size={48} className="text-brand mx-auto mb-8" />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            data-testid="testimonial-quote"
          >
            <p className="font-serif text-2xl md:text-4xl leading-[1.3] tracking-tight">"{t.quote}"</p>
            <footer className="mt-8">
              <p className="text-lg">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-4 mt-10">
          <button data-testid="testimonial-prev" onClick={prev} aria-label="Previous" className="h-11 w-11 flex items-center justify-center border border-border hover:border-brand hover:text-brand transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-muted-foreground">{i + 1} / {testimonials.length}</span>
          <button data-testid="testimonial-next" onClick={next} aria-label="Next" className="h-11 w-11 flex items-center justify-center border border-border hover:border-brand hover:text-brand transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Placeholder testimonials — replace with real client quotes anytime.</p>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section id="blog" className="relative py-24 md:py-32" data-testid="blog-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading no="09" label="Journal" title={<>Writing &<br />thoughts.</>} className="mb-14" />
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((b, idx) => (
            <Reveal key={b.slug} delay={idx * 0.08}>
              <article className="group cursor-pointer" data-testid={`blog-card-${b.slug}`}>
                <div className="relative overflow-hidden aspect-[4/3] border border-border">
                  <img src={b.cover} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 px-3 py-1 glass border border-border text-xs uppercase tracking-[0.15em]">{b.tag}</span>
                </div>
                <div className="mt-5">
                  <p className="text-sm text-muted-foreground mb-2">{b.date} · {b.readTime}</p>
                  <h3 className="font-serif text-2xl tracking-tight group-hover:text-brand transition-colors">{b.title}</h3>
                  <p className="text-muted-foreground mt-2">{b.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted-foreground">Sample posts — ready for a future CMS integration.</p>
      </div>
    </section>
  );
}

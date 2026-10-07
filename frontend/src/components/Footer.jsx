import { Github, Linkedin, Globe, Mail } from "lucide-react";
import { personal, navLinks } from "../data/portfolio";
import { Magnetic } from "./common";

const iconMap = { github: Github, linkedin: Linkedin, globe: Globe, mail: Mail };

export function Footer() {
  const go = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="border-t border-border bg-background" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-serif text-4xl tracking-tight mb-4">{personal.firstName}<span className="text-brand">.</span></p>
            <p className="text-muted-foreground max-w-xs">{personal.title} — crafting elegant, performant web experiences.</p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button onClick={() => go(l.href)} className="hover:text-brand transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">Connect</p>
            <div className="flex gap-3 mb-6">
              {personal.socials.map((s) => {
                const Icon = iconMap[s.icon] || Globe;
                return (
                  <Magnetic
                    key={s.label}
                    as="a"
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`footer-social-${s.icon}`}
                    aria-label={s.label}
                    className="h-11 w-11 flex items-center justify-center border border-border hover:border-brand hover:text-brand transition-colors"
                  >
                    <Icon size={18} />
                  </Magnetic>
                );
              })}
            </div>
            <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-resume-btn" className="inline-block text-sm uppercase tracking-[0.15em] border-b border-brand pb-1 hover:text-brand transition-colors">
              Download Resume
            </a>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {personal.firstName} {personal.lastName}. All rights reserved.</p>
          <p>Designed & built with care in Mumbai.</p>
        </div>
      </div>
    </footer>
  );
}

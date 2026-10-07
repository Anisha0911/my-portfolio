import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Experience } from "../components/sections/Experience";
import { Projects } from "../components/sections/Projects";
import { TechStack, Achievements, Education } from "../components/sections/Extras";
import { Testimonials, Blog } from "../components/sections/Feed";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <TechStack />
      <Achievements />
      <Education />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}

import Hero from './sections/Hero';
import Skills from './sections/skills';
import Projects from './sections/projects';


export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Skills/>
      <Projects />
    </main>
  );
}
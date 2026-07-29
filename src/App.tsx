import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const TechMarquee = lazy(() => import('./components/TechMarquee'));
const Projects = lazy(() => import('./components/Projects'));
const WhyMe = lazy(() => import('./components/WhyMe'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const SectionLoader = () => (
  <div className="h-48 w-full flex items-center justify-center" aria-hidden="true">
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 rounded-full border-2 border-slate-900" />
      <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 animate-spin" />
    </div>
  </div>
);

function App() {
  return (
    <div className="bg-[#090d16] text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Experience />
          <TechMarquee />
          <Projects />
          <WhyMe />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

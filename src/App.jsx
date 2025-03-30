import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import StickyNav from './components/StickyNav';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ThemeToggle from './components/ThemeToggle';
import NeonTrail from './components/NeonTrail';
import DayTrail from './components/DayTrail';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>

      <div id="content" className={`app`}>
        {!isMobile && theme === 'dark' && <NeonTrail />}
        {!isMobile && theme === 'light' && <DayTrail />}
        <StickyNav />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <main>
          <section className="hero">
            <Hero />
          </section>
          <section className="skills-section">
            <Skills theme={theme} />
          </section>
          <section className="projects" id="projects">
            <Projects />
          </section>
          
        </main>
        <Footer theme={theme} />
      </div>
    </>
  );
}

export default App;

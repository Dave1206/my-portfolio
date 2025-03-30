import React from "react";
import AnimatedCaricature from "./AnimatedCaricature";
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h3>Hi, my name is</h3>
        <h1>David Waddell</h1>
        <h1 className="sub-h1">I am a full stack developer.</h1>
        <p>
        Driven by a passion for crafting clean, elegant code, 
        I continuously push myself to learn and master new technologies. 
        My journey in development is fueled by an insatiable curiosity. 
        I love working with a team, and I am an empathetic collaborator. I thrive 
        on solving challenging problems, and transforming ideas into innovative, 
        impactful solutions.
        </p>
        
      </div>
      <AnimatedCaricature />
    </section>
  );
}

export default Hero;

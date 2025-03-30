import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

const skills = ['React', 
                'JavaScript', 
                'CSS3', 
                'MongoDB', 
                'PostgreSQL', 
                'Framer Motion', 
                'NodeJS',
                'Express',
                'Github',
              ];

const logos = {
  React: '/logos/react.svg',
  JavaScript: '/logos/js.svg',
  CSS3: '/logos/css3.svg',
  MongoDB: '/logos/mongodb.svg',
  PostgreSQL: '/logos/postgresql.svg',
  'Framer Motion': '/logos/framermotion.svg',
  NodeJS: '/logos/nodejs.svg',
  Express: '/logos/express.svg',
  Github: '/logos/github.svg',
};

const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const waveVariants = {
    hidden: { scale: 0.8 },
    visible: {
      scale: [1.2, 0.9, 1],
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

function Skills({ theme }) {
  return (
    <section className="skills-section">
      <h2>My Tech Stack</h2>
      <motion.div
        className="skills-list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.9 }}
      >
         {skills.map((skill) => (
          <motion.div
            key={skill}
            className="skill-item"
            variants={waveVariants}
          >
            <img src={logos[skill]} alt={skill} className="skill-logo" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;

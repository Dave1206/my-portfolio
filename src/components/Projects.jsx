import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Projects.css';

const projectsData = [
    {
        title: "Memory App",
        screenshots: [
            "/images/project1-1.png",
            "/images/project1-2.png",
            "/images/project1-3.png"
        ],
        overviewLink: "/projects/project-one",
        githubLink: "https://github.com/yourusername/project-one",
    },
    {
        title: "My Portfolio",
        screenshots: [
            "/images/project2-1.png",
            "/images/project2-2.png",
        ],
        overviewLink: "/projects/project-two",
        githubLink: "https://github.com/Dave1206/my-portfolio",
    },
];

const carouselVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.5 },
};

function ProjectItem({ project }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % project.screenshots.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? project.screenshots.length - 1 : prev - 1
        );
    };

    return (
        <div className="project-item">
            <h3>{project.title}</h3>
            <div className="carousel">
                <button className="arrow left" onClick={prevSlide}>&lt;</button>
                <div className="screenshot">
                    <AnimatePresence initial={false}>
                        <motion.img
                            key={project.screenshots[currentIndex]}
                            src={project.screenshots[currentIndex]}
                            alt={`${project.title} screenshot ${currentIndex + 1}`}
                            variants={carouselVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>
                <button className="arrow right" onClick={nextSlide}>&gt;</button>
            </div>
            <div className="project-buttons">
                <a href={project.overviewLink} className="overview-btn">
                    Overview
                </a>
                <a
                    href={project.githubLink}
                    className="github-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Code
                </a>
            </div>
        </div>
    );
}

function Projects() {
    return (
        <>
            <h2>Projects</h2>
            <div className="projects-list">
                {projectsData.map((project) => (
                    <ProjectItem key={project.title} project={project} />
                ))}
            </div>
        </>
    );
}

export default Projects;

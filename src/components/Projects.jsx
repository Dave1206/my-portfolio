import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Projects.css';

const projectsData = [
    {
        title: "Memory App",
        screenshots: [
            "/projects/memoryappss1.png",
            "/projects/memoryappss2.png",
            "/projects/memoryappss3.png"
        ],
        description: `
            A social networking application for sharing memories, featuring real-time updates, instant messaging, and live feed updates.
        `,
        features: [
            `User authentication with bcrypt and email verification via nodemailer.`,
            `Real-time notifications and messaging using WebSocket.`,
            `Moderation tools including user bans and media approval.`,
            `Media uploads and processing with FFmpeg, Multer, and Sharp.`,
            `Data recommendations based on metadata tracking, including location.`,
        ],
        githubLink: "https://github.com/Dave1206/Memory-App",
    },
    {
        title: "My Portfolio",
        screenshots: [
            "/projects/portfolioss1.png",
            "/projects/portfolioss2.png",
        ],
        description: `
            A personal portfolio website showcasing my frontend development skills.
            `,
        features: [
            `Built with Vite and React.`,
            `Creative animations using Framer Motion.`,
            `Responsive design with strong UX principles.`,
            `Light and dark mode themes offer two unique designs.`,
            `Deployed on Netlify for fast, reliable access.`,
            `Graphic editing using GIMP for custom assets.`,
            `Resume available in the forms of print, download, or google docs.`,
        ],
        githubLink: "https://github.com/Dave1206/my-portfolio",
    },
];

const carouselVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
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
                <button className="arrow left" onClick={prevSlide}>&lsaquo;</button>
                <div className="screenshot">
                    <AnimatePresence initial={false}>
                        <motion.img
                            key={project.screenshots[currentIndex]}
                            src={project.screenshots[currentIndex]}
                            alt={`${project.title} screenshot ${currentIndex + 1}`}
                            variants={carouselVariants}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>
                <button className="arrow right" onClick={nextSlide}>&rsaquo;</button>
            </div>
            <div className="project-overview">
                <p>{project.description}</p>
                <ul>
                    {project.features.map((feature, index) => (
                        <li key={`feature${index}`}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className="project-buttons">
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

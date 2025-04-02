import React from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../styles/Resume.css';

const Resume = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current || null,
        documentTitle: 'David_Waddell_Resume',
    });

    return (
        <div className="resume-container" ref={componentRef}>
            <div className="resume-header">
                <h1>David Waddell</h1>
                <h3>Full Stack Developer</h3>
                <p>
                    Email: <a href="mailto:david.n.waddell@gmail.com">david.n.waddell@gmail.com</a> |
                    GitHub: <a href="https://github.com/Dave1206" target="_blank" rel="noopener noreferrer">github.com/Dave1206</a> |
                    LinkedIn: <a href="https://www.linkedin.com/in/david-waddell-3a757a318/" target="_blank" rel="noopener noreferrer">linkedin.com/in/david-waddell</a>
                </p>
            </div>

            <div className='resume-columns'>
                <div className='left-column'>
                    <section className="resume-section">
                        <h2>Summary</h2>
                        <p>
                            Passionate and self-taught full-stack developer with experience
                            building high-performance web applications.
                            Proficient in JavaScript, React, Node.js, PostgreSQL, MongoDB,
                            and CSS, with a strong focus on design, and user experience.
                            Continuously enhancing my skills through personal projects, online learning,
                            and collaborative experiences. Seeking to leverage my technical abilities
                            and creativity to contribute to innovative teams.
                        </p>
                    </section>

                    <section className="resume-section">
                        <h2>Education / Learning Experience</h2>
                        <div>
                            <h3>CodeSmith Bootcamp Admissions Process</h3>
                            <ul>
                                <li>Gained in-depth knowledge of JavaScript fundamentals including:</li>
                                <ul>
                                    <li>Closure</li>
                                    <li>Recursion</li>
                                    <li>Object-Oriented Programming (OOP)</li>
                                    <li>Asynchronous Programming</li>
                                    <li>Execution Context</li>
                                    <li>Event Loop</li>
                                    <li>Prototype Chain</li>
                                </ul>
                                <li>Participated in pair programming sessions with coders of varying skill levels to enhance collaboration and debugging skills.</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Udemy Courses Completed</h3>
                            <ul>
                                <li>The Complete Full-Stack Web Development Bootcamp by Angela Yu</li>
                                <li>Learn HTML and CSS in 7 Days by Fabian and Pavel Coding2GO</li>
                                <li>C# Advanced Topics by Mosh Hamedani</li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div className='right-column'>
                    <section className="resume-section">
                        <h2>Skills</h2>
                        <ul>
                            <li>JavaScript, HTML, CSS, SQL</li>
                            <li>React, Node.js, Express, WebSocket</li>
                            <li>PostgreSQL, MongoDB</li>
                            <li>Git, Heroku, Netlify, Cloudinary</li>
                            <li>FFmpeg, Multer, Sharp, Framer Motion, GIMP</li>
                            <li>Responsive Design, Web Accessibility, API Design</li>
                            <li>Concepts: OOP, Recursion, Closure, Async Programming, Event Loop</li>
                        </ul>
                    </section>
                    <section className="resume-section">
                        <h2>Projects</h2>
                        <div className="resume-project-item">
                            <h3>Memory App</h3>
                            <p>
                                <a href="https://yourlivedemo.com" target="_blank" rel="noopener noreferrer">Live Demo</a> |
                                <a href="https://github.com/Dave1206/social-app" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                            </p>
                            <ul>
                                <li>Authentication system with bcrypt for password hashing and email verification via nodemailer.</li>
                                <li>Real-time features powered by WebSocket, including notifications, messaging, and live feed updates.</li>
                                <li>Moderator tools: User bans, media approval queue, and Google Vision API for content filtering.</li>
                                <li>Data recommendations based on metadata tracking, including location data via IP API.</li>
                                <li>Backend using Express and PostgreSQL with advanced query structuring for optimized performance.</li>
                                <li>Media handling via Multer, Sharp, and FFmpeg for image and video uploads.</li>
                            </ul>
                            <p><strong>Technologies:</strong> React, Node.js, Express, WebSocket, PostgreSQL, MongoDB, Cloudinary, Google Vision API, FFmpeg, Multer, Sharp</p>
                        </div>
                        <div className="resume-project-item">
                            <h3>Portfolio Website</h3>
                            <p>
                                <a href="https://yourportfoliourl.com" target="_blank" rel="noopener noreferrer">Live Demo</a> |
                                <a href="https://github.com/Dave1206/portfolio-site" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                            </p>
                            <ul>
                                <li>Built with Vite and React, utilizing Framer Motion for creative animations.</li>
                                <li>Applied strong UX principles, accessibility, typography best practices, and color contrast.</li>
                                <li>Search Engine Optimization through proper use of HTML tags and keyworded headers.</li>
                                <li>Graphic editing performed with GIMP to create custom assets.</li>
                                <li>Deployed on Netlify for fast, reliable performance.</li>
                            </ul>
                            <p><strong>Technologies:</strong> Vite, React, Framer Motion, GIMP, Netlify</p>
                        </div>
                    </section>
                </div>
            </div>
            <button onClick={handlePrint} className="print-button">
                Download as PDF
            </button>
        </div>
    );
};

export default Resume;

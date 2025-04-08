import React from 'react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from "jspdf";
import '../styles/Resume.css';

const Resume = () => {
    const contentRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: 'David_Waddell_Resume'
    });

    const handleDownload = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const paddingLeft = 50;
        const paddingTop = 50;

        const originalLinks = contentRef.current.querySelectorAll('.pdf-links');
        originalLinks.forEach(link => link.style.display = 'none');
    
        doc.html(contentRef.current, {
            callback: function (doc) {

                originalLinks.forEach(link => link.style.display = '');
                doc.setFontSize(8);
                doc.setTextColor(0, 0, 255);
                doc.textWithLink('Email: david.n.waddell@gmail.com   |', paddingLeft + 50, paddingTop + 83, {
                    url: 'mailto:david.n.waddell@gmail.com'
                });
    
                doc.textWithLink('GitHub: github.com/Dave1206   |', paddingLeft + 190, paddingTop + 83, {
                    url: 'https://github.com/Dave1206'
                });
    
                doc.textWithLink('LinkedIn: linkedin.com/in/david-waddell-3a757a318', paddingLeft + 310, paddingTop + 83, {
                    url: 'https://www.linkedin.com/in/david-waddell-3a757a318/'
                });
    
                doc.textWithLink('Live Demo |', paddingLeft + 105, paddingTop + 226, {
                    url: 'https://memoryapp-d427aaf76968.herokuapp.com/login'
                });
    
                doc.textWithLink('GitHub Repository', paddingLeft + 150, paddingTop + 226, {
                    url: 'https://github.com/Dave1206/Memory-App'
                });
    
                doc.textWithLink('Live Demo |', paddingLeft + 125, paddingTop + 496, {
                    url: 'https://david-waddell.netlify.app'
                });
    
                doc.textWithLink('GitHub Repository', paddingLeft + 170, paddingTop + 496, {
                    url: 'https://github.com/Dave1206/my-portfolio'
                });
    
                doc.save("David_Waddell_Resume.pdf");
            },
            x: 0,
            y: 0,
            html2canvas: {
                scale: 0.53,
                logging: true,
                useCORS: true,
                allowTaint: true,
            },
            margin: [0, 0, 0, 30],
            autoPaging: true,
        });
    };
 
    return (
        <>
            <div className="resume-container" ref={contentRef}>
                <div className="resume-header">
                    <h1>David Waddell</h1>
                    <h3>Full Stack Developer</h3>
                    <p className='pdf-links'>
                        Email: <a href="mailto:david.n.waddell@gmail.com">david.n.waddell@gmail.com</a> |
                        GitHub: <a href="https://github.com/Dave1206" target="_blank" rel="noopener noreferrer">github.com/Dave1206</a> |
                        LinkedIn: <a href="https://www.linkedin.com/in/david-waddell-3a757a318/" target="_blank" rel="noopener noreferrer">linkedin.com/in/david-waddell</a>
                    </p>
                </div>

                <section className="resume-section resume-summary">
                          
                            <p>
                                Passionate and self-taught full-stack developer with experience
                                building high-performance web applications.
                                Proficient in JavaScript, React, Node.js, PostgreSQL,
                                and CSS, with a strong focus on UI, UX, and scalability.
                            </p>
                        </section>

                <div className='resume-columns'>
                    <div className='left-column'>
                    <section className="resume-section">
                            <h2>Projects</h2>
                            <div className="resume-project-item">
                                <h3>Memory App</h3>
                                <p className='pdf-links'>
                                    <a href="https://memoryapp-d427aaf76968.herokuapp.com/login" target="_blank" rel="noopener noreferrer">Live Demo</a> |
                                    <a href="https://github.com/Dave1206/Memory-App" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
                                </p>
                                <ul>
                                    <li>Authentication system with bcrypt for password hashing and email verification via nodemailer.</li>
                                    <li>Real-time features powered by WebSocket, including notifications, messaging, and live feed updates.</li>
                                    <li>Moderator tools: User bans, media approval queue, and Google Vision API for content filtering.</li>
                                    <li>Content recommendations based on metadata tracking, including location data.</li>
                                    <li>Backend using Express and PostgreSQL with advanced query structuring for optimized performance.</li>
                                    <li>Media handling via Multer, Sharp, and FFmpeg for image and video uploads.</li>
                                </ul>
                                <p><strong>Technologies:</strong> React, Node.js, Express, WebSocket, PostgreSQL, Cloudinary, Google Vision API, FFmpeg, Multer, Sharp</p>
                            </div>
                            <div className="resume-project-item">
                                <h3>Portfolio Website</h3>
                                <p className='pdf-links'>
                                    <a href="https://david-waddell.netlify.app" target="_blank" rel="noopener noreferrer">Live Demo</a> |
                                    <a href="https://github.com/Dave1206/my-portfolio" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
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
                                <li>Concepts: OOP, Recursion, Closure, Async Programming, Event Loop, Prototype Chain, Execution Context</li>
                            </ul>
                        </section>
                        <section className="resume-section">
                            <h2>Education</h2>
                            <div>
                                <h3>CodeSmith Bootcamp Admissions Process</h3>
                                <ul>
                                    <li>Gained in-depth knowledge of JavaScript fundamentals, and under the hood understanding.</li>
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
                </div>
                <div className='pdf-buttons'>
                    <button onClick={handlePrint} className="print-button" data-html2canvas-ignore="true">
                        Print
                    </button>
                    <button onClick={handleDownload} className="print-button" data-html2canvas-ignore="true">
                        Download
                    </button>
                    <a href="https://docs.google.com/document/d/1Cad77wBc_JK7sAAIcLhHeMxCFIQXK7DwovQkf5nBP38/edit?usp=sharing" className="print-button" data-html2canvas-ignore="true" target="_blank">
                        Google Doc
                    </a>
                </div>
            </div>
        </>
    );
};

export default Resume;

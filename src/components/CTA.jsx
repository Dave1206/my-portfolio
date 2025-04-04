import React from 'react';
import { motion } from 'framer-motion';
import '../styles/CTA.css';

const CTASection = () => {
    return (
        <>
            <h2>Ready to take your project to the next level?</h2>
            <p>Let's work together to build something amazing. Reach out today!</p>
            <div className="cta-buttons">
                <a href="mailto:david.n.waddell@gmail.com?subject=Portfolio%20Inquiry" className="cta-btn">
                    <img className='icon' src="/email.png" alt="Email Icon" />david.n.waddell@gmail.com
                </a>
                <a href="https://github.com/Dave1206" className="cta-btn secondary">
                    <img className='icon' src="/logos/github.svg" alt="GitHub Icon" />GitHub
                </a>
                <a href="https://www.linkedin.com/in/david-waddell-3a757a318/" className='cta-btn linkedin'>
                    <img className='icon' src="/logos/LinkedIn.png" alt="LinkedIn Icon" />LinkedIn
                </a>
            </div>

            <p>
                Have a project in mind or just want to say hi? Fill out the form below and I’ll get back to you soon!
            </p>

            {/* Animated Form */}
            <motion.div
                className="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <form
                    name="contact"
                    method="POST"
                    action="/thank-you"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="contact-form"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                        <label>
                            Don’t fill this out: <input name="bot-field" />
                        </label>
                    </p>
                    <p>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" required />
                    </p>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </p>
                    <p>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="4" required></textarea>
                    </p>
                    <p>
                        <button type="submit" className="cta-btn">Send Message</button>
                    </p>
                </form>
            </motion.div>
        </>
    );
};

export default CTASection;

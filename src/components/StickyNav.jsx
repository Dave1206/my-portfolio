import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import '../styles/StickyNav.css'

const StickyNav = ({ isMobile }) => {
    return (
        <nav className="sticky-nav">
            {!isMobile && <Link to="/"><img className='logo' src="/logo.png" alt="logo" /></Link>}
            <ul>
                <li>
                    <a href="https://github.com/Dave1206" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/david-waddell-3a757a318/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
                <li>
                    <Link to="/resume">Resume</Link>
                </li>
                <li>
                    <HashLink smooth to="/#projects">Projects</HashLink>
                </li>
                <li>
                    <HashLink smooth to="/#CTA">Contact</HashLink>
                </li>
            </ul>
        </nav>
    );
};

export default StickyNav;

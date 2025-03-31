import React from 'react';
import '../styles/StickyNav.css';

function StickyNav({ isMobile }) {
  return (
    <nav className="sticky-nav">
      {!isMobile && <a href="/"><img className='logo' src="/logo.png"></img></a>}
      <ul>
        <li>
          <a href="https://github.com/Dave1206" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/david-waddell-3a757a318/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#CTA">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default StickyNav;

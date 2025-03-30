import React from 'react';
import '../styles/StickyNav.css';

function StickyNav() {
  return (
    <nav className="sticky-nav">
      <ul>
        <li>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
      </ul>
    </nav>
  );
}

export default StickyNav;

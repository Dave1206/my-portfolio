import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ThemeToggle.css';
import { SunIcon, MoonIcon } from './Icons';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <motion.div
        className="toggle-icon"
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'light' ? <SunIcon /> : <MoonIcon /> }
      </motion.div>
    </div>
  );
}

export default ThemeToggle;

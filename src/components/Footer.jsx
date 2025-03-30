import React, { useEffect, useState } from 'react';
import '../styles/Footer.css';

const Footer = ({ theme }) => {
  const [animateWave, setAnimateWave] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      const interval = setInterval(() => {

        if (Math.random() < 0.6) {
          setAnimateWave(true);
          setTimeout(() => {
            setAnimateWave(false);
          }, 3000);
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [theme]);

  const [twinkles, setTwinkles] = useState([]);
  useEffect(() => {
    if (theme === 'dark') {
      const interval = setInterval(() => {
        if (Math.random() < 1) {
          const newTwinkle = {
            id: Date.now(),
            left: Math.random() * 100,
            top: Math.random() * 50,
          };
          setTwinkles((prev) => [...prev, newTwinkle]);
          setTimeout(() => {
            setTwinkles((prev) => prev.filter(t => t.id !== newTwinkle.id));
          }, 2000);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [theme]);

  if (theme === 'light') {
    return (
      <footer className="footer footer-light">
        <div className={`footer-flowers ${animateWave ? 'wave' : ''}`}></div>
        <div className={`footer-grass`}></div>
      </footer>
    );
  } else {
    return (
      <footer className="footer footer-dark">
        <div className="footer-city"></div>
        <div className="footer-twinkles">
          {twinkles.map(twinkle => (
            <div 
              key={twinkle.id} 
              className="twinkle" 
              style={{ left: `${twinkle.left}%`, top: `${twinkle.top}%` }}
            ></div>
          ))}
        </div>
      </footer>
    );
  }
};

export default Footer;

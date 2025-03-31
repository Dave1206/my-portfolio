import React, { useEffect, useState } from 'react';
import '../styles/Footer.css';

const Footer = ({ theme }) => {
    const [animateWave, setAnimateWave] = useState(false);
    const [animateWaveTwo, setAnimateWaveTwo] = useState(false);

    useEffect(() => {
        if (theme === 'light') {
            const interval = setInterval(() => {

                if (Math.random() < 0.33) {
                    setAnimateWave(true);
                    setTimeout(() => {
                        setAnimateWave(false);
                    }, 3000);
                } else if (Math.random() > 0.66) {
                    setAnimateWaveTwo(true);
                    setTimeout(() => {
                        setAnimateWaveTwo(false);
                    }, 3000);
                }
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [theme]);

    const [twinkles, setTwinkles] = useState([]);

    useEffect(() => {
        if (theme === 'dark') {
            const interval = setInterval(() => {
                if (Math.random() < .1) {
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
            }, 500);
            return () => clearInterval(interval);
        }
    }, [theme]);

    const currentYear = new Date().getFullYear();
    const footerContent = (
        <div className='footer-content'>
            <p>&copy; {currentYear} David Waddell.</p>
            <p>david.n.waddell@gmail.com</p>
        </div>
    )

    if (theme === 'light') {
        return (
            <footer className="footer footer-light">
                {footerContent}
                <div className={`yellow-flower ${animateWave ? 'wave' : 
                    animateWaveTwo ? 'wave2' : ''}`}></div>
                <div className={`blue-flower ${animateWave ? 'wave' : 
                    animateWaveTwo ? 'wave2' : ''}`}></div>
                <div className={`footer-grass`}></div>
            </footer>
        );
    } else {
        return (
            <footer className="footer footer-dark">
                {footerContent}
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

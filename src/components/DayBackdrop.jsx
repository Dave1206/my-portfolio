import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/DayBackdrop.css';

const STATIC_CLOUD_COUNT = 8;
const ANIMATED_CLOUD_INTERVAL = 10000;
const ANIMATED_CLOUD_DURATION = 120;

const StaticClouds = () => {
    const clouds = useMemo(() => {
        return Array.from({ length: STATIC_CLOUD_COUNT }).map((_, i) => ({
            top: Math.random() * 40 + 10,
            left: Math.random() * 80,
            image: Math.floor(Math.random() * 3 + 1),
        }));
    }, []);

    return (
        <div className="static-clouds">
            {clouds.map((cloud, i) => (
                <img
                    key={i}
                    src={`/herobackdrop/cloud${String(cloud.image)}.png`}
                    alt="Cloud"
                    className="static-cloud"
                    style={{ top: `${cloud.top}%`, left: `${cloud.left}%` }}
                />
            ))}
        </div>
    );
};

const AnimatedClouds = () => {
    const [clouds, setClouds] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    useEffect(() => {
        const spawnCloud = () => {
            const id = Date.now();
            const top = Math.random() * 40 + 10;
            const image = Math.floor(Math.random() * 3 + 1);
            const newCloud = { id, top, image };
            setClouds((prev) => [...prev, newCloud]);
            setTimeout(() => {
                setClouds((prev) => prev.filter((c) => c.id !== id));
            }, ANIMATED_CLOUD_DURATION * 1000);
        };

        const interval = setInterval(spawnCloud, ANIMATED_CLOUD_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animated-clouds">
            <AnimatePresence>
                {clouds.map((cloud) => (
                    <motion.img
                        key={cloud.id}
                        src={`/herobackdrop/cloud${String(cloud.image)}.png`}
                        alt="Animated Cloud"
                        className="animated-cloud"
                        initial={{ x: -0.2 * windowWidth }}
                        animate={{ x: 1.2 * windowWidth }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: ANIMATED_CLOUD_DURATION, ease: 'linear' }}
                        style={{ top: `${cloud.top}%` }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const DayBackdrop = () => {
    return (
        <div className="day-backdrop">
            <div className="sky-gradient"></div>
            <StaticClouds />
            <AnimatedClouds />
        </div>
    );
};

export default DayBackdrop;

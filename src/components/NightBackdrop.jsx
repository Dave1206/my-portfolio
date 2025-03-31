import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/NightBackdrop.css';

const NightBackdrop = () => {
    const [showMeteor, setShowMeteor] = useState(false);
    const [positions, setPositions] = useState([]);

    const meteorVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            x: [-100, window.innerWidth / 2, window.innerWidth + 100],
            y: [100, window.innerHeight * 0.5, window.innerHeight * 1],
            rotate: [-30, -15, 0],
            transition: { duration: 4, ease: 'linear' }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < .25) {
                setShowMeteor(true);
                setTimeout(() => setShowMeteor(false), 4000);
            }
        }, 30000);

        setShowMeteor(true);
        setTimeout(() => setShowMeteor(false), 4000);
        return () => clearInterval(interval);
    }, []);

    const generatePositions = () => {
        return Array.from({ length: 30 }).map((_, i) => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
        }));
    };

    useEffect(() => {
        setPositions(generatePositions());
        const interval = setInterval(() => {
            setPositions(generatePositions());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-backdrop">
            <div className="twinkling-stars">
                {positions.map((pos, i) => (
                    <div
                        key={i}
                        className="twinkle-star"
                        style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                    />
                ))}
            </div>

            <AnimatePresence>
                {showMeteor && (
                    <motion.img
                        src="/herobackdrop/meteor.png"
                        alt="Meteor"
                        className="meteor"
                        variants={meteorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default NightBackdrop;

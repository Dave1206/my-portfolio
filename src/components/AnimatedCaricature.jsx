import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/AnimatedCaricature.css';

const AnimatedCaricature = () => {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [eyebrowTransform, setEyebrowTransform] = useState({
    left: { rotation: 0, yOffset: 0 },
    right: { rotation: 0, yOffset: 0 },
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (e) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const xRatio = e.clientX / windowWidth;
        const yRatio = e.clientY / windowHeight;
        
        const normX = (xRatio - 0.5) * 2;
        const normY = (yRatio - 0.5) * 2;
        
        const MAX_EYE_OFFSET = 5;
        const MAX_EYEBROW_ROTATION = 5;
        const MAX_EYEBROW_Y_OFFSET = 3;
        
        setEyeOffset({
          x: normX * MAX_EYE_OFFSET,
          y: normY * MAX_EYE_OFFSET,
        });
        
        setEyebrowTransform({
          left: {
            rotation: normX * MAX_EYEBROW_ROTATION,
            yOffset: -normY * MAX_EYEBROW_Y_OFFSET,
          },
          right: {
            rotation: -normX * MAX_EYEBROW_ROTATION,
            yOffset: -normY * MAX_EYEBROW_Y_OFFSET,
          },
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        const randomX = (Math.random() * 2 - 1);
        const randomY = (Math.random() * 2 - 1);
        const MAX_EYE_OFFSET = 3;
        const MAX_EYEBROW_ROTATION = 4;
        const MAX_EYEBROW_Y_OFFSET = 2;
        
        setEyeOffset({
          x: randomX * MAX_EYE_OFFSET,
          y: randomY * MAX_EYE_OFFSET,
        });
        
        setEyebrowTransform({
          left: {
            rotation: randomX * MAX_EYEBROW_ROTATION,
            yOffset: -randomY * MAX_EYEBROW_Y_OFFSET,
          },
          right: {
            rotation: -randomX * MAX_EYEBROW_ROTATION,
            yOffset: -randomY * MAX_EYEBROW_Y_OFFSET,
          },
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <div className="caricature-container">
      <img
        src="/animatedpfp/baselayer.png"
        alt="Caricature Base"
        className="caricature-base"
      />
      
      <motion.img
        src="/animatedpfp/lefteye.png"
        alt="Left Eye"
        className="caricature-eye left-eye"
        style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            position: 'absolute',
            width: '25%',
            top: '32%',
            left: '42%',
            zIndex: '1',
          }}
      />
      <motion.img
        src="/animatedpfp/righteye.png"
        alt="Right Eye"
        className="caricature-eye right-eye"
        style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
            position: 'absolute',
            width: '20%',
            top: '36.5%',
            left: '19%',
            zIndex: '1',
          }}
      />
      
      <motion.img
        src="/animatedpfp/leftbrow.png"
        alt="Left Eyebrow"
        className="caricature-eyebrow left-eyebrow"
        style={{
            transform: `translateY(${eyebrowTransform.left.yOffset}px) rotate(${eyebrowTransform.left.rotation-10}deg)`,
            position: 'absolute',
            width: '20%',
            top: '30%',
            left: '45%',
            zIndex: '3',
          }}
      />
      <motion.img
        src="/animatedpfp/rightbrow.png"
        alt="Right Eyebrow"
        className="caricature-eyebrow right-eyebrow"
        style={{
            transform: `translateY(${eyebrowTransform.right.yOffset}px) rotate(${eyebrowTransform.right.rotation-5}deg)`,
            position: 'absolute',
            width: '20%',
            top: '33%',
            left: '15%',
            zIndex: '3',
          }}
      />
    </div>
  );
};

export default AnimatedCaricature;

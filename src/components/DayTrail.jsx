import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue } from 'framer-motion';
import Butterfly from './Butterfly';
import '../styles/DayTrail.css';

function DayTrail() {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const dashOffset = useMotionValue(0);
  const [beadPos, setBeadPos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [appHeight, setAppHeight] = useState(window.innerHeight);
  const [pathD, setPathD] = useState('');
  const [showButterfly, setShowButterfly] = useState(false);

  const scrollTimeoutRef = useRef(null);

  const calculatePathD = (width) => {
    const minMargin = 0.05 * width;
    const leftX = Math.max(minMargin, 0.01 * width);
    const rightX = Math.min(width - minMargin, 0.99 * width);

    const heroEl = document.querySelector('.hero');
    const skillsEl = document.querySelector('.skills');
    const projectsEl = document.querySelector('.projects');
    const ctaEl = document.querySelector('.cta-section');
  
    const heroHeight = heroEl ? heroEl.offsetHeight : 0;
    const skillsHeight = skillsEl ? skillsEl.offsetHeight : 0;
    const projectsHeight = projectsEl ? projectsEl.offsetHeight : 0;
    const ctaHeight = ctaEl ? ctaEl.offsetHeight : 0;
  
    const y1 = 25;
    const y2 = y1 + heroHeight + 56;
    const y3 = y2 + skillsHeight;
    const y4 = y3 + projectsHeight;
    const y5 = y4 + ctaHeight * .6;
  
    return `M${leftX},${y1} L${leftX},${y2} L${rightX},${y2} L${rightX},${y3} L${leftX},${y3} L${leftX},${y4} L${rightX},${y4} L${rightX},${y5}`;
  };

  useEffect(() => {
    const newD = calculatePathD(windowWidth);
    setPathD(newD);
  }, [windowWidth, appHeight]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      const element = document.querySelector('.app');
      if (element) {
        setAppHeight(element.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    useEffect(() => {
      const element = document.querySelector('.app');
      if (element) {
        setAppHeight(element.offsetHeight);
      }
    }, []);  

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      pathRef.current.style.strokeDasharray = length;
      dashOffset.set(length);
    }
  }, [pathD, dashOffset]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (pathLength) {
        const offset = (1 - v) * pathLength - v * 400;
        dashOffset.set(offset);
      }
    });
    return () => unsubscribe();
  }, [pathLength, scrollYProgress, dashOffset]);

  useEffect(() => {
    const handleWindowScroll = () => {
      setShowButterfly(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setShowButterfly(true);
      }, 500);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = dashOffset.on("change", (value) => {
      if (pathRef.current && pathLength) {
        const drawnLength = pathLength - value;
        const point = pathRef.current.getPointAtLength(drawnLength);
        setBeadPos({ x: point.x, y: point.y });
      }
    });
    return () => unsubscribe();
  }, [dashOffset, pathLength]);

  return (
    <svg className="day-svg" viewBox={`0 0 ${windowWidth} ${appHeight}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="dayGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFD700" />   {/* Gold */}
          <stop offset="100%" stopColor="#FFA500" />  {/* Orange */}
        </linearGradient>
        <filter id="dayGlow" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feFlood floodColor="#FFD700" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        ref={pathRef}
        d={pathD}
        className="day-path"
        filter="url(#dayGlow)"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: dashOffset,
          stroke: "url(#dayGradient)"
        }}
      />

      <g transform={`translate(${beadPos.x}, ${beadPos.y})`}>
        <motion.circle
          cx="0"
          cy="0"
          r="10"
          fill="url(#dayGradient)"
          className="day-bead"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
          filter="url(#dayGlow)"
        />
        <Butterfly show={showButterfly} beadPos={beadPos} />
      </g>
    </svg>
  );
}

export default DayTrail;

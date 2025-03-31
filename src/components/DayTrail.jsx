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
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [pathD, setPathD] = useState('');
  
  // These states control the butterfly's orientation and visibility.
  const [showButterfly, setShowButterfly] = useState(false);

  const scrollTimeoutRef = useRef(null);

  const calculatePathD = (width, height) => {
    const svgHeight = (height * .8) * 4;
    const minMargin = 0.05 * width;
    const leftX = Math.max(minMargin, 0.01 * width);
    const rightX = Math.min(width - minMargin, 0.99 * width);
    const y1 = 25;
    const y2 = Math.min(svgHeight, .25 * svgHeight);
    const y3 = Math.min(svgHeight, .5 * svgHeight);
    const y4 = Math.min(svgHeight - minMargin, .75 * svgHeight);
    const y5 = Math.min(svgHeight - minMargin, 1 * svgHeight);
    return `M${leftX},${y1} L${leftX},${y2} L${rightX},${y2} L${rightX},${y3} L${leftX},${y3} L${leftX},${y4} L${rightX},${y4} L${rightX},${y5}`;
  };

  useEffect(() => {
    const newD = calculatePathD(windowWidth, windowHeight);
    setPathD(newD);
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        const accelerate = Math.min(v * 1, 1);
        dashOffset.set(pathLength * (1 - accelerate));
      }
    });
    return () => {
      unsubscribe();
    };
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
    <svg className="day-svg" viewBox={`0 0 ${windowWidth} ${(windowHeight * .8) * 4}`} preserveAspectRatio="none">
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

      {/* Group for bead and butterfly: positioned at beadPos */}
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

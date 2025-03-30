import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue } from 'framer-motion';
import '../styles/NeonTrail.css';

function generateZigzagPath() {
  const numPoints = 2 + Math.floor(Math.random() * 3);
  let path = `M0,0`;
  let lastX = 0;
  let lastY = 0;
  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 5 + Math.random() * 10;
    const newX = lastX + Math.cos(angle) * distance;
    const newY = lastY + Math.sin(angle) * distance;
    path += ` L${newX.toFixed(2)},${newY.toFixed(2)}`;
    lastX = newX;
    lastY = newY;
  }
  return path;
}

function Spark({ path, onComplete }) {
  const sparkVariants = {
    initial: { opacity: 1 },
    animate: { 
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <motion.path
      d={path}
      fill="none"
      stroke="var(--accent-color)"
      strokeWidth="2"
      variants={sparkVariants}
      initial="initial"
      animate="animate"
      onAnimationComplete={onComplete}
    />
  );
}

function NeonTrail() {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const dashOffset = useMotionValue(0);
  const [beadPos, setBeadPos] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pathD, setPathD] = useState('');
  const [sparks, setSparks] = useState([]);
  const { scrollYProgress } = useScroll();

  const lastSparkTimeRef = useRef(0);
  const THROTTLE_MS = 100;

  const calculatePathD = (width) => {
    const minMargin = 50;
    const leftX = Math.max(minMargin, 0.01 * width);
    const rightX = Math.min(width - minMargin, 0.65 * width);
    const y1 = 50;
    const y2 = 700;
    const y3 = 1350;
    const y4 = 1600;
    return `M${leftX},${y1} L${leftX},${y2} L${rightX},${y2} L${rightX},${y3} L${leftX},${y3} L${leftX},${y4}`;
  };

  useEffect(() => {
    const newD = calculatePathD(windowWidth);
    setPathD(newD);
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
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
    return () => unsubscribe();
  }, [pathLength, scrollYProgress, dashOffset]);

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

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastSparkTimeRef.current < THROTTLE_MS) return;
      lastSparkTimeRef.current = now;
      
      // Generate a new spark object.
      const newSpark = {
        id: now,
        zigzagPath: generateZigzagPath(),
      };
      setSparks((prev) => [...prev, newSpark]);
      
      // Remove spark after 1 second (after animation finishes).
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.id !== newSpark.id));
      }, 1000);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <svg className="neon-svg" viewBox="0 0 1000 1900" preserveAspectRatio="none">
      <motion.path
        ref={pathRef}
        d={pathD}
        className="neon-path"
        filter="url(#neonGlow)"
        style={{ strokeDasharray: pathLength, strokeDashoffset: dashOffset }}
      />
      <g transform={`translate(${beadPos.x}, ${beadPos.y})`}>
        <motion.circle
          cx="0"
          cy="0"
          r="10"
          fill="var(--accent-color)"
          className="neon-bead"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
          filter="url(#neonGlow)"
        />
        {/* Electricity effect: Render multiple sparks */}
        <g className="electricity-effect">
          {sparks.map((spark) => (
            <Spark
              key={spark.id}
              path={spark.zigzagPath}
              onComplete={() => {}}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

export default NeonTrail;

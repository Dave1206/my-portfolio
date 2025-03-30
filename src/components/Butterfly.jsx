import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

const Butterfly = ({ show }) => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.5, y: -30 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 2, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.7, y: -30, transition: { duration: 0.5, ease: 'easeIn' } }
  };

  const wingVariants = {
    flapThenPause: {
      scaleX: [1.2, 0.5, 1.2,],
      transition: {
        duration: .6,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: 4
      }
    },
    paused: { scaleX: 1 }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.g
          className="butterfly-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ originX: '50%', originY: '50%' }}
        >
            <motion.g >
              {/* Butterfly Body (static image) */}
              <motion.image
                href="/butterfly/butterflyBody.png"
                x="-20"
                y="-20"
                width="40"
                height="40"
                style={{
                  pointerEvents: 'none'
                }}
              />
              {/* Butterfly Wings (animated with flapping) */}
              <motion.image
                href="/butterfly/butterflyWings.png"
                x="-20"
                y="-20"
                width="40"
                height="40"
                variants={wingVariants}
                animate="flapThenPause"
                style={{
                  pointerEvents: 'none'
                }}
              />
            </motion.g>
        </motion.g>
      )}
    </AnimatePresence>
  );
};

export default Butterfly;

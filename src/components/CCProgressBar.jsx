import { motion, transform } from 'framer-motion';
import React from 'react';
import './CCProgressBar.css';

const CCProgressBar = ({ percentage }) => {
  const colorVariants = {
    colorPercentage: (percentage) => ({
      backgroundColor: transform(
        percentage,
        [0, 50, 100],
        ['#dc00e8', '#290cff', '#00ff83']
      ),
      scaleX: percentage / 100,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <div className="progress-bar">
      <motion.div
        className="progress-bar__progress"
        variants={colorVariants}
        animate="colorPercentage"
        custom={percentage}
      ></motion.div>
      <motion.div style={{ position: 'absolute' }}>{`${percentage}%`}</motion.div>
    </div>
  );
};

export default CCProgressBar;

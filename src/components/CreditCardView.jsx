import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../logo.svg';
import './CreditCardView.css';

const filler = Array(16).fill('#');

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  return windowSize;
};

const CreditCardView = ({ state, focused }) => {
  // layoutId: For animating the focus box
  const windowSize = useWindowSize();
  const marginSize = windowSize > 720 ? 7 : 4;
  const fontSize = windowSize > 720 ? 16 : 14;
  const leftPositioning = windowSize > 720 ? '20%' : '8%';
  const isFlipped = focused === 'cc-cvv';
  return (
    <motion.div
      className="credit-card-view"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className="credit-card-view__face credit-card-view__front">
        <div className="credit-card-view__header">
          <span>Very cool credit card</span>
          <img src={logo} className="credit-card-view__logo" alt="logo" />
        </div>
        <div className="credit-card-view__number">
          <AnimatePresence initial={false}>
            {filler.map((character, i) => {
              const marginCoefficient = Math.floor(i / 4);
              const x = `calc(${fontSize * i + marginCoefficient * marginSize}px)`;
              const sharedStyles = {
                left: leftPositioning,
                top: 0,
                x,
                position: 'absolute',
              };
              return (
                <motion.div
                  key={state.number[i] ? `cc-character-${i}` : `cc-character-x-${i}`}
                  initial={{ ...sharedStyles, y: 20, opacity: 0 }}
                  animate={{ ...sharedStyles, y: 0, opacity: 1 }}
                  exit={{ ...sharedStyles, y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="credit-card-view-number__character"
                >
                  {state.number[i] || character}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="credit-card-view__info">
          <div className="credit-card-view-info__block">
            <div className="credit-card-view-info-block__title">Card Holder</div>
            <div className="credit-card-view-info-block__content">FULL NAME</div>
          </div>
          <div className="credit-card-view-info__block">
            <div className="credit-card-view-info-block__title">Expires</div>
            <div className="credit-card-view-info-block__content">MM / YY</div>
          </div>
        </div>
      </div>
      <div className="credit-card-view__face credit-card-view__back">
        <div className="card-view-back__magnet-line" />
        <div className="card-view-back__cvv">
          <label className="card-view-back-cvv__label">cvv</label>
          <div className="card-view-back-cvv__line">1234</div>
        </div>
      </div>
    </motion.div>
  );
};
export default CreditCardView;

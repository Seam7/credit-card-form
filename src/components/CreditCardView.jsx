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
            <div className="credit-card-view-info-block__content">
              {state.holder.length > 0 ? (
              <AnimatePresence initial={false}>
                    {state.holder.split('').map((character, i) => (
                      <motion.span
                        className="credit-card-view-info-block-content__animable"
                        key={`${character}-${i}`}
                        initial={{opacity: 0, y:-5, x: 10 }}
                        animate={{ opacity: 1, y: 0, x: 0}}
                        exit={{ opacity: 0, y:5, x: 0 }}
                        transition={{ duration: 0.2 }} 
                      >
                        {character}
                      </motion.span>
                  ))}
              </AnimatePresence>  
              ) : (
                <div>
                  FULL NAME
                </div>
              )}
            </div>
          </div>
          <div className="credit-card-view-info__block">
            <div className="credit-card-view-info-block__title">Expires</div>
            <div className="credit-card-view-info-block__content">
              <AnimatePresence initial={false} exitBeforeEnter>
                {state.expMonth.length > 0 ? (
                    state.expMonth.split('').map((character, i) => (
                      <motion.span
                        key={`${character}-${i}`}
                        className="credit-card-view-info-block-content__animable"
                        initial={{ opacity: 0, y:-5 }}
                        animate={{ opacity: 1, y: 0}}
                        exit={{ opacity: 0, y:5 }}
                        transition={{ duration: 0.2 }} 
                      >
                        {character}
                      </motion.span>
                  ))
                  ) : (
                    <motion.div
                      key="expMonthPlaceholder"
                      initial={{ opacity: 0, y:-5 }}
                      animate={{ opacity: 1, y: 0}}
                      exit={{ opacity: 0, y:5 }}
                      transition={{ duration: 0.2 }} 
                    >
                      MM
                    </motion.div>
                  )}
              </AnimatePresence>
              {/* <span style={{ position: 'absolute', left: '30px' }}>/</span> */}
              <span>/</span>
              <AnimatePresence initial={false} exitBeforeEnter>
                {state.expYear.length > 0 ? (
                    state.expYear.split('').map((character, i) => (
                      <motion.span
                        key={`${character}-${i}`}
                        className="credit-card-view-info-block-content__animable"
                        initial={{ opacity: 0, y:-5 }}
                        animate={{ opacity: 1, y: 0}}
                        exit={{ opacity: 0, y:5 }}
                        transition={{ duration: 0.2 }} 
                      >
                        {character}
                      </motion.span>
                  ))
                  ) : (
                    <motion.div
                      key="expYearPlaceholder"
                      initial={{ opacity: 0, y:-5 }}
                      animate={{ opacity: 1, y: 0}}
                      exit={{ opacity: 0, y:5 }}
                      transition={{ duration: 0.2 }} 
                    >
                      YY
                    </motion.div>
                  )}
              </AnimatePresence>  
            </div>
          </div>
        </div>
      </div>
      <div className="credit-card-view__face credit-card-view__back">
        <div className="card-view-back__magnet-line" />
        <div className="card-view-back__cvv">
          <label className="card-view-back-cvv__label">CVV</label>
          <div className="card-view-back-cvv__line">
            <AnimatePresence initial={false}>
              {state.cvv.split('').map((character, i) => (
                <motion.span
                  className='card-view-back-cvv__number'
                  key={`${character}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  *
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default CreditCardView;

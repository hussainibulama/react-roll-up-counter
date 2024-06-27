import React, { useState, useEffect, RefObject, CSSProperties } from 'react';
import styles from './RollUpCounter.module.scss';
import cx from 'classnames';

export interface RollUpCounterProps {
  value: number;
  fontSize?: string; // Now fontSize is a number
  transitionDuration?: number; // Now transitionDuration is a number
  slotHeight?: string;
  slotWidth?: string;
  slotClass?: string;
  ref?: RefObject<HTMLDivElement>;
}

const TIMEOUT_TIME = 100;

const RollUpCounter: React.FC<RollUpCounterProps> = ({ value, fontSize = "40px", transitionDuration = 0.5, ref, slotHeight = "40px", slotWidth = "20px", slotClass }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [reset, setReset] = useState(false);
  const [animationIndex, setAnimationIndex] = useState<number | null>(null);

  // Update current and previous values when props change
  useEffect(() => {
    if (value !== currentValue) {
      setPrevValue(currentValue);
      setCurrentValue(value);
      setReset(true); // Trigger reset animation
      setAnimationIndex(null)
    }
  }, [value, currentValue]);

  // Clear reset flag after a short delay
  useEffect(() => {
    if (reset) {
      const timeout = setTimeout(() => setReset(false), TIMEOUT_TIME);
      return () => clearTimeout(timeout);
    }
  }, [reset]);

  // Function to get digits of a number
  const getDigits = (num: number) => {
    return num.toString().split('').map(Number);
  };

  // Get digits arrays for current and previous values
  const currentDigits = getDigits(currentValue);
  const prevDigits = getDigits(prevValue);

  const slotCounterStyle: CSSProperties = {
    display: "flex",
    fontSize: `${fontSize}`, // Use the fontSize prop with rem units
  };

  return (
    <div ref={ref} style={slotCounterStyle}>
      {/* Render each digit slot */}
      {currentDigits?.map((digit, index) => (
        <DigitSlot
          key={index}
          digit={digit}
          prevDigit={prevDigits[index]}
          reset={reset}
          animationIndex={animationIndex}
          currentIndex={index}
          totalDigits={currentDigits.length}
          transitionDuration={transitionDuration}
          onTransitionEnd={() => setAnimationIndex(index)}
          slotHeight={slotHeight}
          slotWidth={slotWidth}
          slotClass={slotClass}
        />
      ))}
    </div>
  );
};

export default RollUpCounter;

export interface DigitSlotProps {
  digit: number;
  prevDigit: number;
  reset: boolean;
  animationIndex: number | null;
  currentIndex: number;
  totalDigits: number;
  transitionDuration: number; // Now transitionDuration is a number
  slotHeight: string;
  slotWidth: string;
  slotClass?: string;
  onTransitionEnd: () => void;
}

export const DigitSlot: React.FC<DigitSlotProps> = ({
  digit,
  prevDigit,
  reset,
  animationIndex,
  currentIndex,
  totalDigits,
  transitionDuration,
  onTransitionEnd,
  slotHeight,
  slotWidth,
  slotClass
}) => {
  // Function to generate arrays based on previous digit
  const generateTransitionSteps = (previous: number): number[] => {
    return Array.from({ length: 10 }, (_, index) => (previous + index) % 10);
  };

  const transitionSteps = generateTransitionSteps(prevDigit || 0);
  const currentDigitIndex = transitionSteps.indexOf(digit);
  const isSameAsPrevious = prevDigit === digit;

  const slotStyle: CSSProperties = {
    width:  `${slotWidth}`,
    height:  `${slotHeight}`,
  };

  const slotInnerStyle: CSSProperties = {
    transform: reset ? `translateY(0)` : `translateY(-${currentDigitIndex * 10}%)`,
    transitionProperty: 'transform',
    transitionDuration: reset ? '0s' : `${transitionDuration}s`, // Use the transitionDuration prop with seconds units
    transitionTimingFunction: 'ease-in-out',
    transitionDelay: reset ? '0s' : `${(totalDigits - 1 - currentIndex) * (transitionDuration + 0.1)}s`,
  };

  const shouldBounce = animationIndex === currentIndex && !isSameAsPrevious;

  return (
    <div className={cx(styles.slot, slotClass)} style={slotStyle}>
      <div
        className={cx(styles.slot_inner, {[styles.bounce]:shouldBounce})}
        style={slotInnerStyle}
        onTransitionEnd={onTransitionEnd}
      >
        {transitionSteps.map((num, i) => (
          <div key={i} className={cx(styles.slot_number)}>
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

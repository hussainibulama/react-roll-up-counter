import { useState, useEffect, RefObject, CSSProperties } from "react";
import DigitSlot from "../DigitSlot";
import { getDigits } from "../../util";

const TIMEOUT_TIME = 100;
export interface RollerProps {
  value: number;
  fontSize?: string; // Now fontSize is a number
  transitionDuration?: number; // Now transitionDuration is a number
  height?: string;
  width?: string;
  className?: string;
  ref?: RefObject<HTMLDivElement>;
}

const Roller = ({
  value,
  fontSize = "40px",
  transitionDuration = 0.5,
  ref,
  height = "40px",
  width = "20px",
  className,
}: RollerProps) => {
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
      setAnimationIndex(null);
    }
  }, [value, currentValue]);

  // Clear reset flag after a short delay
  useEffect(() => {
    if (reset) {
      const timeout = setTimeout(() => setReset(false), TIMEOUT_TIME);
      return () => clearTimeout(timeout);
    }
  }, [reset]);

  // Get digits arrays for current and previous values
  const currentDigits = getDigits(currentValue);
  const prevDigits = getDigits(prevValue);

  const slotCounterStyle: CSSProperties = {
    display: "flex",
    fontSize: !className ? `${fontSize}` : ``,
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
          height={height}
          width={width}
          className={className}
        />
      ))}
    </div>
  );
};

export default Roller;

import { CSSProperties } from "react";
import styles from "./DigitSlot.module.scss";
import cx from "classnames";
import { generateTransitionSteps } from "../../util";

export interface DigitSlotProps {
  digit: number;
  prevDigit: number;
  reset: boolean;
  animationIndex: number | null;
  currentIndex: number;
  totalDigits: number;
  transitionDuration: number; // Now transitionDuration is a number
  height: string;
  width: string;
  className?: string;
  onTransitionEnd: () => void;
}

const DigitSlot = ({
  digit,
  prevDigit,
  reset,
  animationIndex,
  currentIndex,
  totalDigits,
  transitionDuration,
  onTransitionEnd,
  height,
  width,
  className,
}: DigitSlotProps) => {
  const transitionSteps = generateTransitionSteps(prevDigit || 0);
  const currentDigitIndex = transitionSteps.indexOf(digit);
  const isSameAsPrevious = prevDigit === digit;

  const slotStyle: CSSProperties = {
    width: !className ? `${width}` : ``,
    height: !className ? `${height}` : ``,
    margin: !className ? ` 0 0.1rem` : ``,
  };

  const slotInnerStyle: CSSProperties = {
    transform: reset
      ? `translateY(0)`
      : `translateY(-${currentDigitIndex * 10}%)`,
    transitionProperty: "transform",
    transitionDuration: reset ? "0s" : `${transitionDuration}s`, // Use the transitionDuration prop with seconds units
    transitionTimingFunction: "ease-in-out",
    transitionDelay: reset
      ? "0s"
      : `${(totalDigits - 1 - currentIndex) * (transitionDuration + 0.1)}s`,
  };

  const shouldBounce = animationIndex === currentIndex && !isSameAsPrevious;

  return (
    <div className={cx(styles.slot, className)} style={slotStyle}>
      <div
        className={cx(styles.slot_inner, { [styles.bounce]: shouldBounce })}
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

export default DigitSlot;

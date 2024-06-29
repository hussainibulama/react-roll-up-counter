"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _DigitSlot = _interopRequireDefault(require("../DigitSlot"));
var _util = require("../../util");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TIMEOUT_TIME = 100;
const Roller = _ref => {
  let {
    value,
    fontSize = "40px",
    transitionDuration = 0.5,
    ref,
    height = "40px",
    width = "20px",
    className
  } = _ref;
  const [currentValue, setCurrentValue] = (0, _react.useState)(value);
  const [prevValue, setPrevValue] = (0, _react.useState)(value);
  const [reset, setReset] = (0, _react.useState)(false);
  const [animationIndex, setAnimationIndex] = (0, _react.useState)(null);

  // Update current and previous values when props change
  (0, _react.useEffect)(() => {
    if (value !== currentValue) {
      setPrevValue(currentValue);
      setCurrentValue(value);
      setReset(true); // Trigger reset animation
      setAnimationIndex(null);
    }
  }, [value, currentValue]);

  // Clear reset flag after a short delay
  (0, _react.useEffect)(() => {
    if (reset) {
      const timeout = setTimeout(() => setReset(false), TIMEOUT_TIME);
      return () => clearTimeout(timeout);
    }
  }, [reset]);

  // Get digits arrays for current and previous values
  const currentDigits = (0, _util.getDigits)(currentValue);
  const prevDigits = (0, _util.getDigits)(prevValue);
  const slotCounterStyle = {
    display: "flex",
    fontSize: !className ? "".concat(fontSize) : ""
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: ref,
    style: slotCounterStyle,
    children: currentDigits === null || currentDigits === void 0 ? void 0 : currentDigits.map((digit, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DigitSlot.default, {
      digit: digit,
      prevDigit: prevDigits[index],
      reset: reset,
      animationIndex: animationIndex,
      currentIndex: index,
      totalDigits: currentDigits.length,
      transitionDuration: transitionDuration,
      onTransitionEnd: () => setAnimationIndex(index),
      height: height,
      width: width,
      className: className
    }, index))
  });
};
var _default = exports.default = Roller;
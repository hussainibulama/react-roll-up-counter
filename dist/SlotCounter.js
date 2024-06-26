"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DigitSlot = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SlotCounterModule = _interopRequireDefault(require("./SlotCounter.module.scss"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TIMEOUT_TIME = 100;
const SlotCounter = _ref => {
  let {
    value,
    fontSize = "40px",
    transitionDuration = 0.5,
    ref,
    slotHeight = "40px",
    slotWidth = "20px",
    slotClass
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

  // Function to get digits of a number
  const getDigits = num => {
    return num.toString().split('').map(Number);
  };

  // Get digits arrays for current and previous values
  const currentDigits = getDigits(currentValue);
  const prevDigits = getDigits(prevValue);
  const slotCounterStyle = {
    display: "flex",
    fontSize: "".concat(fontSize) // Use the fontSize prop with rem units
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    style: slotCounterStyle
  }, currentDigits === null || currentDigits === void 0 ? void 0 : currentDigits.map((digit, index) => /*#__PURE__*/_react.default.createElement(DigitSlot, {
    key: index,
    digit: digit,
    prevDigit: prevDigits[index],
    reset: reset,
    animationIndex: animationIndex,
    currentIndex: index,
    totalDigits: currentDigits.length,
    transitionDuration: transitionDuration,
    onTransitionEnd: () => setAnimationIndex(index),
    slotHeight: slotHeight,
    slotWidth: slotWidth,
    slotClass: slotClass
  })));
};
var _default = exports.default = SlotCounter;
const DigitSlot = _ref2 => {
  let {
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
  } = _ref2;
  // Function to generate arrays based on previous digit
  const generateTransitionSteps = previous => {
    return Array.from({
      length: 10
    }, (_, index) => (previous + index) % 10);
  };
  const transitionSteps = generateTransitionSteps(prevDigit || 0);
  const currentDigitIndex = transitionSteps.indexOf(digit);
  const isSameAsPrevious = prevDigit === digit;
  const slotStyle = {
    width: "".concat(slotWidth),
    height: "".concat(slotHeight)
  };
  const slotInnerStyle = {
    transform: reset ? "translateY(0)" : "translateY(-".concat(currentDigitIndex * 10, "%)"),
    transitionProperty: 'transform',
    transitionDuration: reset ? '0s' : "".concat(transitionDuration, "s"),
    // Use the transitionDuration prop with seconds units
    transitionTimingFunction: 'ease-in-out',
    transitionDelay: reset ? '0s' : "".concat((totalDigits - 1 - currentIndex) * (transitionDuration + 0.1), "s")
  };
  const shouldBounce = animationIndex === currentIndex && !isSameAsPrevious;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(_SlotCounterModule.default.slot, slotClass),
    style: slotStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(_SlotCounterModule.default.slot_inner, {
      [_SlotCounterModule.default.bounce]: shouldBounce
    }),
    style: slotInnerStyle,
    onTransitionEnd: onTransitionEnd
  }, transitionSteps.map((num, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: i,
    className: (0, _classnames.default)(_SlotCounterModule.default.slot_number)
  }, num))));
};
exports.DigitSlot = DigitSlot;
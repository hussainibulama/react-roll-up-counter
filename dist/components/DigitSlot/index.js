"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DigitSlotModule = _interopRequireDefault(require("./DigitSlot.module.scss"));
var _classnames = _interopRequireDefault(require("classnames"));
var _util = require("../../util");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DigitSlot = _ref => {
  let {
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
    className
  } = _ref;
  const transitionSteps = (0, _util.generateTransitionSteps)(prevDigit || 0);
  const currentDigitIndex = transitionSteps.indexOf(digit);
  const isSameAsPrevious = prevDigit === digit;
  const slotStyle = {
    width: !className ? "".concat(width) : "",
    height: !className ? "".concat(height) : "",
    margin: !className ? " 0 0.1rem" : ""
  };
  const slotInnerStyle = {
    transform: reset ? "translateY(0)" : "translateY(-".concat(currentDigitIndex * 10, "%)"),
    transitionProperty: "transform",
    transitionDuration: reset ? "0s" : "".concat(transitionDuration, "s"),
    // Use the transitionDuration prop with seconds units
    transitionTimingFunction: "ease-in-out",
    transitionDelay: reset ? "0s" : "".concat((totalDigits - 1 - currentIndex) * (transitionDuration + 0.1), "s")
  };
  const shouldBounce = animationIndex === currentIndex && !isSameAsPrevious;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: (0, _classnames.default)(_DigitSlotModule.default.slot, className),
    style: slotStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: (0, _classnames.default)(_DigitSlotModule.default.slot_inner, {
        [_DigitSlotModule.default.bounce]: shouldBounce
      }),
      style: slotInnerStyle,
      onTransitionEnd: onTransitionEnd,
      children: transitionSteps.map((num, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: (0, _classnames.default)(_DigitSlotModule.default.slot_number),
        children: num
      }, i))
    })
  });
};
var _default = exports.default = DigitSlot;
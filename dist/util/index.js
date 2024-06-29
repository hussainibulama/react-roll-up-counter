"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDigits = exports.generateTransitionSteps = void 0;
const generateTransitionSteps = previous => {
  // Function to generate arrays based on previous digit
  const steps = Array.from({
    length: 10
  }, (_, index) => (previous + index) % 10);
  return steps;
};
exports.generateTransitionSteps = generateTransitionSteps;
const getDigits = num => {
  // Function to get digits of a number
  const toArray = num.toString().split("").map(Number);
  return toArray;
};
exports.getDigits = getDigits;
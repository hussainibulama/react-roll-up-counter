export const generateTransitionSteps = (previous: number): number[] => {
  // Function to generate arrays based on previous digit
  const steps = Array.from(
    { length: 10 },
    (_, index) => (previous + index) % 10,
  );
  return steps;
};
export const getDigits = (num: number) => {
  // Function to get digits of a number
  const toArray = num.toString().split("").map(Number);
  return toArray;
};

export const getRandomBetweenWithDecimals = (min: number, max: number, decimals = 1): number => {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(decimals));
};

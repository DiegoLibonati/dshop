export const getFinalPriceByDiscount = (price: number, discount: number): number => {
  if (!discount) return price;
  return Math.ceil(price - (price * discount) / 100);
};

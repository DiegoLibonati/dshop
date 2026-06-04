import { getFinalPriceByDiscount } from "@shared-core/helpers/getFinalPriceByDiscount";

describe("getFinalPriceByDiscount", () => {
  describe("when there is no discount", () => {
    it("should return the original price when the discount is zero", () => {
      expect(getFinalPriceByDiscount(200, 0)).toBe(200);
    });

    it("should return the original price even when it is zero", () => {
      expect(getFinalPriceByDiscount(0, 0)).toBe(0);
    });
  });

  describe("when there is a discount", () => {
    it.each<[number, number, number]>([
      [200, 10, 180],
      [200, 50, 100],
      [100, 100, 0],
      [99, 10, 90],
      [0, 10, 0],
    ])(
      "should return %d discounted by %d percent as %d",
      (price: number, discount: number, expected: number) => {
        expect(getFinalPriceByDiscount(price, discount)).toBe(expected);
      }
    );

    it("should round the discounted price up to the next integer", () => {
      expect(getFinalPriceByDiscount(99, 10)).toBe(90);
    });
  });
});

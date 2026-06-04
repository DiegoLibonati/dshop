import { getParseClothes } from "@container/helpers/getParseClothes";

import { mockApiProduct, mockApiProductWithoutImages } from "@tests/__mocks__/products.mock";

describe("getParseClothes", () => {
  describe("mapping", () => {
    it("should map every api product into a clothes item", () => {
      const clothes = getParseClothes([mockApiProduct, mockApiProductWithoutImages]);

      expect(clothes).toHaveLength(2);
    });

    it("should map the core fields from the api product", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const [clothes] = getParseClothes([mockApiProduct]);

      expect(clothes).toEqual({
        id: String(mockApiProduct.id),
        discount: 0,
        name: mockApiProduct.title,
        price: mockApiProduct.price,
        rate: 1,
        src: mockApiProduct.images[0],
        description: mockApiProduct.description,
      });
    });

    it("should keep the rate within the one-to-five range", () => {
      const [clothes] = getParseClothes([mockApiProduct]);

      expect(clothes!.rate).toBeGreaterThanOrEqual(1);
      expect(clothes!.rate).toBeLessThanOrEqual(5);
    });
  });

  describe("edge cases", () => {
    it("should fall back to an empty string when the product has no images", () => {
      const [clothes] = getParseClothes([mockApiProductWithoutImages]);

      expect(clothes!.src).toBe("");
    });

    it("should return an empty array when there are no products", () => {
      expect(getParseClothes([])).toEqual([]);
    });
  });
});

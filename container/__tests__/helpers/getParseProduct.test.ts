import { getParseProduct } from "@container/helpers/getParseProduct";

import { reviews } from "@container/constants/reviews";

import { mockApiProduct } from "@tests/__mocks__/products.mock";

describe("getParseProduct", () => {
  describe("mapping", () => {
    it("should map the core fields from the api product", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      const product = getParseProduct(mockApiProduct);

      expect(product.id).toBe(String(mockApiProduct.id));
      expect(product.name).toBe(mockApiProduct.title);
      expect(product.price).toBe(mockApiProduct.price);
      expect(product.description).toBe(mockApiProduct.description);
    });

    it("should map every image with a derived id and the title as alt text", () => {
      const product = getParseProduct(mockApiProduct);

      expect(product.images).toEqual(
        mockApiProduct.images.map((image) => ({
          id: `img-${mockApiProduct.id}-${image}`,
          src: image,
          alt: mockApiProduct.title,
        }))
      );
    });

    it("should attach the static reviews collection", () => {
      const product = getParseProduct(mockApiProduct);

      expect(product.reviews).toBe(reviews);
    });

    it("should provide the fixed color and size catalogs", () => {
      const product = getParseProduct(mockApiProduct);

      expect(product.colors.map((color) => color.color)).toEqual(["Red", "Blue", "Black"]);
      expect(product.sizes.map((size) => size.size)).toEqual([
        "Small",
        "Medium",
        "Large",
        "X-Large",
      ]);
    });
  });

  describe("randomized fields", () => {
    it("should keep discount and rate within their configured ranges", () => {
      const product = getParseProduct(mockApiProduct);

      expect(product.discount).toBeGreaterThanOrEqual(10);
      expect(product.discount).toBeLessThanOrEqual(30);
      expect(product.rate).toBeGreaterThanOrEqual(1);
      expect(product.rate).toBeLessThanOrEqual(5);
    });
  });
});

import { ProductAPI } from "@src/entities/app";

import { getParseProduct } from "@src/helpers/getParseProduct";
import { getRandomBetweenWithDecimals } from "@src/helpers/getRandomBetweenWithDecimals";

import { reviews } from "@src/constants/reviews";

import { Product } from "shared_core/SharedCoreEntities";

jest.mock("@src/helpers/getRandomBetweenWithDecimals", () => ({
  getRandomBetweenWithDecimals: jest.fn(),
}));

describe("getParseProduct.ts", () => {
  describe("when apiProduct is provided", () => {
    test("should return a Product with correct mapped fields", () => {
      (getRandomBetweenWithDecimals as jest.Mock)
        .mockReturnValueOnce(20) // discount
        .mockReturnValueOnce(4.5); // rate

      const apiProduct: ProductAPI = {
        id: 1,
        title: "Test Product",
        price: 150,
        description: "Test Description",
        images: ["http://img1.jpg", "http://img2.jpg"],
        slug: "test-product",
        creationAt: "2025-08-30T17:34:27.000Z",
        updatedAt: "2025-08-30T17:34:27.000Z",
        category: {
          id: 1,
          name: "Category",
          slug: "category",
          image: "https://i.imgur.com/QkIa5tT.jpeg",
          creationAt: "2025-08-30T17:34:27.000Z",
          updatedAt: "2025-08-30T17:34:27.000Z",
        },
      };

      const result: Product = getParseProduct(apiProduct);

      expect(result).toEqual({
        id: "1",
        name: "Test Product",
        discount: 20,
        images: [
          {
            id: "img-1-http://img1.jpg",
            src: "http://img1.jpg",
            alt: "Test Product",
          },
          {
            id: "img-1-http://img2.jpg",
            src: "http://img2.jpg",
            alt: "Test Product",
          },
        ],
        price: 150,
        rate: 4.5,
        reviews: reviews,
        colors: [
          { id: "col-1", color: "Red" },
          { id: "col-2", color: "Blue" },
          { id: "col-3", color: "Black" },
        ],
        sizes: [
          { id: "size-1", size: "Small" },
          { id: "size-2", size: "Medium" },
          { id: "size-3", size: "Large" },
          { id: "size-4", size: "X-Large" },
        ],
        description: "Test Description",
      });
    });
  });

  describe("when apiProduct has no images", () => {
    test("should return a Product with empty images array", () => {
      (getRandomBetweenWithDecimals as jest.Mock)
        .mockReturnValueOnce(15) // discount
        .mockReturnValueOnce(3.2); // rate

      const apiProduct: ProductAPI = {
        id: 2,
        title: "No Image Product",
        price: 50,
        description: "No images here",
        images: [],
        slug: "no-image-product",
        creationAt: "2025-08-30T17:34:27.000Z",
        updatedAt: "2025-08-30T17:34:27.000Z",
        category: {
          id: 1,
          name: "Category",
          slug: "category",
          image: "https://i.imgur.com/QkIa5tT.jpeg",
          creationAt: "2025-08-30T17:34:27.000Z",
          updatedAt: "2025-08-30T17:34:27.000Z",
        },
      };

      const result: Product = getParseProduct(apiProduct);

      expect(result.images).toEqual([]);
      expect(result.discount).toBe(15);
      expect(result.rate).toBe(3.2);
    });
  });
});

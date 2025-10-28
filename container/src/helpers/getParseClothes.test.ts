import { ProductAPI } from "@src/entities/app";

import { getParseClothes } from "@src/helpers/getParseClothes";
import { getRandomBetweenWithDecimals } from "@src/helpers/getRandomBetweenWithDecimals";

import { Clothes } from "shared_core/SharedCoreEntities";

jest.mock("@src/helpers/getRandomBetweenWithDecimals", () => ({
  getRandomBetweenWithDecimals: jest.fn(),
}));

describe("getParseClothes.ts", () => {
  describe("when apiProducts contains products", () => {
    test("should map each product with correct fields", () => {
      (getRandomBetweenWithDecimals as jest.Mock).mockReturnValue(3.5);

      const apiProducts: ProductAPI[] = [
        {
          id: 1,
          title: "Product 1",
          price: 100,
          slug: "p1",
          creationAt: "2025-08-30T17:34:27.000Z",
          updatedAt: "2025-08-30T17:34:27.000Z",
          description: "Description 1",
          images: ["http://image1.jpg"],
          category: {
            id: 1,
            name: "Clothes",
            slug: "clothes",
            image: "https://i.imgur.com/QkIa5tT.jpeg",
            creationAt: "2025-08-30T17:34:27.000Z",
            updatedAt: "2025-08-30T17:34:27.000Z",
          },
        },
        {
          id: 2,
          title: "Product 2",
          price: 200,
          slug: "p2",
          creationAt: "2025-08-30T17:34:27.000Z",
          updatedAt: "2025-08-30T17:34:27.000Z",
          description: "Description 2",
          images: ["http://image2.jpg"],
          category: {
            id: 1,
            name: "Clothes",
            slug: "clothes",
            image: "https://i.imgur.com/QkIa5tT.jpeg",
            creationAt: "2025-08-30T17:34:27.000Z",
            updatedAt: "2025-08-30T17:34:27.000Z",
          },
        },
      ];

      const result: Clothes[] = getParseClothes(apiProducts);

      expect(result).toEqual([
        {
          id: "1",
          discount: 0,
          name: "Product 1",
          price: 100,
          rate: 3.5,
          src: "http://image1.jpg",
          description: "Description 1",
        },
        {
          id: "2",
          discount: 0,
          name: "Product 2",
          price: 200,
          rate: 3.5,
          src: "http://image2.jpg",
          description: "Description 2",
        },
      ]);
    });
  });

  describe("when apiProducts is empty", () => {
    test("should return an empty array", () => {
      const result: Clothes[] = getParseClothes([]);
      expect(result).toEqual([]);
    });
  });
});

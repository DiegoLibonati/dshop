import type { ProductAPI } from "@container/types/app";

const category: ProductAPI["category"] = {
  id: 1,
  name: "Clothes",
  slug: "clothes",
  image: "https://example.com/category.png",
  creationAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-02T00:00:00.000Z",
};

export const mockApiProduct: ProductAPI = {
  id: 1,
  title: "Blue Shirt",
  slug: "blue-shirt",
  price: 50,
  description: "A comfortable blue shirt.",
  category,
  images: ["https://example.com/blue-1.png", "https://example.com/blue-2.png"],
  creationAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-02T00:00:00.000Z",
};

export const mockApiProductWithoutImages: ProductAPI = {
  ...mockApiProduct,
  id: 99,
  title: "No Image Product",
  images: [],
};

export const mockApiProducts: ProductAPI[] = Array.from({ length: 22 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    title: `Product ${id}`,
    slug: `product-${id}`,
    price: id * 10,
    description: `Description for product ${id}.`,
    category,
    images: [`https://example.com/product-${id}.png`],
    creationAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  };
});

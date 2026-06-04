import type { Clothes } from "shared-core/sdk";

export const mockClothes: Clothes[] = [
  {
    id: "cl-1",
    src: "https://example.com/cl-1.png",
    name: "Casual Tee",
    rate: 4.1,
    price: 19.99,
    discount: 0,
  },
  {
    id: "cl-2",
    src: "https://example.com/cl-2.png",
    name: "Denim Jacket",
    rate: 4.6,
    price: 59.99,
    discount: 10,
  },
];

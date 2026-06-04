import type { Image, Product } from "shared-core/sdk";

export const mockImages: Image[] = [
  { id: "img-1", src: "https://example.com/img-1.png", alt: "Image one" },
  { id: "img-2", src: "https://example.com/img-2.png", alt: "Image two" },
  { id: "img-3", src: "https://example.com/img-3.png", alt: "Image three" },
  { id: "img-4", src: "https://example.com/img-4.png", alt: "Image four" },
  { id: "img-5", src: "https://example.com/img-5.png", alt: "Image five" },
];

export const mockProduct: Product = {
  id: "prod-1",
  name: "Test Shirt",
  rate: 4.5,
  price: 100,
  discount: 10,
  description: "A comfortable test shirt.",
  images: [
    { id: "img-1", src: "https://example.com/img-1.png", alt: "Image one" },
    { id: "img-2", src: "https://example.com/img-2.png", alt: "Image two" },
  ],
  colors: [
    { id: "col-1", color: "Red" },
    { id: "col-2", color: "Blue" },
  ],
  sizes: [
    { id: "size-1", size: "Small" },
    { id: "size-2", size: "Medium" },
  ],
  reviews: [
    { id: "rev-1", name: "Alice", description: "Great product.", value: 5 },
    { id: "rev-2", name: "Bob", description: "Pretty good.", value: 4 },
  ],
};

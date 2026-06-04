import type { Product } from "shared-core/sdk";

export const PRODUCT_1: Product = {
  id: "prod-001",
  name: "Sport T-Shirt",
  rate: 4.3,
  price: 49.99,
  discount: 10,
  description: "High-quality sports t-shirt, lightweight and breathable.",
  images: [
    {
      id: "img-1",
      src: "https://static.vecteezy.com/system/resources/previews/032/065/699/non_2x/white-t-shirt-mockup-t-shirt-with-short-sleeves-ai-generative-free-png.png",
      alt: "white-t-shirt-mockup-t-shirt-with-short-sleeves-ai-generative-free-png",
    },
    {
      id: "img-2",
      src: "https://i0.wp.com/cuttongarments.com/wp-content/uploads/2017/11/white-copy-8.png?fit=427%2C538&ssl=1",
      alt: "white-copy-8.png",
    },
    {
      id: "img-3",
      src: "https://images.jackjones.com/12259975/4537053/001/jackjones-jjechargeteeo-necknoos-white.png?v=b8b8da2450da3fd86979a6b16a456e49",
      alt: "jackjones-jjechargeteeo-necknoos-white.png",
    },
    {
      id: "img-4",
      src: "https://cdn-ilabanf.nitrocdn.com/tqGMHuzsmqTFSiGQDPlOgzcyUrndJWRT/assets/images/optimized/rev-1337386/www.torontotees.com/wp-content/uploads/2022/09/men-shirt.png",
      alt: "men-shirt.png",
    },
    {
      id: "img-5",
      src: "https://ca.vessi.com/cdn/shop/files/BaseT-shirt-Mens-White-Transparent_grande.png?v=1713217148",
      alt: "BaseT-shirt-Mens-White-Transparent_grande.png",
    },
  ],
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
  reviews: [
    {
      id: "rev-1",
      name: "John Smith",
      description: "Very comfortable and fits perfectly for workouts.",
      value: 5,
    },
    {
      id: "rev-2",
      name: "Emily Johnson",
      description: "The size runs a bit smaller than expected.",
      value: 3,
    },
    {
      id: "rev-3",
      name: "Michael Brown",
      description: "Great value for the price, feels durable.",
      value: 4,
    },
    {
      id: "rev-4",
      name: "Sophia Miller",
      description: "The color holds up well after multiple washes.",
      value: 5,
    },
    {
      id: "rev-5",
      name: "David Wilson",
      description: "Fast delivery, product matches the description.",
      value: 4,
    },
    {
      id: "rev-6",
      name: "Olivia Davis",
      description: "I wish it was a little longer, but still good.",
      value: 3,
    },
  ],
};

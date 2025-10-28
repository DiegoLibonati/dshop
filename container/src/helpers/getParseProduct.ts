import React from "react";

import { ProductAPI } from "@src/entities/app";

import { getRandomBetweenWithDecimals } from "@src/helpers/getRandomBetweenWithDecimals";

import { reviews } from "@src/constants/reviews";

import { Product } from "shared_core/SharedCoreEntities";

export const getParseProduct = (apiProduct: ProductAPI): Product => {
  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    discount: getRandomBetweenWithDecimals(10, 30),
    images: apiProduct.images.map((img) => {
      return {
        id: `img-${apiProduct.id}-${img}`,
        src: img,
        alt: apiProduct.title,
      };
    }),
    price: apiProduct.price,
    rate: getRandomBetweenWithDecimals(1, 5),
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
    description: apiProduct.description,
  };
};

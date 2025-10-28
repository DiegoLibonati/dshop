import React from "react";

import { ProductAPI } from "@src/entities/app";

import { getRandomBetweenWithDecimals } from "@src/helpers/getRandomBetweenWithDecimals";

import { Clothes } from "shared_core/SharedCoreEntities";

export const getParseClothes = (apiProducts: ProductAPI[]): Clothes[] => {
  return apiProducts.map((apiProduct) => {
    return {
      id: String(apiProduct.id),
      discount: 0,
      name: apiProduct.title,
      price: apiProduct.price,
      rate: getRandomBetweenWithDecimals(1, 5),
      src: apiProduct.images[0],
      description: apiProduct.description,
    };
  });
};

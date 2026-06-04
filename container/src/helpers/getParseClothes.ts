import type { ProductAPI } from "@container/types/app";
import type { Clothes } from "shared-core/sdk";

import { getRandomBetweenWithDecimals } from "@container/helpers/getRandomBetweenWithDecimals";

export const getParseClothes = (apiProducts: ProductAPI[]): Clothes[] => {
  return apiProducts.map((apiProduct) => {
    return {
      id: String(apiProduct.id),
      discount: 0,
      name: apiProduct.title,
      price: apiProduct.price,
      rate: getRandomBetweenWithDecimals(1, 5),
      src: apiProduct.images[0] ?? "",
      description: apiProduct.description,
    };
  });
};

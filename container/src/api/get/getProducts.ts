import { GetProductsResponse } from "@src/entities/responses";

import { instanceApi } from "@src/api/apiInstance";

export const getProducts = async (): Promise<GetProductsResponse> => {
  try {
    const response = await instanceApi.get("/products");

    const data: GetProductsResponse = await response.data;

    return data;
  } catch (e) {
    console.log("Error fetching products: ", e);
    throw Error(`Error fetching products: ${e}`);
  }
};

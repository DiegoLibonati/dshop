import { GetProductByIdResponse } from "@src/entities/responses";

import { instanceApi } from "@src/api/apiInstance";

export const getProductById = async (
  id: string
): Promise<GetProductByIdResponse> => {
  try {
    const response = await instanceApi.get(`/products/${id}`);

    const data: GetProductByIdResponse = await response.data;

    return data;
  } catch (e) {
    console.log("Error fetching product by id: ", e);
    throw Error(`Error fetching product by id: ${e}`);
  }
};

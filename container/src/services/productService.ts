import type { ProductAPI } from "@container/types/app";
import type { ResponseDirect } from "@container/types/responses";

const productService = {
  getAll: async (): Promise<ResponseDirect<ProductAPI[]>> => {
    const response = await fetch(`/api/v1/products`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<ProductAPI[]>;
  },

  getById: async (id: number): Promise<ResponseDirect<ProductAPI>> => {
    const response = await fetch(`/api/v1/products/${id}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<ProductAPI>;
  },
};

export default productService;

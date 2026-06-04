import { http, HttpResponse } from "msw";

import productService from "@container/services/productService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockApiProduct, mockApiProducts } from "@tests/__mocks__/products.mock";

describe("productService", () => {
  describe("getAll", () => {
    it("should return the list of products when the request succeeds", async () => {
      mockMswServer.use(
        http.get("/api/v1/products", () => {
          return HttpResponse.json(mockApiProducts);
        })
      );

      const result = await productService.getAll();

      expect(result).toEqual(mockApiProducts);
    });

    it("should throw with the status when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/products", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(productService.getAll()).rejects.toThrow("HTTP error! status: 500");
    });
  });

  describe("getById", () => {
    it("should return the product for the requested id when the request succeeds", async () => {
      let requestedId: string | readonly string[] | undefined;

      mockMswServer.use(
        http.get("/api/v1/products/:id", ({ params }) => {
          requestedId = params.id;
          return HttpResponse.json(mockApiProduct);
        })
      );

      const result = await productService.getById(7);

      expect(requestedId).toBe("7");
      expect(result).toEqual(mockApiProduct);
    });

    it("should throw with the status when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/api/v1/products/:id", () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(productService.getById(1)).rejects.toThrow("HTTP error! status: 404");
    });
  });
});

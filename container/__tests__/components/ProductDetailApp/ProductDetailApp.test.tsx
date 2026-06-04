import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { RemoteMfeProps } from "@container/types/props";

import ProductDetailApp from "@container/components/ProductDetailApp/ProductDetailApp";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

import productService from "@container/services/productService";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockApiProduct, mockApiProducts } from "@tests/__mocks__/products.mock";

const mockRemoteMfe = jest.fn();
const mockGetAll = productService.getAll as jest.Mock;
const mockGetById = productService.getById as jest.Mock;

jest.mock("@container/components/RemoteMfe/RemoteMfe", () => ({
  __esModule: true,
  default: (props: RemoteMfeProps): JSX.Element => {
    mockRemoteMfe(props);
    return <div data-testid="remote-mfe" />;
  },
}));

jest.mock("@container/services/productService", () => ({
  __esModule: true,
  default: { getAll: jest.fn(), getById: jest.fn() },
}));

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

const renderComponent = async (id = "5"): Promise<RenderResult> => {
  let result!: RenderResult;

  await act(async () => {
    result = render(
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <LoadingProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetailApp callbacks={mockCallbacks} />} />
          </Routes>
        </LoadingProvider>
      </MemoryRouter>
    );
    await Promise.resolve();
  });

  return result;
};

describe("ProductDetailApp", () => {
  describe("data loading", () => {
    it("should request the product by the route id and pass the parsed mount data to the remote", async () => {
      mockGetAll.mockResolvedValue(mockApiProducts);
      mockGetById.mockResolvedValue(mockApiProduct);

      await renderComponent("5");

      expect(mockRemoteMfe).toHaveBeenLastCalledWith(
        expect.objectContaining({
          wrapperClass: "product-detail-wrapper",
          callbacks: mockCallbacks,
          mountData: expect.objectContaining({
            product: expect.objectContaining({ name: mockApiProduct.title }),
          }),
        })
      );
      expect(mockGetById).toHaveBeenCalledWith(5);

      const lastCall = mockRemoteMfe.mock.calls.at(-1)?.[0] as RemoteMfeProps;

      expect(lastCall.mountData?.clothesAlsoLike).toHaveLength(mockApiProducts.length);
    });
  });

  describe("error handling", () => {
    it("should render the error state and not mount the remote when the request fails", async () => {
      mockGetAll.mockResolvedValue(mockApiProducts);
      mockGetById.mockRejectedValue(new Error("not found"));

      await renderComponent();

      expect(screen.getByRole("alert")).toHaveTextContent("Error loading product");
      expect(mockGetById).toHaveBeenCalled();
      expect(mockRemoteMfe).not.toHaveBeenCalled();
    });
  });
});

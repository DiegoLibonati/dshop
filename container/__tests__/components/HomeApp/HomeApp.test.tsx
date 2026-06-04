import { act, render, screen } from "@testing-library/react";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { RemoteMfeProps } from "@container/types/props";

import HomeApp from "@container/components/HomeApp/HomeApp";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

import productService from "@container/services/productService";

import { reviews } from "@container/constants/reviews";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockApiProducts } from "@tests/__mocks__/products.mock";

const mockRemoteMfe = jest.fn();
const mockGetAll = productService.getAll as jest.Mock;

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

const renderComponent = async (): Promise<RenderResult> => {
  let result!: RenderResult;

  await act(async () => {
    result = render(
      <LoadingProvider>
        <HomeApp callbacks={mockCallbacks} />
      </LoadingProvider>
    );
    await Promise.resolve();
  });

  return result;
};

describe("HomeApp", () => {
  describe("data loading", () => {
    it("should pass the parsed mount data and callbacks to the remote", async () => {
      mockGetAll.mockResolvedValue(mockApiProducts);

      await renderComponent();

      const lastCall = mockRemoteMfe.mock.calls.at(-1)?.[0] as RemoteMfeProps;

      expect(lastCall).toEqual(
        expect.objectContaining({
          wrapperClass: "home-wrapper",
          callbacks: mockCallbacks,
          mountData: expect.objectContaining({
            brands: ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"],
            reviews,
          }),
        })
      );
      expect(lastCall.mountData?.topSellings).toHaveLength(10);
    });
  });

  describe("error handling", () => {
    it("should render the error state when the products request fails", async () => {
      mockGetAll.mockRejectedValue(new Error("network down"));

      await renderComponent();

      expect(screen.getByRole("alert")).toHaveTextContent("Error loading home");
    });
  });
});

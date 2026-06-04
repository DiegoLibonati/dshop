import { act, waitFor } from "@testing-library/react";

import productService from "@container/services/productService";

import { HeaderModule, NotificationBarModule } from "@tests/__mocks__/sharedAngularSdk.mock";

const mockGetAll = productService.getAll as jest.Mock;

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

jest.mock("shared-angular/sdk", () => {
  const sharedAngularMock = jest.requireActual("@tests/__mocks__/sharedAngularSdk.mock");

  return {
    NotificationBarModule: sharedAngularMock.NotificationBarModule,
    HeaderModule: sharedAngularMock.HeaderModule,
  };
});

jest.mock("home/HomeApp", () => ({ mount: jest.fn(), unmount: jest.fn() }), { virtual: true });

jest.mock("product-detail/ProductDetailApp", () => ({ mount: jest.fn(), unmount: jest.fn() }), {
  virtual: true,
});

describe("bootstrap", () => {
  it("should mount the container shell into the root element", async () => {
    mockGetAll.mockResolvedValue([]);
    document.body.innerHTML = '<div id="root"></div>';

    await act(async () => {
      await import("@container/bootstrap");
    });

    await waitFor(() => {
      expect(NotificationBarModule.mount).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(HeaderModule.mount).toHaveBeenCalled();
    });
  });
});

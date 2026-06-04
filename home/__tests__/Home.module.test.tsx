import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { HomeMfeMountOptions } from "@home/types/mfe";

import { mount, unmount } from "@home/Home.module";

import { mockBrands } from "@tests/__mocks__/brands.mock";
import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockClothes } from "@tests/__mocks__/clothes.mock";
import { mockReviews } from "@tests/__mocks__/reviews.mock";
import { ReviewCustomerModule } from "@tests/__mocks__/sharedAngularSdk.mock";
import { GalleryClothes } from "@tests/__mocks__/sharedReactSdk.mock";

let container: HTMLDivElement;

jest.mock("shared-react/sdk", () => ({ GalleryClothes }));
jest.mock("shared-angular/sdk", () => ({ ReviewCustomerModule }));

const buildOptions = (overrides: Partial<HomeMfeMountOptions> = {}): HomeMfeMountOptions => ({
  brands: mockBrands,
  newArrivals: mockClothes,
  topSellings: mockClothes,
  reviews: mockReviews,
  callbacks: mockCallbacks,
  ...overrides,
});

const mountApp = async (options: HomeMfeMountOptions): Promise<void> => {
  await act(async () => {
    mount(container, options);
    await Promise.resolve();
  });
};

const unmountApp = async (): Promise<void> => {
  await act(async () => {
    unmount(container);
    await Promise.resolve();
  });
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(async () => {
  await unmountApp();
  container.remove();
});

describe("Home.module", () => {
  describe("mount", () => {
    it("should tag the container with the home mfe dataset", async () => {
      await mountApp(buildOptions());

      expect(container.dataset.mfe).toBe("home");
    });

    it("should render the home page into the container", async () => {
      await mountApp(buildOptions());

      expect(container.querySelector<HTMLElement>(".main-home")).toBeInTheDocument();
      await waitFor(() => {
        expect(ReviewCustomerModule.mount).toHaveBeenCalled();
      });
    });

    it("should provide the callbacks so the gallery can navigate", async () => {
      await mountApp(buildOptions());

      const items = await screen.findAllByRole("button", { name: mockClothes[0]!.name });
      const user = userEvent.setup();
      await user.click(items[0]!);

      expect(mockCallbacks.onNavigate).toHaveBeenCalledWith(`/product/${mockClothes[0]!.id}`);
    });

    it("should unmount the previous app when mounting again on the same container", async () => {
      await mountApp(buildOptions());
      await waitFor(() => {
        expect(ReviewCustomerModule.mount).toHaveBeenCalled();
      });

      await mountApp(buildOptions());

      await waitFor(() => {
        expect(ReviewCustomerModule.unmount).toHaveBeenCalled();
      });
    });
  });

  describe("unmount", () => {
    it("should remove the rendered content from the container", async () => {
      await mountApp(buildOptions());
      expect(container.querySelector<HTMLElement>(".main-home")).toBeInTheDocument();

      await unmountApp();

      expect(container.querySelector<HTMLElement>(".main-home")).not.toBeInTheDocument();
    });

    it("should be a no-op when unmounting an unknown container", () => {
      const unknownContainer = document.createElement("div");

      expect(() => {
        unmount(unknownContainer);
      }).not.toThrow();
    });
  });
});

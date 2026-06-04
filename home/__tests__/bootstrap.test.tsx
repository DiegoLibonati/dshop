import { act, screen, waitFor } from "@testing-library/react";

import { ReviewCustomerModule } from "@tests/__mocks__/sharedAngularSdk.mock";
import { GalleryClothes } from "@tests/__mocks__/sharedReactSdk.mock";

jest.mock("shared-react/sdk", () => ({ GalleryClothes }));
jest.mock("shared-angular/sdk", () => ({ ReviewCustomerModule }));

describe("bootstrap", () => {
  it("should mount the home app into the root element", async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await act(async () => {
      await import("@home/bootstrap");
    });

    expect(screen.getByRole("main")).toHaveClass("main-home");
    await waitFor(() => {
      expect(ReviewCustomerModule.mount).toHaveBeenCalled();
    });
  });
});

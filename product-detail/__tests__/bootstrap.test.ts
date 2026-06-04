import { screen, waitFor } from "@testing-library/vue";

import { GalleryClothesModule } from "@tests/__mocks__/sharedReactSdk.mock";
import { ImageWithBackgroundColorModule } from "@tests/__mocks__/sharedCoreSdk.mock";
import { ReviewCustomerModule } from "@tests/__mocks__/sharedAngularSdk.mock";

describe("bootstrap", () => {
  it("should mount the product detail app into the root element", async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import("@product-detail/bootstrap");

    expect(screen.getByRole("main")).toBeInTheDocument();
    await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalled());
    await waitFor(() => expect(GalleryClothesModule.mount).toHaveBeenCalled());
    await waitFor(() => expect(ReviewCustomerModule.mount).toHaveBeenCalled());
  });
});

import { render, screen, waitFor } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";
import type { CounterWithActionsProps } from "shared-core/sdk";
import type { ProductInformationArticleProps } from "@product-detail/types/props";

import ProductInformationArticle from "@product-detail/components/ProductInformationArticle/ProductInformationArticle.vue";

import { lang } from "@product-detail/constants/lang";

import {
  ButtonBlackModule,
  ColorCircleModule,
  CounterWithActionsModule,
  InformationItemClothesModule,
  TagSimpleModule,
} from "@tests/__mocks__/sharedCoreSdk.mock";

interface ClickableProps {
  onClick?: () => void;
}

const defaultProps: ProductInformationArticleProps = {
  name: "Sport T-Shirt",
  rate: 4.3,
  price: 49.99,
  discount: 10,
  description: "Lightweight and breathable.",
  colors: [
    { id: "col-1", color: "Red" },
    { id: "col-2", color: "Blue" },
  ],
  sizes: [
    { id: "size-1", size: "Small" },
    { id: "size-2", size: "Medium" },
    { id: "size-3", size: "Large" },
  ],
};

const renderComponent = (props: Partial<ProductInformationArticleProps> = {}): RenderResult =>
  render(ProductInformationArticle, { props: { ...defaultProps, ...props } });

describe("ProductInformationArticle", () => {
  describe("rendering", () => {
    it("should render the color and size subtitles", () => {
      renderComponent();

      expect(screen.getByText(lang.en.productInformation.color.subTitle)).toBeInTheDocument();
      expect(screen.getByText(lang.en.productInformation.size.subTitle)).toBeInTheDocument();
    });

    it("should mount the information item with the product details", async () => {
      renderComponent();

      await waitFor(() => expect(InformationItemClothesModule.mount).toHaveBeenCalled());
      expect(InformationItemClothesModule.mount).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: defaultProps.name,
          rate: defaultProps.rate,
          price: defaultProps.price,
          discount: defaultProps.discount,
          description: defaultProps.description,
        }),
        expect.anything()
      );
    });

    it("should mount a color circle for each color", async () => {
      renderComponent();

      await waitFor(() =>
        expect(ColorCircleModule.mount).toHaveBeenCalledTimes(defaultProps.colors.length)
      );
    });

    it("should mount a size tag for each size", async () => {
      renderComponent();

      await waitFor(() =>
        expect(TagSimpleModule.mount).toHaveBeenCalledTimes(defaultProps.sizes.length)
      );
    });

    it("should mount the counter with the configured limit", async () => {
      renderComponent();

      await waitFor(() => expect(CounterWithActionsModule.mount).toHaveBeenCalled());
      expect(CounterWithActionsModule.mount).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ limit: 10 }),
        expect.anything()
      );
    });

    it("should mount the add to cart button with its label", async () => {
      renderComponent();

      await waitFor(() => expect(ButtonBlackModule.mount).toHaveBeenCalled());
      expect(ButtonBlackModule.mount).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          ariaLabel: "add to cart",
          children: lang.en.productInformation.addCart,
        }),
        expect.anything()
      );
    });
  });

  describe("edge cases", () => {
    it("should not mount any color circle when there are no colors", async () => {
      renderComponent({ colors: [] });

      await waitFor(() => expect(InformationItemClothesModule.mount).toHaveBeenCalled());
      expect(ColorCircleModule.mount).not.toHaveBeenCalled();
    });

    it("should not mount any size tag when there are no sizes", async () => {
      renderComponent({ sizes: [] });

      await waitFor(() => expect(InformationItemClothesModule.mount).toHaveBeenCalled());
      expect(TagSimpleModule.mount).not.toHaveBeenCalled();
    });
  });

  describe("behavior", () => {
    it("should alert when a color is selected", async () => {
      const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => undefined);
      renderComponent();

      await waitFor(() => expect(ColorCircleModule.mount).toHaveBeenCalled());
      const colorProps = ColorCircleModule.mount.mock.calls[0]![1] as ClickableProps;
      colorProps.onClick?.();

      expect(alertSpy).toHaveBeenCalledWith("Not configured.");
    });

    it("should log the value when the counter changes", async () => {
      const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
      renderComponent();

      await waitFor(() => expect(CounterWithActionsModule.mount).toHaveBeenCalled());
      const counterProps = CounterWithActionsModule.mount.mock
        .calls[0]![1] as CounterWithActionsProps;
      counterProps.onChange(7);

      expect(logSpy).toHaveBeenCalledWith(7);
    });
  });
});

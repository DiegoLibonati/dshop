import { act, within } from "@testing-library/react";

import {
  AnchorCircularModule,
  ButtonBlackModule,
  ButtonWhiteModule,
  ColorCircleModule,
  CounterWithActionsModule,
  FormSearchModule,
  ImageWithBackgroundColorModule,
  InformationItemClothesModule,
  LoaderCircularModule,
  MenuScreenWhiteModule,
  RateStarsModule,
  SkeletonShimmerModule,
  SliderSnapXModule,
  SvgArrowLeftModule,
  SvgArrowRightModule,
  SvgCartShoppingModule,
  SvgCheckModule,
  SvgChevronDownModule,
  SvgChevronUpModule,
  SvgCloseModule,
  SvgFacebookModule,
  SvgHamburgerMenuModule,
  SvgInstagramModule,
  SvgSearchModule,
  SvgSkyStarModule,
  SvgStarToFillModule,
  SvgTwitterModule,
  TagSimpleModule,
} from "@shared-core/exports";

interface ComponentModule {
  mount: (container: HTMLElement, props: never, options?: never) => void;
  unmount: (container: HTMLElement) => void;
}

describe("componentModules", () => {
  describe("exports", () => {
    it.each<[string, ComponentModule]>([
      ["AnchorCircular", AnchorCircularModule],
      ["ButtonBlack", ButtonBlackModule],
      ["ButtonWhite", ButtonWhiteModule],
      ["ColorCircle", ColorCircleModule],
      ["CounterWithActions", CounterWithActionsModule],
      ["FormSearch", FormSearchModule],
      ["ImageWithBackgroundColor", ImageWithBackgroundColorModule],
      ["InformationItemClothes", InformationItemClothesModule],
      ["LoaderCircular", LoaderCircularModule],
      ["MenuScreenWhite", MenuScreenWhiteModule],
      ["RateStars", RateStarsModule],
      ["SkeletonShimmer", SkeletonShimmerModule],
      ["SliderSnapX", SliderSnapXModule],
      ["SvgArrowLeft", SvgArrowLeftModule],
      ["SvgArrowRight", SvgArrowRightModule],
      ["SvgCartShopping", SvgCartShoppingModule],
      ["SvgCheck", SvgCheckModule],
      ["SvgChevronDown", SvgChevronDownModule],
      ["SvgChevronUp", SvgChevronUpModule],
      ["SvgClose", SvgCloseModule],
      ["SvgFacebook", SvgFacebookModule],
      ["SvgHamburgerMenu", SvgHamburgerMenuModule],
      ["SvgInstagram", SvgInstagramModule],
      ["SvgSearch", SvgSearchModule],
      ["SvgSkyStar", SvgSkyStarModule],
      ["SvgStarToFill", SvgStarToFillModule],
      ["SvgTwitter", SvgTwitterModule],
      ["TagSimple", TagSimpleModule],
    ])("should expose mount and unmount from the %s module", (_name, moduleExports) => {
      expect(typeof moduleExports.mount).toBe("function");
      expect(typeof moduleExports.unmount).toBe("function");
    });
  });

  describe("mount and unmount", () => {
    it("should mount and unmount a component through its module", () => {
      const container = document.createElement("div");
      document.body.appendChild(container);

      act(() => {
        ButtonBlackModule.mount(container, {
          ariaLabel: "module button",
          children: "Module Click",
        });
      });

      expect(within(container).getByRole("button", { name: "module button" })).toBeInTheDocument();
      expect(container.dataset.mfe).toBe("shared-core");

      act(() => {
        ButtonBlackModule.unmount(container);
      });

      expect(
        within(container).queryByRole("button", { name: "module button" })
      ).not.toBeInTheDocument();

      container.remove();
    });
  });
});

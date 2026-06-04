import * as SharedCore from "@shared-core/exports";

const sharedCore = SharedCore as Record<string, unknown>;

const componentNames: string[] = [
  "AnchorCircular",
  "ButtonBlack",
  "ButtonWhite",
  "ColorCircle",
  "CounterWithActions",
  "FormSearch",
  "ImageWithBackgroundColor",
  "InformationItemClothes",
  "LoaderCircular",
  "MenuScreenWhite",
  "RateStars",
  "SkeletonShimmer",
  "SliderSnapX",
  "SvgArrowLeft",
  "SvgArrowRight",
  "SvgCartShopping",
  "SvgCheck",
  "SvgChevronDown",
  "SvgChevronUp",
  "SvgClose",
  "SvgFacebook",
  "SvgHamburgerMenu",
  "SvgInstagram",
  "SvgSearch",
  "SvgSkyStar",
  "SvgStarToFill",
  "SvgTwitter",
  "TagSimple",
];

const moduleNames: string[] = componentNames.map((name) => `${name}Module`);

describe("exports", () => {
  describe("runtime entry points", () => {
    it("should expose the mount and unmount functions", () => {
      expect(typeof sharedCore.mount).toBe("function");
      expect(typeof sharedCore.unmount).toBe("function");
    });

    it("should expose the inherited context primitives", () => {
      expect(typeof sharedCore.InheritedProvider).toBe("function");
      expect(typeof sharedCore.useInheritedContext).toBe("function");
      expect(sharedCore.InheritedContext).toBeDefined();
    });
  });

  describe("components", () => {
    it.each(componentNames)("should expose the %s component as a function", (name: string) => {
      expect(typeof sharedCore[name]).toBe("function");
    });
  });

  describe("component modules", () => {
    it.each(moduleNames)("should expose the %s with mount and unmount", (name: string) => {
      const moduleExports = sharedCore[name] as { mount: unknown; unmount: unknown };

      expect(typeof moduleExports.mount).toBe("function");
      expect(typeof moduleExports.unmount).toBe("function");
    });
  });
});

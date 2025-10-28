import { render } from "@testing-library/react";

import { SkeletonShimmerProps } from "@src/entities/props";

import { SkeletonShimmer } from "@src/components/Skeletons/SkeletonShimmer/SkeletonShimmer";

type RenderComponent = {
  props: SkeletonShimmerProps;
  container: HTMLElement;
};

const renderComponent = (rounded: boolean): RenderComponent => {
  const props: SkeletonShimmerProps = {
    rounded: rounded,
    className: "test-class",
  };

  const { container } = render(
    <SkeletonShimmer
      className={props.className}
      rounded={rounded}
    ></SkeletonShimmer>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SkeletonShimmer.tsx", () => {
  describe("General Tests.", () => {
    const rounded = false;

    test("It should represent the root of the skeleton.", () => {
      const { container } = renderComponent(rounded);

      const root = container.querySelector<HTMLDivElement>(".skeleton-shimmer");

      expect(root).toBeInTheDocument();
    });
  });

  describe("With rounded property.", () => {
    const rounded = true;

    test("It must render the skeleton with the rounded class.", () => {
      const { container } = renderComponent(rounded);

      const root = container.querySelector<HTMLDivElement>(".skeleton-shimmer");

      expect(
        root!.classList.contains("skeleton-shimmer--rounded")
      ).toBeTruthy();
    });
  });

  describe("Without rounded property.", () => {
    const rounded = false;

    test("It must render the skeleton without the rounded class.", () => {
      const { container } = renderComponent(rounded);

      const root = container.querySelector<HTMLDivElement>(".skeleton-shimmer");

      expect(root!.classList.contains("skeleton-shimmer--rounded")).toBeFalsy();
    });
  });
});

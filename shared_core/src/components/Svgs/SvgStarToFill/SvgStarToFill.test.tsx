import { render } from "@testing-library/react";

import { SvgStarToFillProps } from "@src/entities/props";

import { SvgStarToFill } from "@src/components/Svgs/SvgStarToFill/SvgStarToFill.tsx";

type RenderComponent = {
  props: SvgStarToFillProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgStarToFillProps = {
    fill: "50",
    inColor: "red",
    outColor: "black",
    className: "test-svg",
  };

  const { container } = render(
    <SvgStarToFill
      className={props.className}
      fill={props.fill}
      inColor={props.inColor}
      outColor={props.outColor}
    ></SvgStarToFill>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgStarToFill.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });

    test("It should render linearGradient with correct stop colors and offsets", () => {
      const { container, props } = renderComponent();

      const stops = container.querySelectorAll<HTMLElement>("stop");

      expect(stops.length).toBe(2);
      expect(stops[0]).toHaveAttribute("offset", `${props.fill}%`);
      expect(stops[0]).toHaveAttribute("stop-color", props.inColor);

      expect(stops[1]).toHaveAttribute("offset", `${props.fill}%`);
      expect(stops[1]).toHaveAttribute("stop-color", props.outColor);
    });

    test("It should use a dynamic gradientId for fill and match in path and svg", () => {
      const { container } = renderComponent();

      const svg = container.querySelector<HTMLElement>("svg");
      const path = container.querySelector<HTMLElement>("path");
      const defs = container.querySelector<HTMLElement>(
        "defs > linearGradient"
      );

      const gradientId = defs!.getAttribute("id");

      expect(svg).toHaveAttribute("fill", `url(#${gradientId})`);
      expect(path).toHaveAttribute("fill", `url(#${gradientId})`);
    });

    test.each([0, 25, 50, 75, 100])(
      "It should render correctly with fill=%s",
      (fill) => {
        const { container } = render(
          <SvgStarToFill
            className="test-svg"
            fill={String(fill)}
            inColor="green"
            outColor="yellow"
          />
        );

        const stops = container.querySelectorAll<HTMLElement>("stop");
        expect(stops[0]).toHaveAttribute("offset", `${fill}%`);
        expect(stops[1]).toHaveAttribute("offset", `${fill}%`);
      }
    );
  });
});

import { render } from "@testing-library/react";

import { SvgSkyStarProps } from "@src/entities/props";

import { SvgSkyStar } from "@src/components/Svgs/SvgSkyStar/SvgSkyStar.tsx";

type RenderComponent = {
  props: SvgSkyStarProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgSkyStarProps = { className: "test-svg" };

  const { container } = render(
    <SvgSkyStar className={props.className}></SvgSkyStar>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgSkyStar.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

import { render } from "@testing-library/react";

import { SvgArrowRightProps } from "@src/entities/props";

import { SvgArrowRight } from "@src/components/Svgs/SvgArrowRight/SvgArrowRight.tsx";

type RenderComponent = {
  props: SvgArrowRightProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgArrowRightProps = { className: "test-svg" };

  const { container } = render(
    <SvgArrowRight className={props.className}></SvgArrowRight>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgArrowRight.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

import { render } from "@testing-library/react";

import { SvgChevronDownProps } from "@src/entities/props";

import { SvgChevronDown } from "@src/components/Svgs/SvgChevronDown/SvgChevronDown.tsx";

type RenderComponent = {
  props: SvgChevronDownProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgChevronDownProps = { className: "test-svg" };

  const { container } = render(
    <SvgChevronDown className={props.className}></SvgChevronDown>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgChevronDown.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

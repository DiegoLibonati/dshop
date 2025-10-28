import { render } from "@testing-library/react";

import { SvgChevronUpProps } from "@src/entities/props";

import { SvgChevronUp } from "@src/components/Svgs/SvgChevronUp/SvgChevronUp.tsx";

type RenderComponent = {
  props: SvgChevronUpProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgChevronUpProps = { className: "test-svg" };

  const { container } = render(
    <SvgChevronUp className={props.className}></SvgChevronUp>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgChevronUp.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

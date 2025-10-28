import { render } from "@testing-library/react";

import { SvgCheckProps } from "@src/entities/props";

import { SvgCheck } from "@src/components/Svgs/SvgCheck/SvgCheck";

type RenderComponent = {
  props: SvgCheckProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgCheckProps = { className: "test-svg" };

  const { container } = render(
    <SvgCheck className={props.className}></SvgCheck>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgCheck.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

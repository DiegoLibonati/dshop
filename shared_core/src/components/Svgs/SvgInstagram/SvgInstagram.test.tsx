import { render } from "@testing-library/react";

import { SvgInstagramProps } from "@src/entities/props";

import { SvgInstagram } from "@src/components/Svgs/SvgInstagram/SvgInstagram.tsx";

type RenderComponent = {
  props: SvgInstagramProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgInstagramProps = { className: "test-svg" };

  const { container } = render(
    <SvgInstagram className={props.className}></SvgInstagram>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgInstagram.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

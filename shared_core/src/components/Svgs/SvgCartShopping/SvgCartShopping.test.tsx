import { render } from "@testing-library/react";

import { SvgCartShoppingProps } from "@src/entities/props";

import { SvgCartShopping } from "@src/components/Svgs/SvgCartShopping/SvgCartShopping.tsx";

type RenderComponent = {
  props: SvgCartShoppingProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgCartShoppingProps = { className: "test-svg" };

  const { container } = render(
    <SvgCartShopping className={props.className}></SvgCartShopping>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgCartShopping.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

import { render } from "@testing-library/react";

import { SvgHamburgerMenuProps } from "@src/entities/props";

import { SvgHamburgerMenu } from "@src/components/Svgs/SvgHamburgerMenu/SvgHamburgerMenu.tsx";

type RenderComponent = {
  props: SvgHamburgerMenuProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgHamburgerMenuProps = { className: "test-svg" };

  const { container } = render(
    <SvgHamburgerMenu className={props.className}></SvgHamburgerMenu>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgHamburgerMenu.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

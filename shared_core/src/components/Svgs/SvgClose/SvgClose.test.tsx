import { render } from "@testing-library/react";

import { SvgCloseProps } from "@src/entities/props";

import { SvgClose } from "@src/components/Svgs/SvgClose/SvgClose.tsx";

type RenderComponent = {
  props: SvgCloseProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgCloseProps = { className: "test-svg" };

  const { container } = render(
    <SvgClose className={props.className}></SvgClose>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgClose.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

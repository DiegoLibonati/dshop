import { render } from "@testing-library/react";

import { SvgArrowLeftProps } from "@src/entities/props";

import { SvgArrowLeft } from "@src/components/Svgs/SvgArrowLeft/SvgArrowLeft.tsx";

type RenderComponent = {
  props: SvgArrowLeftProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgArrowLeftProps = { className: "test-svg" };

  const { container } = render(
    <SvgArrowLeft className={props.className}></SvgArrowLeft>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgArrowLeft.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

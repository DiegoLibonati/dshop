import { render } from "@testing-library/react";

import { SvgTwitterProps } from "@src/entities/props";

import { SvgTwitter } from "@src/components/Svgs/SvgTwitter/SvgTwitter.tsx";

type RenderComponent = {
  props: SvgTwitterProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgTwitterProps = { className: "test-svg" };

  const { container } = render(
    <SvgTwitter className={props.className}></SvgTwitter>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgTwitter.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

import { render } from "@testing-library/react";

import { SvgFacebookProps } from "@src/entities/props";

import { SvgFacebook } from "@src/components/Svgs/SvgFacebook/SvgFacebook.tsx";

type RenderComponent = {
  props: SvgFacebookProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgFacebookProps = { className: "test-svg" };

  const { container } = render(
    <SvgFacebook className={props.className}></SvgFacebook>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgFacebook.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

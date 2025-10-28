import { render } from "@testing-library/react";

import { SvgSearchProps } from "@src/entities/props";

import { SvgSearch } from "@src/components/Svgs/SvgSearch/SvgSearch.tsx";

type RenderComponent = {
  props: SvgSearchProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SvgSearchProps = { className: "test-svg" };

  const { container } = render(
    <SvgSearch className={props.className}></SvgSearch>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SvgSearch.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the svg.", () => {
      const { props, container } = renderComponent();

      const svg = container.querySelector<HTMLElement>(`.${props.className}`);

      expect(svg).toBeInTheDocument();
    });
  });
});

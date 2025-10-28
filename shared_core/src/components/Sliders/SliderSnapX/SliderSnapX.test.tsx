import { render, screen } from "@testing-library/react";

import { SliderSnapXProps } from "@src/entities/props";

import { SliderSnapX } from "@src/components/Sliders/SliderSnapX/SliderSnapX";

type RenderComponent = {
  props: SliderSnapXProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: SliderSnapXProps = {
    children: "hola",
    className: "test-class",
  };

  const { container } = render(
    <SliderSnapX className={props.className}>{props.children}</SliderSnapX>
  );

  return {
    props: props,
    container: container,
  };
};

describe("SliderSnapX.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the slider with the default class.", () => {
      const { container } = renderComponent();

      const root = container.querySelector<HTMLDivElement>(".slider-snap-x");

      expect(root).toBeInTheDocument();
    });

    test("It must render content entered by props and the class by props entered properly.", () => {
      const { props } = renderComponent();

      const content = screen.getByText(props.children as string);

      expect(content).toBeInTheDocument();
    });
  });
});

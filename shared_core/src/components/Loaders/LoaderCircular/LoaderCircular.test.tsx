import { render } from "@testing-library/react";

import { LoaderCircularProps } from "@src/entities/props";

import { LoaderCircular } from "@src/components/Loaders/LoaderCircular/LoaderCircular";

type RenderComponent = {
  props: LoaderCircularProps;
  container: HTMLElement;
};

const renderComponent = (rounded: boolean): RenderComponent => {
  const props: LoaderCircularProps = {
    className: "test-class",
  };

  const { container } = render(
    <LoaderCircular className={props.className}></LoaderCircular>
  );

  return {
    props: props,
    container: container,
  };
};

describe("LoaderCircular.tsx", () => {
  describe("General Tests.", () => {
    const rounded = false;

    test("It should render root loader.", () => {
      const { container } = renderComponent(rounded);

      const root = container.querySelector<HTMLDivElement>(".loader");

      expect(root).toBeInTheDocument();
    });
  });
});

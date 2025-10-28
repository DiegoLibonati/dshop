import { render, screen } from "@testing-library/react";

import { LoaderScreenProps } from "@src/entities/props";

import { LoaderScreen } from "@src/components/composed/Loaders/LoaderScreen/LoaderScreen.tsx";

type RenderComponent = {
  props: LoaderScreenProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: LoaderScreenProps = {
    className: "class-test",
  };

  const { container } = render(
    <LoaderScreen className={props.className}></LoaderScreen>
  );

  return {
    props: props,
    container: container,
  };
};

describe("LoaderScreen.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the LoaderScreen component.", () => {
      const { container } = renderComponent();

      const root = container.querySelector<HTMLDivElement>(".loader-screen");

      screen.debug();

      expect(root).toBeInTheDocument();
    });
  });
});

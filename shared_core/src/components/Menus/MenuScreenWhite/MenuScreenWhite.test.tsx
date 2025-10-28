import { render, screen } from "@testing-library/react";

import { MenuScreenWhiteProps } from "@src/entities/props";

import { MenuScreenWhite } from "@src/components/Menus/MenuScreenWhite/MenuScreenWhite";

type RenderComponent = {
  props: MenuScreenWhiteProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props: MenuScreenWhiteProps = {
    children: "hola",
    className: "menu-screen-white-test",
  };

  const { container } = render(
    <MenuScreenWhite className={props.className}>
      {props.children}
    </MenuScreenWhite>
  );

  return {
    props: props,
    container: container,
  };
};

describe("MenuScreenWhite.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the root of the menu.", () => {
      const { container } = renderComponent();

      const root =
        container.querySelector<HTMLDivElement>(".menu-screen-white");

      expect(root).toBeInTheDocument();
      expect(root!.classList.contains("menu-screen-white")).toBeTruthy();
    });

    test("It must render the content passed by props in the menu.", () => {
      const { props } = renderComponent();

      const children = screen.getByText(props.children as string);

      expect(children).toBeInTheDocument();
    });
  });
});

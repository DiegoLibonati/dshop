import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { HeaderOptionProps } from "@src/entities/props";

import { HeaderOption } from "@src/components/composed/Headers/HeaderOption/HeaderOption";

type RenderComponent = {
  props: HeaderOptionProps & { onClick: jest.Mock };
  container: HTMLElement;
};

const renderComponent = (isMenu: boolean, open: boolean): RenderComponent => {
  const props: HeaderOptionProps & { onClick: jest.Mock } = {
    name: "namcito",
    isMenu: isMenu,
    open: open,
    onClick: jest.fn(),
  };

  const { container } = render(
    <HeaderOption
      name={props.name}
      isMenu={props.isMenu}
      onClick={props.onClick}
      open={props.open}
    ></HeaderOption>
  );

  return {
    props: props,
    container: container,
  };
};

describe("HeaderOption.tsx", () => {
  describe("General Tests.", () => {
    const isMenu = false;
    const open = false;

    test("It must render the component.", () => {
      const { props } = renderComponent(isMenu, open);

      const headerOption = screen.getByRole("button", {
        name: `header ${props.name}`,
      });

      expect(headerOption).toBeInTheDocument();
    });

    test("It must render name.", () => {
      const { props } = renderComponent(isMenu, open);

      const name = screen.getByText(props.name);

      expect(name).toBeInTheDocument();
    });

    test("It must execute the relevant function when clicking on the header option.", async () => {
      const { props } = renderComponent(isMenu, open);

      const headerOption = screen.getByRole("button", {
        name: `header ${props.name}`,
      });

      await user.click(headerOption);

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Without isMenu.", () => {
    const isMenu = false;
    const open = false;

    test("It should not render the button to open.", () => {
      const { container } = renderComponent(isMenu, open);

      const icon = container.querySelector<HTMLDivElement>(
        ".header__option-icon-wrapper"
      );

      expect(icon).not.toBeInTheDocument();
    });
  });
});

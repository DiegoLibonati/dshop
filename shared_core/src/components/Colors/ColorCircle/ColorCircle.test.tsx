import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ColorCircleProps } from "@src/entities/props";

import { ColorCircle } from "@src/components/Colors/ColorCircle/ColorCircle";

type RenderComponent = {
  props: ColorCircleProps & { onClick: jest.Mock };
  container: HTMLElement;
};

const renderComponent = (isActive: boolean): RenderComponent => {
  const props: ColorCircleProps & { onClick: jest.Mock } = {
    color: "rgb(0, 153, 255)",
    onClick: jest.fn(),
    isActive: isActive,
    className: "test-svg",
  };

  const { container } = render(
    <ColorCircle
      color={props.color}
      isActive={props.isActive}
      onClick={props.onClick}
      className={props.className}
    ></ColorCircle>
  );

  return {
    props: props,
    container: container,
  };
};

describe("ColorCircle.tsx", () => {
  describe("General Tests.", () => {
    const isActive = false;

    test("It should render the color circle", () => {
      const { container } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(".color-circle");

      expect(root).toBeInTheDocument();
    });

    test("It must render color.", () => {
      const { container, props } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(".color-circle");

      expect(root!.style.backgroundColor).toEqual(props.color);
    });

    test("It should execute the relevant function when the color is clicked.", async () => {
      const { container, props } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(".color-circle");

      await user.click(root!);

      expect(props.onClick).toHaveBeenCalledTimes(1);
      expect(root!.classList.contains("color-circle--pointer")).toBeTruthy();
    });
  });

  describe("isActive false", () => {
    const isActive = false;

    test("It must not render check.", () => {
      const { container } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(".color-circle");
      const check = root!.children?.[0];

      expect(check).toBeFalsy();
    });
  });

  describe("isActive true", () => {
    const isActive = true;

    test("It must render check.", () => {
      const { container } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(".color-circle");
      const check = root!.children[0];

      expect(check).toBeInTheDocument();
    });
  });
});

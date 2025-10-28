import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ImageWithBackgroundColorProps } from "@src/entities/props";

import { ImageWithBackgroundColor } from "@src/components/Images/ImageWithBackgroundColor/ImageWithBackgroundColor.tsx";

type RenderComponent = {
  props: ImageWithBackgroundColorProps & { onClick: jest.Mock };
  container: HTMLElement;
};

const renderComponent = (isActive: boolean): RenderComponent => {
  const props: ImageWithBackgroundColorProps & { onClick: jest.Mock } = {
    src: "pepe-test",
    alt: "pepe-test-alt",
    bgColor: "red",
    isActive: isActive,
    className: "test-class",
    onClick: jest.fn(),
  };

  const { container } = render(
    <ImageWithBackgroundColor
      src={props.src}
      alt={props.alt}
      bgColor={props.bgColor}
      isActive={props.isActive}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </ImageWithBackgroundColor>
  );

  return {
    props: props,
    container: container,
  };
};

describe("ImageWithBackgroundColor.tsx", () => {
  describe("General Tests.", () => {
    const isActive = false;

    test("It should render the component.", () => {
      const { container } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(
        ".image-with-background-color-wrapper"
      );

      expect(root).toBeInTheDocument();
    });

    test("It must render the image.", () => {
      const { props } = renderComponent(isActive);

      const img = screen.getByAltText(props.alt);

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", props.src);
    });

    test("It must apply the background color.", () => {
      const { container, props } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(
        ".image-with-background-color-wrapper"
      );

      expect(root!.style.backgroundColor).toEqual(props.bgColor);
    });

    test("It must execute the relevant function when you click on the image.", async () => {
      const { container, props } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(
        ".image-with-background-color-wrapper"
      );

      await user.click(root!);

      expect(props.onClick).toHaveBeenCalledTimes(1);
      expect(
        root!.classList.contains("image-with-background-color-wrapper--pointer")
      ).toBeTruthy();
    });
  });

  describe("isActive false.", () => {
    const isActive = false;

    test("It should not render root with the active property.", () => {
      const { container } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(
        ".image-with-background-color-wrapper"
      );

      expect(
        root!.classList.contains("image-with-background-color-wrapper--active")
      ).toBeFalsy();
    });
  });

  describe("isActive true.", () => {
    const isActive = true;

    test("It should render root with the active property.", () => {
      const { container } = renderComponent(isActive);

      const root = container.querySelector<HTMLDivElement>(
        ".image-with-background-color-wrapper"
      );

      expect(
        root!.classList.contains("image-with-background-color-wrapper--active")
      ).toBeTruthy();
    });
  });
});

import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { CarrouselWithTitleAndArrowsProps } from "@src/entities/props";

import { CarrouselWithTitleAndArrows } from "@src/components/composed/Carrousels/CarrouselWithTitleAndArrows/CarrouselWithTitleAndArrows";

type RenderComponent = {
  props: CarrouselWithTitleAndArrowsProps;
  container: HTMLElement;
};

const CLASSNAME_ITEM_CHILDREN = "item";

const renderComponent = (): RenderComponent => {
  const props: CarrouselWithTitleAndArrowsProps = {
    className: "test-props",
    children: <div className={CLASSNAME_ITEM_CHILDREN}>123</div>,
  };

  const { container } = render(
    <CarrouselWithTitleAndArrows className={props.className}>
      {props.children}
    </CarrouselWithTitleAndArrows>
  );

  return {
    props: props,
    container: container,
  };
};

describe("CarrouselWithTitleAndArrows.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the component.", () => {
      const { container } = renderComponent();

      const root = container.querySelector<HTMLDivElement>(
        ".carousel-with-title-and-arrows"
      );

      expect(root).toBeInTheDocument();
    });

    test("It must render the header, title, and actions.", () => {
      const { container } = renderComponent();

      const header = container.querySelector<HTMLDivElement>(
        ".carousel-with-title-and-arrows__header"
      );
      const title = header!.querySelector<HTMLHeadingElement>(
        ".carousel-with-title-and-arrows__header-title"
      );
      const btnPrevItem = screen.getByRole("button", { name: "prev item" });
      const btnNextItem = screen.getByRole("button", { name: "next item" });

      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(btnPrevItem).toBeInTheDocument();
      expect(btnNextItem).toBeInTheDocument();
    });

    test("It must render the content container and the items.", () => {
      const { container } = renderComponent();

      const content = container.querySelector<HTMLDivElement>(
        ".carousel-with-title-and-arrows__content"
      );
      const item = content!.querySelector<HTMLDivElement>(
        `.${CLASSNAME_ITEM_CHILDREN}`
      );

      expect(content).toBeInTheDocument();
      expect(item).toBeInTheDocument();
    });
  });

  describe("Button prev item click behavior.", () => {
    let scrollByMock: jest.Mock;

    beforeEach(() => {
      scrollByMock = jest.fn();
      HTMLElement.prototype.scrollBy = scrollByMock;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("It must execute the scroll function when the button is clicked.", async () => {
      renderComponent();

      const btnPrevItem = screen.getByRole("button", { name: "prev item" });

      expect(btnPrevItem).toBeInTheDocument();

      await user.click(btnPrevItem);

      expect(scrollByMock).toHaveBeenCalledTimes(1);
      expect(scrollByMock).toHaveBeenCalledWith({
        left: expect.any(Number),
        behavior: "smooth",
      });
    });
  });

  describe("Button next item click behavior.", () => {
    let scrollByMock: jest.Mock;

    beforeEach(() => {
      scrollByMock = jest.fn();
      HTMLElement.prototype.scrollBy = scrollByMock;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("It must execute the scroll function when the button is clicked.", async () => {
      renderComponent();

      const btnNextItem = screen.getByRole("button", { name: "next item" });

      expect(btnNextItem).toBeInTheDocument();

      await user.click(btnNextItem);

      expect(scrollByMock).toHaveBeenCalledTimes(1);
      expect(scrollByMock).toHaveBeenCalledWith({
        left: expect.any(Number),
        behavior: "smooth",
      });
    });
  });
});

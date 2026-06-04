import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import CarrouselWithTitleAndArrows from "@home/components/Carrousels/CarrouselWithTitleAndArrows/CarrouselWithTitleAndArrows";

import { lang } from "@home/constants/lang";

const renderComponent = (): RenderResult =>
  render(
    <CarrouselWithTitleAndArrows>
      <div data-testid="carousel-child">child content</div>
    </CarrouselWithTitleAndArrows>
  );

const getContent = (container: HTMLElement): HTMLDivElement => {
  const content = container.querySelector<HTMLDivElement>(
    ".carousel-with-title-and-arrows__content"
  );
  if (!content) throw new Error("carousel content not found");
  return content;
};

const stubScroll = (content: HTMLDivElement, width: number): jest.Mock => {
  Object.defineProperty(content, "offsetWidth", { configurable: true, value: width });
  const scrollBySpy = jest.fn();
  content.scrollBy = scrollBySpy;
  return scrollBySpy;
};

describe("CarrouselWithTitleAndArrows", () => {
  describe("rendering", () => {
    it("should render the happy customers title", async () => {
      renderComponent();

      expect(
        screen.getByRole("heading", { level: 2, name: lang.en.ourHappyCustomers.title })
      ).toBeInTheDocument();

      await waitFor(() => {
        expect(document.querySelectorAll<SVGSVGElement>("svg")).toHaveLength(2);
      });
    });

    it("should render the children inside the content track", async () => {
      const { container } = renderComponent();

      expect(getContent(container)).toContainElement(screen.getByTestId("carousel-child"));

      await waitFor(() => {
        expect(container.querySelectorAll<SVGSVGElement>("svg")).toHaveLength(2);
      });
    });

    it("should render previous and next arrow buttons", async () => {
      renderComponent();

      expect(screen.getByRole("button", { name: "prev item" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "next item" })).toBeInTheDocument();

      await waitFor(() => {
        expect(document.querySelectorAll<SVGSVGElement>("svg")).toHaveLength(2);
      });
    });
  });

  describe("behavior", () => {
    it("should scroll the content one page to the left when the previous arrow is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const scrollBySpy = stubScroll(getContent(container), 600);

      await user.click(screen.getByRole("button", { name: "prev item" }));

      expect(scrollBySpy).toHaveBeenCalledWith({ left: -600, behavior: "smooth" });
    });

    it("should scroll the content one page to the right when the next arrow is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const scrollBySpy = stubScroll(getContent(container), 600);

      await user.click(screen.getByRole("button", { name: "next item" }));

      expect(scrollBySpy).toHaveBeenCalledWith({ left: 600, behavior: "smooth" });
    });
  });
});

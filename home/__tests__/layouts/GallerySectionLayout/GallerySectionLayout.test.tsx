import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { GallerySectionLayoutProps } from "@home/types/props";

import GallerySectionLayout from "@home/layouts/GallerySectionLayout/GallerySectionLayout";

const mockOnClick = jest.fn();

const renderComponent = (props: Partial<GallerySectionLayoutProps> = {}): RenderResult => {
  const defaultProps: GallerySectionLayoutProps = {
    btnText: "View All",
    onClick: mockOnClick,
    className: "new-arrivals",
    ...props,
  };

  const children: JSX.Element = <div data-testid="layout-child">gallery content</div>;

  return render(<GallerySectionLayout {...defaultProps}>{children}</GallerySectionLayout>);
};

describe("GallerySectionLayout", () => {
  describe("rendering", () => {
    it("should render its children", async () => {
      renderComponent();

      expect(screen.getByTestId("layout-child")).toBeInTheDocument();
      await screen.findByRole("button", { name: "View All-gallery-button" });
    });

    it("should apply the gallery section class together with the provided className", async () => {
      const { container } = renderComponent({ className: "top-sellings" });

      expect(container.querySelector<HTMLElement>(".gallery-section")).toHaveClass(
        "gallery-section",
        "top-sellings"
      );
      await screen.findByRole("button", { name: "View All-gallery-button" });
    });

    it("should render the action button labelled from the button text", async () => {
      renderComponent({ btnText: "See more" });

      expect(
        await screen.findByRole("button", { name: "See more-gallery-button" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onClick when the action button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent({ btnText: "View All" });

      const button = await screen.findByRole("button", { name: "View All-gallery-button" });
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import PresentationSection from "@home/components/Sections/PresentationSection/PresentationSection";

import { lang } from "@home/constants/lang";

const renderComponent = (): RenderResult => render(<PresentationSection />);

const flushRemotes = async (container: HTMLElement): Promise<void> => {
  await screen.findByRole("button", { name: "shop now" });
  await waitFor(() => {
    expect(container.querySelectorAll<SVGSVGElement>("svg")).toHaveLength(4);
  });
};

describe("PresentationSection", () => {
  describe("rendering", () => {
    it("should render the presentation title and description", async () => {
      const { container } = renderComponent();

      expect(
        screen.getByRole("heading", { level: 2, name: lang.en.presentation.title })
      ).toBeInTheDocument();
      expect(screen.getByText(lang.en.presentation.description)).toBeInTheDocument();

      await flushRemotes(container);
    });

    it("should render the statistic counts with their labels", async () => {
      const { container } = renderComponent();

      expect(screen.getByText("200+")).toBeInTheDocument();
      expect(screen.getByText(lang.en.presentation.international_brands)).toBeInTheDocument();
      expect(screen.getByText("2,000+")).toBeInTheDocument();
      expect(screen.getByText(lang.en.presentation.high_quality_products)).toBeInTheDocument();
      expect(screen.getByText("30,000+")).toBeInTheDocument();
      expect(screen.getByText(lang.en.presentation.happy_customers)).toBeInTheDocument();

      await flushRemotes(container);
    });

    it("should render the mobile and desktop presentation illustrations", async () => {
      const { container } = renderComponent();

      expect(screen.getAllByAltText("presentation-mobile-img")).toHaveLength(2);

      await flushRemotes(container);
    });

    it("should render the shop now button once the remote resolves", async () => {
      const { container } = renderComponent();

      expect(await screen.findByRole("button", { name: "shop now" })).toHaveTextContent(
        lang.en.presentation.button_shop_now
      );

      await flushRemotes(container);
    });
  });

  describe("behavior", () => {
    it("should alert that the action is not configured when the shop now button is clicked", async () => {
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => undefined);
      const user = userEvent.setup();
      const { container } = renderComponent();

      await user.click(await screen.findByRole("button", { name: "shop now" }));

      expect(alertSpy).toHaveBeenCalledWith("Not configured.");

      await flushRemotes(container);
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import BrowseByDressStyleSection from "@home/components/Sections/BrowseByDressStyleSection/BrowseByDressStyleSection";

import { DressStylesProvider } from "@home/contexts/DressStylesContext/DressStylesProvider";

import { lang } from "@home/constants/lang";

const renderComponent = (): RenderResult =>
  render(
    <DressStylesProvider>
      <BrowseByDressStyleSection />
    </DressStylesProvider>
  );

describe("BrowseByDressStyleSection", () => {
  describe("rendering", () => {
    it("should render the section title", () => {
      renderComponent();

      expect(
        screen.getByRole("heading", { level: 2, name: lang.en.browseByDressStyle.title })
      ).toBeInTheDocument();
    });

    it("should render an illustration for each dress style after initialization", async () => {
      renderComponent();

      expect(
        await screen.findByRole("button", { name: "illustration casual" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "illustration formal" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "illustration party" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "illustration gym" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should alert that the action is not configured when a style is clicked", async () => {
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => undefined);
      const user = userEvent.setup();
      renderComponent();

      await user.click(await screen.findByRole("button", { name: "illustration casual" }));

      expect(alertSpy).toHaveBeenCalledWith("Not configured.");
    });
  });
});

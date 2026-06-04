import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InheritedProvider } from "shared-core/sdk";

import type { RenderResult } from "@testing-library/react";
import type { Clothes } from "shared-core/sdk";
import type { TopSellingsContext as TopSellingsContextValue } from "@home/types/contexts";

import TopSellingSection from "@home/components/Sections/TopSellingSection/TopSellingSection";

import { TopSellingsContext } from "@home/contexts/TopSellingsContext/TopSellingsContext";

import { lang } from "@home/constants/lang";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockClothes } from "@tests/__mocks__/clothes.mock";
import { GalleryClothes } from "@tests/__mocks__/sharedReactSdk.mock";

const mockHandleSetTopSellings = jest.fn();

jest.mock("shared-react/sdk", () => ({ GalleryClothes }));

const renderComponent = (clothes: Clothes[] | null = mockClothes): RenderResult => {
  const value: TopSellingsContextValue = {
    topSellingsState: { clothes },
    handleSetTopSellings: mockHandleSetTopSellings,
  };

  return render(
    <InheritedProvider callbacks={mockCallbacks}>
      <TopSellingsContext.Provider value={value}>
        <TopSellingSection />
      </TopSellingsContext.Provider>
    </InheritedProvider>
  );
};

describe("TopSellingSection", () => {
  describe("rendering", () => {
    it("should render the top selling gallery title", async () => {
      renderComponent();

      expect(await screen.findByText(lang.en.top_selling.title)).toBeInTheDocument();
      await screen.findByRole("button", {
        name: `${lang.en.top_selling.button_view_all}-gallery-button`,
      });
    });

    it("should render the view all action button", async () => {
      renderComponent();

      expect(
        await screen.findByRole("button", {
          name: `${lang.en.top_selling.button_view_all}-gallery-button`,
        })
      ).toBeInTheDocument();
      await screen.findByText(lang.en.top_selling.title);
    });

    it("should render a clickable entry for each clothes item", async () => {
      renderComponent();

      expect(await screen.findByRole("button", { name: mockClothes[0]!.name })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: mockClothes[1]!.name })).toBeInTheDocument();
      await screen.findByRole("button", {
        name: `${lang.en.top_selling.button_view_all}-gallery-button`,
      });
    });
  });

  describe("behavior", () => {
    it("should alert that the action is not configured when view all is clicked", async () => {
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => undefined);
      const user = userEvent.setup();
      renderComponent();

      await user.click(
        await screen.findByRole("button", {
          name: `${lang.en.top_selling.button_view_all}-gallery-button`,
        })
      );

      expect(alertSpy).toHaveBeenCalledWith("Not configured.");
      await screen.findByText(lang.en.top_selling.title);
    });

    it("should navigate to the product detail when a clothes item is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(await screen.findByRole("button", { name: mockClothes[0]!.name }));

      expect(mockCallbacks.onNavigate).toHaveBeenCalledWith(`/product/${mockClothes[0]!.id}`);
      await screen.findByRole("button", {
        name: `${lang.en.top_selling.button_view_all}-gallery-button`,
      });
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InheritedProvider } from "shared-core/sdk";

import type { RenderResult } from "@testing-library/react";
import type { Clothes } from "shared-core/sdk";
import type { NewArrivalsContext as NewArrivalsContextValue } from "@home/types/contexts";

import NewArrivalsSection from "@home/components/Sections/NewArrivalsSection/NewArrivalsSection";

import { NewArrivalsContext } from "@home/contexts/NewArrivalsContext/NewArrivalsContext";

import { lang } from "@home/constants/lang";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockClothes } from "@tests/__mocks__/clothes.mock";
import { GalleryClothes } from "@tests/__mocks__/sharedReactSdk.mock";

const mockHandleSetNewArrivals = jest.fn();

jest.mock("shared-react/sdk", () => ({ GalleryClothes }));

const renderComponent = (clothes: Clothes[] | null = mockClothes): RenderResult => {
  const value: NewArrivalsContextValue = {
    newArrivalsState: { clothes },
    handleSetNewArrivals: mockHandleSetNewArrivals,
  };

  return render(
    <InheritedProvider callbacks={mockCallbacks}>
      <NewArrivalsContext.Provider value={value}>
        <NewArrivalsSection />
      </NewArrivalsContext.Provider>
    </InheritedProvider>
  );
};

describe("NewArrivalsSection", () => {
  describe("rendering", () => {
    it("should render the new arrivals gallery title", async () => {
      renderComponent();

      expect(await screen.findByText(lang.en.new_arrivals.title)).toBeInTheDocument();
      await screen.findByRole("button", {
        name: `${lang.en.new_arrivals.button_view_all}-gallery-button`,
      });
    });

    it("should render the view all action button", async () => {
      renderComponent();

      expect(
        await screen.findByRole("button", {
          name: `${lang.en.new_arrivals.button_view_all}-gallery-button`,
        })
      ).toBeInTheDocument();
      await screen.findByText(lang.en.new_arrivals.title);
    });

    it("should render a clickable entry for each clothes item", async () => {
      renderComponent();

      expect(await screen.findByRole("button", { name: mockClothes[0]!.name })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: mockClothes[1]!.name })).toBeInTheDocument();
      await screen.findByRole("button", {
        name: `${lang.en.new_arrivals.button_view_all}-gallery-button`,
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
          name: `${lang.en.new_arrivals.button_view_all}-gallery-button`,
        })
      );

      expect(alertSpy).toHaveBeenCalledWith("Not configured.");
      await screen.findByText(lang.en.new_arrivals.title);
    });

    it("should navigate to the product detail when a clothes item is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(await screen.findByRole("button", { name: mockClothes[0]!.name }));

      expect(mockCallbacks.onNavigate).toHaveBeenCalledWith(`/product/${mockClothes[0]!.id}`);
      await screen.findByRole("button", {
        name: `${lang.en.new_arrivals.button_view_all}-gallery-button`,
      });
    });
  });
});

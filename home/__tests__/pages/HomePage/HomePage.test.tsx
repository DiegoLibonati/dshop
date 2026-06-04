import { render, screen, waitFor } from "@testing-library/react";
import { InheritedProvider } from "shared-core/sdk";

import type { RenderResult } from "@testing-library/react";
import type { HomePageProps } from "@home/types/props";

import HomePage from "@home/pages/HomePage/HomePage";

import { BrandsProvider } from "@home/contexts/BrandsContext/BrandsProvider";
import { DressStylesProvider } from "@home/contexts/DressStylesContext/DressStylesProvider";
import { HappyCustomersProvider } from "@home/contexts/HappyCustomersContext/HappyCustomersProvider";
import { NewArrivalsProvider } from "@home/contexts/NewArrivalsContext/NewArrivalsProvider";
import { TopSellingsProvider } from "@home/contexts/TopSellingsContext/TopSellingsProvider";

import { lang } from "@home/constants/lang";

import { mockBrands } from "@tests/__mocks__/brands.mock";
import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockClothes } from "@tests/__mocks__/clothes.mock";
import { mockReviews } from "@tests/__mocks__/reviews.mock";
import { ReviewCustomerModule } from "@tests/__mocks__/sharedAngularSdk.mock";
import { GalleryClothes } from "@tests/__mocks__/sharedReactSdk.mock";

jest.mock("shared-react/sdk", () => ({ GalleryClothes }));
jest.mock("shared-angular/sdk", () => ({ ReviewCustomerModule }));

const renderPage = (props: Partial<HomePageProps> = {}): RenderResult => {
  const defaultProps: HomePageProps = {
    brands: mockBrands,
    newArrivals: mockClothes,
    topSellings: mockClothes,
    reviews: mockReviews,
    ...props,
  };

  return render(
    <InheritedProvider callbacks={mockCallbacks}>
      <BrandsProvider>
        <NewArrivalsProvider>
          <TopSellingsProvider>
            <DressStylesProvider>
              <HappyCustomersProvider>
                <HomePage {...defaultProps} />
              </HappyCustomersProvider>
            </DressStylesProvider>
          </TopSellingsProvider>
        </NewArrivalsProvider>
      </BrandsProvider>
    </InheritedProvider>
  );
};

const flushHome = async (): Promise<void> => {
  await screen.findByRole("button", { name: "shop now" });
  await screen.findByText(lang.en.new_arrivals.title);
  await screen.findByText(lang.en.top_selling.title);
  await waitFor(() => {
    expect(document.querySelectorAll<SVGSVGElement>("svg")).toHaveLength(6);
  });
};

describe("HomePage", () => {
  describe("rendering", () => {
    it("should render the main home landmark", async () => {
      renderPage();

      expect(screen.getByRole("main")).toHaveClass("main-home");

      await flushHome();
    });

    it("should render the brands provided through props", async () => {
      renderPage();

      mockBrands.forEach((brand) => {
        expect(screen.getByRole("heading", { level: 2, name: brand })).toBeInTheDocument();
      });

      await flushHome();
    });

    it("should render the presentation and browse by dress style titles", async () => {
      renderPage();

      expect(
        screen.getByRole("heading", { level: 2, name: lang.en.presentation.title })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: lang.en.browseByDressStyle.title })
      ).toBeInTheDocument();

      await flushHome();
    });

    it("should render an illustration for every dress style", async () => {
      renderPage();

      expect(screen.getByRole("button", { name: "illustration casual" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "illustration formal" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "illustration party" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "illustration gym" })).toBeInTheDocument();

      await flushHome();
    });

    it("should render the new arrivals and top selling gallery titles", async () => {
      renderPage();

      expect(await screen.findByText(lang.en.new_arrivals.title)).toBeInTheDocument();
      expect(await screen.findByText(lang.en.top_selling.title)).toBeInTheDocument();

      await flushHome();
    });
  });

  describe("initialization", () => {
    it("should mount a review customer for every review provided through props", async () => {
      renderPage();

      await waitFor(() => {
        expect(ReviewCustomerModule.mount).toHaveBeenCalledTimes(mockReviews.length);
      });

      await flushHome();
    });
  });
});

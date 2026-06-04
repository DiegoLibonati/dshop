import { render, screen, waitFor } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { Review } from "shared-core/sdk";
import type { HappyCustomersContext as HappyCustomersContextValue } from "@home/types/contexts";

import OurHappyCustomersSection from "@home/components/Sections/OurHappyCustomersSection/OurHappyCustomersSection";

import { HappyCustomersContext } from "@home/contexts/HappyCustomersContext/HappyCustomersContext";

import { lang } from "@home/constants/lang";

import { mockReviews } from "@tests/__mocks__/reviews.mock";
import { ReviewCustomerModule } from "@tests/__mocks__/sharedAngularSdk.mock";

const mockHandleSetReviews = jest.fn();

jest.mock("shared-angular/sdk", () => ({ ReviewCustomerModule }));

const renderComponent = (reviews: Review[] | null = mockReviews): RenderResult => {
  const value: HappyCustomersContextValue = {
    happyCustomersState: { reviews },
    handleSetReviews: mockHandleSetReviews,
  };

  return render(
    <HappyCustomersContext.Provider value={value}>
      <OurHappyCustomersSection />
    </HappyCustomersContext.Provider>
  );
};

const flushArrows = async (): Promise<void> => {
  await waitFor(() => {
    expect(document.querySelectorAll<SVGSVGElement>("svg")).toHaveLength(2);
  });
};

describe("OurHappyCustomersSection", () => {
  describe("rendering", () => {
    it("should render the carousel title", async () => {
      renderComponent();

      expect(
        screen.getByRole("heading", { level: 2, name: lang.en.ourHappyCustomers.title })
      ).toBeInTheDocument();

      await flushArrows();
    });

    it("should mount a review customer for each review", async () => {
      renderComponent();

      await waitFor(() => {
        expect(ReviewCustomerModule.mount).toHaveBeenCalledTimes(mockReviews.length);
      });

      await flushArrows();
    });

    it("should pass each review details to the mounted review customer", async () => {
      renderComponent();

      await waitFor(() => {
        expect(ReviewCustomerModule.mount).toHaveBeenCalled();
      });

      const firstReview = mockReviews[0]!;
      expect(ReviewCustomerModule.mount).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          name: firstReview.name,
          description: firstReview.description,
          maxStars: 5,
          valueStars: firstReview.value,
        })
      );

      await flushArrows();
    });
  });

  describe("edge cases", () => {
    it("should not mount any review customer when there are no reviews", async () => {
      renderComponent([]);

      expect(
        screen.getByRole("heading", { level: 2, name: lang.en.ourHappyCustomers.title })
      ).toBeInTheDocument();
      expect(ReviewCustomerModule.mount).not.toHaveBeenCalled();

      await flushArrows();
    });
  });
});

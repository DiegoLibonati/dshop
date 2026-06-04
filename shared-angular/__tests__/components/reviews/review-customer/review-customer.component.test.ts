import { TestBed } from "@angular/core/testing";
import { screen } from "@testing-library/dom";

import type { ComponentFixture } from "@angular/core/testing";
import type { ReviewCustomerProps } from "@shared-angular/types/props";

import ReviewCustomerComponent from "@shared-angular/components/reviews/review-customer/review-customer.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import * as mockSharedCoreSdk from "@tests/__mocks__/shared-core-sdk.mock";

interface RenderResult {
  fixture: ComponentFixture<ReviewCustomerComponent>;
  component: ReviewCustomerComponent;
}

jest.mock("shared-core/sdk", () => mockSharedCoreSdk);

const renderComponent = async (
  inputs: Partial<ReviewCustomerProps> = {}
): Promise<RenderResult> => {
  await TestBed.configureTestingModule({
    imports: [ReviewCustomerComponent],
    providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
  }).compileComponents();

  const fixture = TestBed.createComponent(ReviewCustomerComponent);

  Object.entries(inputs).forEach(([key, value]) => {
    fixture.componentRef.setInput(key, value);
  });

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component: fixture.componentInstance };
};

const getContainer = (fixture: ComponentFixture<ReviewCustomerComponent>): HTMLDivElement => {
  const div = (fixture.nativeElement as HTMLElement).querySelector<HTMLDivElement>(
    ".review-customer"
  );

  if (!div) throw new Error("review-customer container not found");

  return div;
};

describe("review-customer.component", () => {
  describe("rendering", () => {
    it("should render the customer name as a heading", async () => {
      await renderComponent({ name: "Sarah M." });

      expect(screen.getByRole("heading", { name: "Sarah M." })).toBeInTheDocument();
    });

    it("should render the review description", async () => {
      await renderComponent({ description: "Great quality and fast shipping." });

      expect(screen.getByText("Great quality and fast shipping.")).toBeInTheDocument();
    });

    it("should apply the provided className to the container", async () => {
      const { fixture } = await renderComponent({ className: "review-customer-test" });

      expect(getContainer(fixture)).toHaveClass("review-customer", "review-customer-test");
    });
  });

  describe("defaults", () => {
    it("should default maxStars to 5 and valueStars to 0", async () => {
      const { component } = await renderComponent();

      expect(component.maxStars).toBe(5);
      expect(component.valueStars).toBe(0);
    });

    it("should expose the in and out star colors", async () => {
      const { component } = await renderComponent();

      expect(component.inColorStars).toBe("#FFC633");
      expect(component.outColorStars).toBe("#FFFFFF");
    });
  });

  describe("shared mfe loaders", () => {
    it("should resolve the rate stars module", async () => {
      const { component } = await renderComponent();

      await expect(component.loadRateStars()).resolves.toBe(mockSharedCoreSdk.RateStarsModule);
    });
  });
});

import { TestBed } from "@angular/core/testing";
import { screen } from "@testing-library/dom";

import type { ComponentFixture } from "@angular/core/testing";

import AppTestComponent from "@shared-angular/components/app-test/app-test.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import * as mockSharedCoreSdk from "@tests/__mocks__/shared-core-sdk.mock";

interface RenderResult {
  fixture: ComponentFixture<AppTestComponent>;
  component: AppTestComponent;
}

jest.mock("shared-core/sdk", () => mockSharedCoreSdk);

const renderComponent = async (): Promise<RenderResult> => {
  await TestBed.configureTestingModule({
    imports: [AppTestComponent],
    providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
  }).compileComponents();

  const fixture = TestBed.createComponent(AppTestComponent);

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component: fixture.componentInstance };
};

describe("app-test.component", () => {
  describe("rendering", () => {
    it("should render the showcase title", async () => {
      await renderComponent();

      expect(screen.getByRole("heading", { name: "Component Showcase" })).toBeInTheDocument();
    });

    it("should render a section title for each showcased component", async () => {
      await renderComponent();

      expect(screen.getByRole("heading", { name: "App-Header" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Review-Customer" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Notification-Bar" })).toBeInTheDocument();
    });

    it("should render the header with the DShop name", async () => {
      await renderComponent();

      expect(screen.getByRole("heading", { name: "DShop" })).toBeInTheDocument();
    });

    it("should render the review customer name", async () => {
      await renderComponent();

      expect(screen.getByRole("heading", { name: "Sarah M." })).toBeInTheDocument();
    });

    it("should render the projected notification text", async () => {
      await renderComponent();

      expect(screen.getByText("pepe")).toBeInTheDocument();
    });
  });

  describe("default handlers", () => {
    it("should log without throwing for every default showcase handler", async () => {
      const mockLog = jest.spyOn(console, "log").mockImplementation(() => undefined);
      const { component } = await renderComponent();

      component.onHeaderDefaultClickMenu(new MouseEvent("click"));
      component.onHeaderDefaultClickTitle(new MouseEvent("click"));
      component.onHeaderDefaultSubmitSearch("query");
      component.onHeaderDefaultClickSearch(new MouseEvent("click"));
      component.onHeaderDefaultClickCart(new MouseEvent("click"));
      component.onNotificationBarDefaultClose();

      expect(mockLog).toHaveBeenCalledTimes(6);
    });
  });
});

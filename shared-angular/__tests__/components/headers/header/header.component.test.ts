import { TestBed } from "@angular/core/testing";
import { screen, fireEvent } from "@testing-library/dom";

import type { ComponentFixture } from "@angular/core/testing";
import type { HeaderProps } from "@shared-angular/types/props";

import HeaderComponent from "@shared-angular/components/headers/header/header.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import * as mockSharedCoreSdk from "@tests/__mocks__/shared-core-sdk.mock";

interface RenderResult {
  fixture: ComponentFixture<HeaderComponent>;
  component: HeaderComponent;
}

jest.mock("shared-core/sdk", () => mockSharedCoreSdk);

const renderComponent = async (inputs: Partial<HeaderProps> = {}): Promise<RenderResult> => {
  await TestBed.configureTestingModule({
    imports: [HeaderComponent],
    providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
  }).compileComponents();

  const fixture = TestBed.createComponent(HeaderComponent);

  Object.entries(inputs).forEach(([key, value]) => {
    fixture.componentRef.setInput(key, value);
  });

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component: fixture.componentInstance };
};

describe("header.component", () => {
  describe("rendering", () => {
    it("should render the header banner", async () => {
      await renderComponent();

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render the provided name as the logo title", async () => {
      await renderComponent({ name: "DShop" });

      expect(screen.getByRole("heading", { name: "DShop" })).toBeInTheDocument();
    });

    it("should apply the provided className to the header", async () => {
      await renderComponent({ name: "DShop", className: "header-test" });

      expect(screen.getByRole("banner")).toHaveClass("header", "header-test");
    });

    it("should add the fixed modifier when isFixed is true", async () => {
      await renderComponent({ name: "DShop", isFixed: true });

      expect(screen.getByRole("banner")).toHaveClass("header--fixed");
    });

    it("should render the menu, search and cart action buttons", async () => {
      await renderComponent();

      expect(screen.getByRole("button", { name: "header open" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "header search" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "header cart" })).toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("should call onClickMenu when the menu button is clicked", async () => {
      const mockOnClickMenu = jest.fn();
      await renderComponent({ onClickMenu: mockOnClickMenu });

      fireEvent.click(screen.getByRole("button", { name: "header open" }));

      expect(mockOnClickMenu).toHaveBeenCalledTimes(1);
    });

    it("should call onClickTitle when the logo title is clicked", async () => {
      const mockOnClickTitle = jest.fn();
      await renderComponent({ name: "DShop", onClickTitle: mockOnClickTitle });

      fireEvent.click(screen.getByRole("heading", { name: "DShop" }));

      expect(mockOnClickTitle).toHaveBeenCalledTimes(1);
    });

    it("should call onClickSearch when the search button is clicked", async () => {
      const mockOnClickSearch = jest.fn();
      await renderComponent({ onClickSearch: mockOnClickSearch });

      fireEvent.click(screen.getByRole("button", { name: "header search" }));

      expect(mockOnClickSearch).toHaveBeenCalledTimes(1);
    });

    it("should call onClickCart when the cart button is clicked", async () => {
      const mockOnClickCart = jest.fn();
      await renderComponent({ onClickCart: mockOnClickCart });

      fireEvent.click(screen.getByRole("button", { name: "header cart" }));

      expect(mockOnClickCart).toHaveBeenCalledTimes(1);
    });
  });

  describe("shared mfe loaders", () => {
    it("should resolve the hamburger menu module", async () => {
      const { component } = await renderComponent();

      await expect(component.loadSvgHamburgerMenu()).resolves.toBe(
        mockSharedCoreSdk.SvgHamburgerMenuModule
      );
    });

    it("should resolve the search icon module", async () => {
      const { component } = await renderComponent();

      await expect(component.loadSvgSearch()).resolves.toBe(mockSharedCoreSdk.SvgSearchModule);
    });

    it("should resolve the cart shopping module", async () => {
      const { component } = await renderComponent();

      await expect(component.loadSvgCartShopping()).resolves.toBe(
        mockSharedCoreSdk.SvgCartShoppingModule
      );
    });

    it("should resolve the form search module", async () => {
      const { component } = await renderComponent();

      await expect(component.loadFormSearch()).resolves.toBe(mockSharedCoreSdk.FormSearchModule);
    });
  });

  describe("default handlers", () => {
    it("should log without throwing for the default click and submit handlers", async () => {
      const mockLog = jest.spyOn(console, "log").mockImplementation(() => undefined);
      const { component } = await renderComponent();

      component.onDefaultClickMenu(new MouseEvent("click"));
      component.onDefaultClickTitle(new MouseEvent("click"));
      component.onDefaultSubmitSearch("query");
      component.onDefaultClickSearch(new MouseEvent("click"));
      component.onDefaultClickCart(new MouseEvent("click"));

      expect(mockLog).toHaveBeenCalledTimes(5);
    });
  });
});

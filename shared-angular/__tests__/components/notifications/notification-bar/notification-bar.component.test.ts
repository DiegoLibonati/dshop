import { TestBed } from "@angular/core/testing";
import { screen, fireEvent } from "@testing-library/dom";

import type { ComponentFixture } from "@angular/core/testing";
import type { NotificationBarProps } from "@shared-angular/types/props";

import NotificationBarComponent from "@shared-angular/components/notifications/notification-bar/notification-bar.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import * as mockSharedCoreSdk from "@tests/__mocks__/shared-core-sdk.mock";

interface RenderResult {
  fixture: ComponentFixture<NotificationBarComponent>;
  component: NotificationBarComponent;
}

jest.mock("shared-core/sdk", () => mockSharedCoreSdk);

const renderComponent = async (
  inputs: Partial<NotificationBarProps> = {}
): Promise<RenderResult> => {
  await TestBed.configureTestingModule({
    imports: [NotificationBarComponent],
    providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
  }).compileComponents();

  const fixture = TestBed.createComponent(NotificationBarComponent);

  Object.entries(inputs).forEach(([key, value]) => {
    fixture.componentRef.setInput(key, value);
  });

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component: fixture.componentInstance };
};

const getContainer = (fixture: ComponentFixture<NotificationBarComponent>): HTMLDivElement => {
  const div = (fixture.nativeElement as HTMLElement).querySelector<HTMLDivElement>(
    ".notification-bar"
  );

  if (!div) throw new Error("notification-bar container not found");

  return div;
};

const getCloseButton = (fixture: ComponentFixture<NotificationBarComponent>): HTMLButtonElement => {
  const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
    ".notification-bar__btn-close"
  );

  if (!button) throw new Error("notification-bar close button not found");

  return button;
};

describe("notification-bar.component", () => {
  describe("rendering", () => {
    it("should render the provided text", async () => {
      await renderComponent({ text: "Sign up and get 20% off" });

      expect(screen.getByText("Sign up and get 20% off")).toBeInTheDocument();
    });

    it("should render the close button", async () => {
      const { fixture } = await renderComponent();

      expect(getCloseButton(fixture)).toHaveAttribute("aria-label", "close notification bar");
    });

    it("should apply the provided className to the container", async () => {
      const { fixture } = await renderComponent({ className: "notification-bar-test" });

      expect(getContainer(fixture)).toHaveClass("notification-bar", "notification-bar-test");
    });
  });

  describe("user interactions", () => {
    it("should call onClose when the close button is clicked", async () => {
      const mockOnClose = jest.fn();
      const { fixture } = await renderComponent({ onClose: mockOnClose });

      fireEvent.click(getCloseButton(fixture));

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("shared mfe loaders", () => {
    it("should resolve the close icon module", async () => {
      const { component } = await renderComponent();

      await expect(component.loadSvgClose()).resolves.toBe(mockSharedCoreSdk.SvgCloseModule);
    });
  });

  describe("default handlers", () => {
    it("should log without throwing for the default close handler", async () => {
      const mockLog = jest.spyOn(console, "log").mockImplementation(() => undefined);
      const { component } = await renderComponent();

      component.onDefaultClose();

      expect(mockLog).toHaveBeenCalledTimes(1);
    });
  });
});

import { TestBed } from "@angular/core/testing";
import { screen } from "@testing-library/dom";

import type { ComponentFixture } from "@angular/core/testing";

import AppTestPageComponent from "@shared-angular/pages/app-test-page/app-test-page.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import * as mockSharedCoreSdk from "@tests/__mocks__/shared-core-sdk.mock";

interface RenderResult {
  fixture: ComponentFixture<AppTestPageComponent>;
  component: AppTestPageComponent;
}

jest.mock("shared-core/sdk", () => mockSharedCoreSdk);

const renderPage = async (): Promise<RenderResult> => {
  await TestBed.configureTestingModule({
    imports: [AppTestPageComponent],
    providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
  }).compileComponents();

  const fixture = TestBed.createComponent(AppTestPageComponent);

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component: fixture.componentInstance };
};

describe("app-test-page.component", () => {
  describe("rendering", () => {
    it("should render the app-test showcase", async () => {
      const { fixture } = await renderPage();

      expect(fixture.nativeElement.querySelector<HTMLElement>("app-test")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Component Showcase" })).toBeInTheDocument();
    });

    it("should render the showcased header banner", async () => {
      await renderPage();

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
  });
});

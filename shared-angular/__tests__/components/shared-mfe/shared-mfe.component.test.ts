import { TestBed } from "@angular/core/testing";

import type { ComponentFixture } from "@angular/core/testing";
import type { SharedComponentModule } from "shared-core/sdk";

import SharedMfeComponent from "@shared-angular/components/shared-mfe/shared-mfe.component";

import { MFE_CALLBACKS } from "@shared-angular/tokens/mfe-callbacks.token";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";

interface RenderOptions {
  loader: () => Promise<SharedComponentModule>;
  componentProps?: Record<string, unknown>;
  wrapperClass?: string;
  loadingClass?: string;
}

interface RenderResult {
  fixture: ComponentFixture<SharedMfeComponent>;
  component: SharedMfeComponent;
}

const renderComponent = async ({
  loader,
  componentProps = {},
  wrapperClass,
  loadingClass,
}: RenderOptions): Promise<RenderResult> => {
  await TestBed.configureTestingModule({
    imports: [SharedMfeComponent],
    providers: [{ provide: MFE_CALLBACKS, useValue: mockCallbacks }],
  }).compileComponents();

  const fixture = TestBed.createComponent(SharedMfeComponent);
  fixture.componentRef.setInput("loader", loader);
  fixture.componentRef.setInput("componentProps", componentProps);
  if (wrapperClass !== undefined) fixture.componentRef.setInput("wrapperClass", wrapperClass);
  if (loadingClass !== undefined) fixture.componentRef.setInput("loadingClass", loadingClass);

  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  return { fixture, component: fixture.componentInstance };
};

const makeModule = (): SharedComponentModule => ({ mount: jest.fn(), unmount: jest.fn() });

const getContainer = (fixture: ComponentFixture<SharedMfeComponent>): HTMLDivElement =>
  fixture.componentInstance.containerRef.nativeElement as HTMLDivElement;

describe("shared-mfe.component", () => {
  describe("loading state", () => {
    it("should start in the loading status and render the skeleton", async () => {
      const loader = jest.fn(() => new Promise<SharedComponentModule>(() => undefined));

      const { fixture, component } = await renderComponent({ loader });

      expect(component.status()).toBe("loading");
      expect(
        fixture.nativeElement.querySelector<HTMLElement>("app-skeleton-shimmer")
      ).toBeInTheDocument();
    });

    it("should forward the loadingClass to the skeleton", async () => {
      const loader = jest.fn(() => new Promise<SharedComponentModule>(() => undefined));

      const { fixture } = await renderComponent({ loader, loadingClass: "my-loader" });

      const skeleton = (fixture.nativeElement as HTMLElement).querySelector<HTMLDivElement>(
        "app-skeleton-shimmer div"
      );

      expect(skeleton).toHaveClass("my-loader");
    });
  });

  describe("mounted state", () => {
    it("should mount the loaded module into the container with the callbacks", async () => {
      const module = makeModule();
      const componentProps = { className: "rate-stars" };

      const { fixture, component } = await renderComponent({
        loader: jest.fn().mockResolvedValue(module),
        componentProps,
      });

      expect(component.status()).toBe("mounted");
      expect(module.mount).toHaveBeenCalledWith(getContainer(fixture), componentProps, {
        callbacks: mockCallbacks,
      });
    });

    it("should reveal the container and remove the skeleton once mounted", async () => {
      const { fixture, component } = await renderComponent({
        loader: jest.fn().mockResolvedValue(makeModule()),
      });

      expect(component.status()).toBe("mounted");
      expect(
        fixture.nativeElement.querySelector<HTMLElement>("app-skeleton-shimmer")
      ).not.toBeInTheDocument();
      expect(getContainer(fixture).hidden).toBe(false);
    });
  });

  describe("error state", () => {
    it("should set the error status and log when the loader rejects", async () => {
      const mockError = jest.spyOn(console, "error").mockImplementation(() => undefined);

      const { component } = await renderComponent({
        loader: jest.fn().mockRejectedValue(new Error("load failed")),
      });

      expect(component.status()).toBe("error");
      expect(mockError).toHaveBeenCalledWith("[Shared MFE Load Error]", expect.any(Error));
    });
  });

  describe("teardown", () => {
    it("should unmount the module from the container on destroy", async () => {
      const module = makeModule();

      const { fixture } = await renderComponent({
        loader: jest.fn().mockResolvedValue(module),
      });
      const container = getContainer(fixture);

      fixture.destroy();

      expect(module.unmount).toHaveBeenCalledWith(container);
    });
  });

  describe("resolvedWrapperClass", () => {
    it("should use the explicit wrapperClass when provided", async () => {
      const { component } = await renderComponent({
        loader: jest.fn().mockResolvedValue(makeModule()),
        componentProps: { className: "inner" },
        wrapperClass: "explicit-wrapper",
      });

      expect(component.resolvedWrapperClass).toBe("explicit-wrapper");
    });

    it("should derive the wrapper from the className when no wrapperClass is set", async () => {
      const { component } = await renderComponent({
        loader: jest.fn().mockResolvedValue(makeModule()),
        componentProps: { className: "rate-stars" },
      });

      expect(component.resolvedWrapperClass).toBe("rate-stars-wrapper");
    });

    it("should be undefined when there is neither a wrapperClass nor a className", async () => {
      const { component } = await renderComponent({
        loader: jest.fn().mockResolvedValue(makeModule()),
        componentProps: {},
      });

      expect(component.resolvedWrapperClass).toBeUndefined();
    });
  });
});

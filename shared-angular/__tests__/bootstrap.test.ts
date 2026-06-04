import type { MfeCallbacks } from "shared-core/sdk";

import * as mockSharedCoreSdk from "@tests/__mocks__/shared-core-sdk.mock";

interface CallbacksProvider {
  provide: unknown;
  useValue: MfeCallbacks;
}

const mockBootstrapApplication = jest.fn();

jest.mock("@angular/platform-browser", () => ({
  __esModule: true,
  bootstrapApplication: mockBootstrapApplication,
}));

jest.mock("shared-core/sdk", () => mockSharedCoreSdk);

const importBootstrap = async (): Promise<{ component: unknown; provider: CallbacksProvider }> => {
  await import("@shared-angular/bootstrap");

  const [component, options] = mockBootstrapApplication.mock.calls[0];

  return { component, provider: options.providers[0] as CallbacksProvider };
};

describe("bootstrap", () => {
  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = '<div id="root"></div>';
    mockBootstrapApplication.mockReset().mockResolvedValue({});
  });

  it("should append an app-test-page host into the root element", async () => {
    await importBootstrap();

    expect(document.querySelector<HTMLElement>("#root app-test-page")).toBeInTheDocument();
  });

  it("should bootstrap the app test page component once", async () => {
    const { component } = await importBootstrap();
    const pageComponent = (
      await import("@shared-angular/pages/app-test-page/app-test-page.component")
    ).default;

    expect(mockBootstrapApplication).toHaveBeenCalledTimes(1);
    expect(component).toBe(pageComponent);
  });

  it("should provide the MFE_CALLBACKS token with an onNavigate callback", async () => {
    const { provider } = await importBootstrap();
    const { MFE_CALLBACKS } = await import("@shared-angular/tokens/mfe-callbacks.token");

    expect(provider.provide).toBe(MFE_CALLBACKS);
    expect(typeof provider.useValue.onNavigate).toBe("function");
  });

  it("should run navigation through window.location when onNavigate is called", async () => {
    const { provider } = await importBootstrap();
    const mockError = jest.spyOn(console, "error").mockImplementation(() => undefined);

    expect(() => {
      provider.useValue.onNavigate("/products/1");
    }).not.toThrow();

    mockError.mockRestore();
  });

  it("should swallow bootstrap rejections without throwing", async () => {
    mockBootstrapApplication.mockReset().mockRejectedValue(new Error("bootstrap failed"));

    await expect(import("@shared-angular/bootstrap")).resolves.toBeDefined();
  });
});

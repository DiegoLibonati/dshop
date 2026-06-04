import { render, waitFor } from "@testing-library/vue";

import type { Mock } from "vitest";
import type { RenderResult } from "@testing-library/vue";
import type { SharedMfeProps } from "@product-detail/types/props";

import SharedMfe from "@product-detail/components/SharedMfe/SharedMfe.vue";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";

interface MfeComponentProps {
  className?: string;
}

const createModuleMock = (): { mount: Mock; unmount: Mock } => ({
  mount: vi.fn(),
  unmount: vi.fn(),
});

const renderComponent = (
  props: SharedMfeProps<MfeComponentProps> & Record<string, unknown>,
  provide: Record<string, unknown> = {}
): RenderResult => render(SharedMfe, { props, global: { provide } });

describe("SharedMfe", () => {
  describe("loading", () => {
    it("should render the skeleton fallback while the loader is pending", () => {
      const { container } = renderComponent({
        loader: () => new Promise<never>(() => undefined),
        componentProps: {},
        loadingClass: "pending-loader",
      });

      const skeleton = container.querySelector<HTMLDivElement>(".skeleton-shimmer");
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("pending-loader");
    });
  });

  describe("mounting", () => {
    it("should mount the loaded module and remove the skeleton", async () => {
      const moduleMock = createModuleMock();
      const componentProps = { className: "widget" };
      const { container } = renderComponent({
        loader: () => Promise.resolve(moduleMock),
        componentProps,
        loadingClass: "pending-loader",
      });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalled());

      expect(moduleMock.mount).toHaveBeenCalledWith(
        expect.anything(),
        componentProps,
        expect.anything()
      );
      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).not.toBeInTheDocument();
      expect(moduleMock.mount.mock.calls[0]![0] as HTMLDivElement).toHaveClass("widget-wrapper");
    });

    it("should forward injected callbacks and the mfe scope to the module", async () => {
      const moduleMock = createModuleMock();

      renderComponent(
        {
          loader: () => Promise.resolve(moduleMock),
          componentProps: { className: "widget" },
          loadingClass: "pending-loader",
          mfe: "shared-react",
        },
        { mfeCallbacks: mockCallbacks }
      );

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalled());
      expect(moduleMock.mount).toHaveBeenCalledWith(
        expect.anything(),
        { className: "widget" },
        { callbacks: mockCallbacks, dataset: { mfe: "shared-react" } }
      );
    });
  });

  describe("error handling", () => {
    it("should log the error and render nothing when the loader fails", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
      const { container } = renderComponent({
        loader: () => Promise.reject(new Error("load failed")),
        componentProps: {},
        loadingClass: "pending-loader",
      });

      await waitFor(() =>
        expect(consoleErrorSpy).toHaveBeenCalledWith("[Shared MFE Load Error]", expect.any(Error))
      );

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).not.toBeInTheDocument();
    });
  });
});

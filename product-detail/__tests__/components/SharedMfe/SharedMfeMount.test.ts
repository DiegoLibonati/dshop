import { render, waitFor } from "@testing-library/vue";

import type { Mock } from "vitest";
import type { RenderResult } from "@testing-library/vue";
import type { SharedMfeProps } from "@product-detail/types/props";

import SharedMfeMount from "@product-detail/components/SharedMfe/SharedMfeMount.vue";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";

interface MountComponentProps {
  className?: string;
}

const createModuleMock = (): { mount: Mock; unmount: Mock } => ({
  mount: vi.fn(),
  unmount: vi.fn(),
});

const SuspenseWrapper = {
  components: { SharedMfeMount },
  props: ["loader", "componentProps", "wrapperClass", "mfe"],
  template:
    '<Suspense><SharedMfeMount :loader="loader" :component-props="componentProps" :wrapper-class="wrapperClass" :mfe="mfe" /></Suspense>',
};

const renderSharedMfeMount = (
  props: SharedMfeProps<MountComponentProps> & Record<string, unknown>,
  provide: Record<string, unknown> = {}
): RenderResult => render(SuspenseWrapper, { props, global: { provide } });

const mountedElement = (moduleMock: ReturnType<typeof createModuleMock>): HTMLDivElement =>
  moduleMock.mount.mock.calls[0]![0] as HTMLDivElement;

describe("SharedMfeMount", () => {
  describe("wrapper class", () => {
    it("should use the explicit wrapperClass when provided", async () => {
      const moduleMock = createModuleMock();
      renderSharedMfeMount({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { className: "card" },
        wrapperClass: "explicit-wrapper",
      });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalled());

      expect(mountedElement(moduleMock)).toHaveClass("explicit-wrapper");
      expect(mountedElement(moduleMock)).not.toHaveClass("card-wrapper");
    });

    it("should derive the wrapper class from the componentProps className", async () => {
      const moduleMock = createModuleMock();
      renderSharedMfeMount({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { className: "card" },
      });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalled());

      expect(mountedElement(moduleMock)).toHaveClass("card-wrapper");
    });

    it("should not set any class when there is neither wrapperClass nor className", async () => {
      const moduleMock = createModuleMock();
      renderSharedMfeMount({
        loader: () => Promise.resolve(moduleMock),
        componentProps: {},
      });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalled());

      expect(mountedElement(moduleMock).className).toBe("");
    });
  });

  describe("mounting", () => {
    it("should mount the loaded module with the component props and no options by default", async () => {
      const moduleMock = createModuleMock();
      const componentProps = { className: "card" };

      renderSharedMfeMount({ loader: () => Promise.resolve(moduleMock), componentProps });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalledTimes(1));
      expect(moduleMock.mount).toHaveBeenCalledWith(expect.anything(), componentProps, {});
    });

    it("should forward injected callbacks and the mfe dataset to the module", async () => {
      const moduleMock = createModuleMock();

      renderSharedMfeMount(
        {
          loader: () => Promise.resolve(moduleMock),
          componentProps: { className: "card" },
          mfe: "shared-core",
        },
        { mfeCallbacks: mockCallbacks }
      );

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalled());
      expect(moduleMock.mount).toHaveBeenCalledWith(
        expect.anything(),
        { className: "card" },
        { callbacks: mockCallbacks, dataset: { mfe: "shared-core" } }
      );
    });

    it("should re-mount the module when the component props change", async () => {
      const moduleMock = createModuleMock();
      const { rerender } = renderSharedMfeMount({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { className: "first" },
      });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalledTimes(1));

      await rerender({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { className: "second" },
      });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalledTimes(2));
    });
  });

  describe("unmounting", () => {
    it("should unmount the module when the component is destroyed", async () => {
      const moduleMock = createModuleMock();
      const { unmount } = renderSharedMfeMount({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { className: "card" },
      });

      await waitFor(() => expect(moduleMock.mount).toHaveBeenCalled());

      unmount();

      expect(moduleMock.unmount).toHaveBeenCalledTimes(1);
    });
  });
});

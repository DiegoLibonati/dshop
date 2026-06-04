import { Component } from "react";
import { act, render, screen } from "@testing-library/react";

import type { JSX, ReactNode } from "react";
import type { MfeModule } from "shared-core/sdk";
import type { RenderResult } from "@testing-library/react";
import type { RemoteMountProps } from "@container/types/props";

import RemoteMount from "@container/components/RemoteMfe/RemoteMount";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";

interface ModuleMock {
  mod: MfeModule;
  mount: jest.Mock;
  unmount: jest.Mock;
}

class TestErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  override state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  override render(): ReactNode {
    return this.state.hasError ? <p>remote error</p> : this.props.children;
  }
}

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

const createModuleMock = (mount: jest.Mock = jest.fn()): ModuleMock => {
  const unmount = jest.fn();
  return { mod: { mount, unmount }, mount, unmount };
};

const wrap = (props: RemoteMountProps): JSX.Element => (
  <LoadingProvider>
    <TestErrorBoundary>
      <RemoteMount {...props} />
    </TestErrorBoundary>
  </LoadingProvider>
);

const renderComponent = async (
  props: Partial<RemoteMountProps> & { mod: MfeModule }
): Promise<RenderResult> => {
  const defaultProps: RemoteMountProps = {
    callbacks: mockCallbacks,
    mountData: { foo: "bar" },
    wrapperClass: "remote-wrapper",
    ...props,
  };

  let result!: RenderResult;

  await act(async () => {
    result = render(wrap(defaultProps));
    await Promise.resolve();
  });

  return result;
};

describe("RemoteMount", () => {
  describe("mounting", () => {
    it("should mount the module passing callbacks, mount data and an error handler", async () => {
      const { mod, mount } = createModuleMock();

      await renderComponent({ mod, mountData: { foo: "bar" } });

      expect(mount).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          callbacks: mockCallbacks,
          foo: "bar",
          onError: expect.any(Function),
        })
      );
    });

    it("should apply the wrapper class and reveal the container once mounted", async () => {
      const { mod } = createModuleMock();

      const { container } = await renderComponent({ mod, wrapperClass: "remote-wrapper" });

      const element = container.querySelector<HTMLDivElement>(".remote-wrapper");

      expect(element).toBeInTheDocument();
      expect(element).not.toHaveClass("remote-mfe__container--hidden");
    });
  });

  describe("unmounting", () => {
    it("should unmount the module when destroyed", async () => {
      const { mod, mount, unmount } = createModuleMock();

      const { unmount: destroy } = await renderComponent({ mod });

      expect(mount).toHaveBeenCalled();

      act(() => {
        destroy();
      });

      expect(unmount).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });

  describe("remounting", () => {
    it("should remount the module when the mount data reference changes", async () => {
      const { mod, mount } = createModuleMock();

      const { rerender } = await renderComponent({ mod, mountData: { value: 1 } });

      const callsBeforeRerender = mount.mock.calls.length;

      await act(async () => {
        rerender(
          wrap({
            mod,
            callbacks: mockCallbacks,
            mountData: { value: 2 },
            wrapperClass: "remote-wrapper",
          })
        );
        await Promise.resolve();
      });

      expect(mount.mock.calls.length).toBeGreaterThan(callsBeforeRerender);
    });
  });

  describe("error handling", () => {
    it("should surface the error to the boundary when the module reports one", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);

      const failingMount = jest.fn(
        (_: HTMLElement, options: { onError: (error: Error) => void }) => {
          options.onError(new Error("runtime failure"));
        }
      );
      const { mod } = createModuleMock(failingMount);

      await renderComponent({ mod });

      expect(screen.getByText("remote error")).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });
});

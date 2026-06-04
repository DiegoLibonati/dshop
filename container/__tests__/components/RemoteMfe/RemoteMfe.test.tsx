import { act, render } from "@testing-library/react";

import type { JSX } from "react";
import type { MfeModule } from "shared-core/sdk";
import type { RenderResult } from "@testing-library/react";
import type { RemoteMfeProps } from "@container/types/props";

import RemoteMfe from "@container/components/RemoteMfe/RemoteMfe";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";

interface ModuleMock {
  mod: MfeModule;
  mount: jest.Mock;
  unmount: jest.Mock;
}

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

const createModuleMock = (): ModuleMock => {
  const mount = jest.fn();
  const unmount = jest.fn();
  return { mod: { mount, unmount }, mount, unmount };
};

const wrap = (props: RemoteMfeProps): JSX.Element => (
  <LoadingProvider>
    <RemoteMfe {...props} />
  </LoadingProvider>
);

const renderComponent = async (
  props: Partial<RemoteMfeProps> & Pick<RemoteMfeProps, "loadModule">
): Promise<RenderResult> => {
  const defaultProps: RemoteMfeProps = {
    callbacks: mockCallbacks,
    ...props,
  };

  let result!: RenderResult;

  await act(async () => {
    result = render(wrap(defaultProps));
    await Promise.resolve();
  });

  return result;
};

describe("RemoteMfe", () => {
  describe("module loading", () => {
    it("should load and mount a module exported directly", async () => {
      const { mod, mount } = createModuleMock();

      await renderComponent({ loadModule: () => Promise.resolve(mod) });

      expect(mount).toHaveBeenCalled();
    });

    it("should load and mount a module exported under the default key", async () => {
      const { mod, mount } = createModuleMock();

      await renderComponent({ loadModule: () => Promise.resolve({ default: mod }) });

      expect(mount).toHaveBeenCalled();
    });
  });

  describe("wrapper class resolution", () => {
    it("should apply the explicit wrapper class to the remote container", async () => {
      const { mod, mount } = createModuleMock();

      const { container } = await renderComponent({
        loadModule: () => Promise.resolve(mod),
        wrapperClass: "explicit-remote",
      });

      expect(mount).toHaveBeenCalled();
      expect(container.querySelector<HTMLDivElement>(".explicit-remote")).toBeInTheDocument();
    });

    it("should infer the wrapper class from the mount data class name", async () => {
      const { mod, mount } = createModuleMock();

      const { container } = await renderComponent({
        loadModule: () => Promise.resolve(mod),
        mountData: { className: "card" },
      });

      expect(mount).toHaveBeenCalled();
      expect(container.querySelector<HTMLDivElement>(".card-wrapper")).toBeInTheDocument();
    });
  });
});

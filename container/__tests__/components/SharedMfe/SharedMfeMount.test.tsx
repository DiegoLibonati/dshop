import { act, render } from "@testing-library/react";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { SharedMfeMountProps } from "@container/types/props";

import SharedMfeMount from "@container/components/SharedMfe/SharedMfeMount";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

interface MountProps {
  label: string;
}

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

const createModuleMock = (): { mount: jest.Mock; unmount: jest.Mock } => ({
  mount: jest.fn(),
  unmount: jest.fn(),
});

const wrap = (props: SharedMfeMountProps<MountProps>): JSX.Element => (
  <LoadingProvider>
    <SharedMfeMount {...props} />
  </LoadingProvider>
);

const renderComponent = async (props: SharedMfeMountProps<MountProps>): Promise<RenderResult> => {
  let result!: RenderResult;

  await act(async () => {
    result = render(wrap(props));
    await Promise.resolve();
  });

  return result;
};

describe("SharedMfeMount", () => {
  describe("loading state", () => {
    it("should show the skeleton and keep the container hidden before the module mounts", async () => {
      const moduleMock = createModuleMock();

      const { container } = await renderComponent({
        loader: () => new Promise(() => undefined),
        componentProps: { label: "pending" },
        wrapperClass: "pending-wrapper",
        loadingClass: "pending-loader",
      });

      expect(container.querySelector<HTMLDivElement>(".pending-loader")).toBeInTheDocument();
      expect(container.querySelector<HTMLDivElement>(".pending-wrapper")).not.toBeVisible();
      expect(moduleMock.mount).not.toHaveBeenCalled();
    });
  });

  describe("mounting", () => {
    it("should mount the loaded module with the component props into the container element", async () => {
      const moduleMock = createModuleMock();
      const componentProps: MountProps = { label: "mounted" };

      const { container } = await renderComponent({
        loader: () => Promise.resolve(moduleMock),
        componentProps,
        wrapperClass: "mounted-wrapper",
      });

      expect(moduleMock.mount).toHaveBeenCalledWith(expect.any(HTMLElement), componentProps);
      expect(moduleMock.mount.mock.calls[0]![0]).toHaveClass("mounted-wrapper");
      expect(container.querySelector<HTMLDivElement>(".mounted-wrapper")).toBeVisible();
    });

    it("should remove the skeleton once the module is mounted", async () => {
      const moduleMock = createModuleMock();

      const { container } = await renderComponent({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { label: "mounted" },
        loadingClass: "mounted-loader",
      });

      expect(container.querySelector<HTMLDivElement>(".mounted-loader")).not.toBeInTheDocument();
    });

    it("should remount the module with the new props when the component props change", async () => {
      const moduleMock = createModuleMock();
      const loader = (): Promise<typeof moduleMock> => Promise.resolve(moduleMock);

      const { rerender } = await renderComponent({
        loader,
        componentProps: { label: "first" },
        wrapperClass: "remount-wrapper",
      });

      const callsBeforeRerender = moduleMock.mount.mock.calls.length;

      await act(async () => {
        rerender(
          wrap({ loader, componentProps: { label: "second" }, wrapperClass: "remount-wrapper" })
        );
        await Promise.resolve();
      });

      expect(moduleMock.mount.mock.calls.length).toBeGreaterThan(callsBeforeRerender);
      expect(moduleMock.mount).toHaveBeenLastCalledWith(expect.any(HTMLElement), {
        label: "second",
      });
    });
  });

  describe("unmounting", () => {
    it("should unmount the module when the component is destroyed", async () => {
      const moduleMock = createModuleMock();

      const { unmount } = await renderComponent({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { label: "to-unmount" },
        wrapperClass: "unmount-wrapper",
      });

      expect(moduleMock.mount).toHaveBeenCalled();

      act(() => {
        unmount();
      });

      expect(moduleMock.unmount).toHaveBeenCalledTimes(1);
      expect(moduleMock.unmount).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });

  describe("error handling", () => {
    it("should log an error and stay in the loading state when the loader rejects", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
      const moduleMock = createModuleMock();

      const { container } = await renderComponent({
        loader: () => Promise.reject(new Error("load failure")),
        componentProps: { label: "rejected" },
        wrapperClass: "rejected-wrapper",
        loadingClass: "rejected-loader",
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith("[Shared MFE Load Error]", expect.any(Error));
      expect(moduleMock.mount).not.toHaveBeenCalled();
      expect(container.querySelector<HTMLDivElement>(".rejected-wrapper")).not.toBeVisible();
    });
  });
});

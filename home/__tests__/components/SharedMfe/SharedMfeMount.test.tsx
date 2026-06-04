import { render, waitFor } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SharedMfeMountProps } from "@home/types/props";

import SharedMfeMount from "@home/components/SharedMfe/SharedMfeMount";

interface MountProps {
  label: string;
}

const createModuleMock = (): { mount: jest.Mock; unmount: jest.Mock } => ({
  mount: jest.fn(),
  unmount: jest.fn(),
});

const renderComponent = (props: SharedMfeMountProps<MountProps>): RenderResult =>
  render(<SharedMfeMount {...props} />);

describe("SharedMfeMount", () => {
  describe("loading state", () => {
    it("should show the skeleton and keep the container hidden before the module mounts", () => {
      const moduleMock = createModuleMock();

      const { container } = renderComponent({
        loader: () => new Promise(() => undefined),
        componentProps: { label: "pending" },
        wrapperClass: "pending-wrapper",
        loadingClass: "pending-loader",
      });

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toHaveClass(
        "pending-loader"
      );
      expect(container.querySelector<HTMLDivElement>(".pending-wrapper")).not.toBeVisible();
      expect(moduleMock.mount).not.toHaveBeenCalled();
    });
  });

  describe("mounting", () => {
    it("should mount the loaded module with the component props into the container element", async () => {
      const moduleMock = createModuleMock();
      const componentProps: MountProps = { label: "mounted" };

      const { container } = renderComponent({
        loader: () => Promise.resolve(moduleMock),
        componentProps,
        wrapperClass: "mounted-wrapper",
      });

      await waitFor(() => {
        expect(moduleMock.mount).toHaveBeenCalledTimes(1);
      });

      expect(moduleMock.mount).toHaveBeenCalledWith(expect.any(HTMLElement), componentProps);
      expect(moduleMock.mount.mock.calls[0]![0]).toHaveClass("mounted-wrapper");
      expect(container.querySelector<HTMLDivElement>(".mounted-wrapper")).toBeVisible();
    });

    it("should remove the skeleton once the module is mounted", async () => {
      const moduleMock = createModuleMock();

      const { container } = renderComponent({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { label: "mounted" },
        loadingClass: "mounted-loader",
      });

      await waitFor(() => {
        expect(
          container.querySelector<HTMLDivElement>(".skeleton-shimmer")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("unmounting", () => {
    it("should unmount the module when the component is destroyed", async () => {
      const moduleMock = createModuleMock();

      const { unmount } = renderComponent({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { label: "to-unmount" },
        wrapperClass: "unmount-wrapper",
      });

      await waitFor(() => {
        expect(moduleMock.mount).toHaveBeenCalledTimes(1);
      });

      unmount();

      expect(moduleMock.unmount).toHaveBeenCalledTimes(1);
      expect(moduleMock.unmount).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
  });

  describe("error handling", () => {
    it("should log an error and stay in the loading state when the loader rejects", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
      const moduleMock = createModuleMock();

      const { container } = renderComponent({
        loader: () => Promise.reject(new Error("load failure")),
        componentProps: { label: "rejected" },
        wrapperClass: "rejected-wrapper",
        loadingClass: "rejected-loader",
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith("[Shared MFE Load Error]", expect.any(Error));
      });

      expect(moduleMock.mount).not.toHaveBeenCalled();
      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toBeInTheDocument();
      expect(container.querySelector<HTMLDivElement>(".rejected-wrapper")).not.toBeVisible();
    });
  });
});

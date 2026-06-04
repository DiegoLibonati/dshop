import { lazy } from "react";
import { render, screen, waitFor } from "@testing-library/react";

import type { JSX } from "react";
import type { ButtonWhiteProps } from "shared-core/sdk";
import type { RenderResult } from "@testing-library/react";
import type { SharedMfeProps } from "@home/types/props";

import SharedMfe from "@home/components/SharedMfe/SharedMfe";

interface DummyProps {
  label: string;
  className?: string;
}

const DummyComponent = ({ label }: DummyProps): JSX.Element => <span>{label}</span>;

const ThrowingComponent = (): JSX.Element => {
  throw new Error("render failure");
};

const LazyButtonWhite = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.ButtonWhite }))
);

const createModuleMock = (): { mount: jest.Mock; unmount: jest.Mock } => ({
  mount: jest.fn(),
  unmount: jest.fn(),
});

const renderComponent = <P extends object>(props: SharedMfeProps<P>): RenderResult =>
  render(<SharedMfe {...props} />);

describe("SharedMfe", () => {
  describe("rendering", () => {
    it("should render the provided component with its props", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "rendered content" },
      });

      expect(screen.getByText("rendered content")).toBeInTheDocument();
    });

    it("should wrap the rendered component in a div marked with data-mfe shared-core by default", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "wrapped content" },
      });

      expect(screen.getByText("wrapped content").parentElement).toHaveAttribute(
        "data-mfe",
        "shared-core"
      );
    });

    it("should mark the wrapper with the provided mfe scope", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "scoped content" },
        mfe: "shared-react",
      });

      expect(screen.getByText("scoped content").parentElement).toHaveAttribute(
        "data-mfe",
        "shared-react"
      );
    });

    it("should not set a wrapper class when neither wrapperClass nor className is provided", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "no class content" },
      });

      expect(screen.getByText("no class content").parentElement).not.toHaveAttribute("class");
    });
  });

  describe("wrapper class resolution", () => {
    it("should apply the explicit wrapperClass when provided", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "explicit content" },
        wrapperClass: "custom-wrapper",
      });

      expect(screen.getByText("explicit content").parentElement).toHaveClass("custom-wrapper");
    });

    it("should infer the wrapper class from componentProps className when wrapperClass is absent", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "inferred content", className: "card" },
      });

      expect(screen.getByText("inferred content").parentElement).toHaveClass("card-wrapper");
    });

    it("should prefer the explicit wrapperClass over the inferred one", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "precedence content", className: "card" },
        wrapperClass: "explicit-wrapper",
      });

      const wrapper = screen.getByText("precedence content").parentElement;

      expect(wrapper).toHaveClass("explicit-wrapper");
      expect(wrapper).not.toHaveClass("card-wrapper");
    });
  });

  describe("suspense behavior", () => {
    it("should show the skeleton fallback with the loading class and then render the resolved lazy component", async () => {
      const { container } = renderComponent<ButtonWhiteProps>({
        component: LazyButtonWhite,
        componentProps: { ariaLabel: "lazy button", children: "Click" },
        loadingClass: "lazy-loading",
      });

      const fallback = container.querySelector<HTMLDivElement>(".skeleton-shimmer");

      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveClass("lazy-loading");

      expect(await screen.findByRole("button", { name: "lazy button" })).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("should render nothing inside the wrapper when the component throws", () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);

      const { container } = renderComponent<object>({
        component: ThrowingComponent,
        componentProps: {},
        wrapperClass: "boom-wrapper",
      });

      const wrapper = container.querySelector<HTMLDivElement>("[data-mfe]");

      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toBeEmptyDOMElement();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe("loader branch", () => {
    it("should delegate to the mount bridge and mount the loaded module when a loader is provided", async () => {
      const moduleMock = createModuleMock();

      renderComponent<DummyProps>({
        loader: () => Promise.resolve(moduleMock),
        componentProps: { label: "loaded content" },
        wrapperClass: "loader-wrapper",
      });

      await waitFor(() => {
        expect(moduleMock.mount).toHaveBeenCalledTimes(1);
      });
      expect(moduleMock.mount).toHaveBeenCalledWith(expect.any(HTMLElement), {
        label: "loaded content",
      });
    });
  });
});

import { lazy } from "react";
import { render, screen } from "@testing-library/react";

import type { JSX } from "react";
import type { ButtonWhiteProps } from "shared-core/sdk";
import type { RenderResult } from "@testing-library/react";
import type { SharedMfeProps } from "@shared-react/types/props";

import SharedMfe from "@shared-react/components/SharedMfe/SharedMfe";

interface DummyProps {
  label: string;
  className?: string;
}

const DummyComponent = ({ label }: DummyProps): JSX.Element => <span>{label}</span>;

const LazyButtonWhite = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.ButtonWhite }))
);

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

    it("should wrap the rendered component in a div marked with data-mfe shared-core", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "wrapped content" },
      });

      const wrapper = screen.getByText("wrapped content").parentElement;

      expect(wrapper).toHaveAttribute("data-mfe", "shared-core");
    });

    it("should not set a wrapper class when neither wrapperClass nor className is provided", () => {
      renderComponent<DummyProps>({
        component: DummyComponent,
        componentProps: { label: "no class content" },
      });

      const wrapper = screen.getByText("no class content").parentElement;

      expect(wrapper).not.toHaveAttribute("class");
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
});

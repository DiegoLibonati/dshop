import { render, screen } from "@testing-library/react";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import LoadableFallback from "@container/components/LoadableFallback/LoadableFallback";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

const renderComponent = (children: ReactNode = <span>fallback content</span>): RenderResult => {
  const ui: JSX.Element = (
    <LoadingProvider>
      <LoadableFallback>{children}</LoadableFallback>
    </LoadingProvider>
  );

  return render(ui);
};

describe("LoadableFallback", () => {
  describe("rendering", () => {
    it("should render its children", () => {
      renderComponent(<span>visible child</span>);

      expect(screen.getByText("visible child")).toBeInTheDocument();
    });

    it("should render without children", () => {
      const { container } = renderComponent(null);

      expect(container).toBeInTheDocument();
    });
  });

  describe("loading registration", () => {
    it("should register a pending loadable that keeps the loader screen visible", async () => {
      renderComponent();

      expect(await screen.findByTestId("loader-screen")).toBeInTheDocument();
    });
  });
});

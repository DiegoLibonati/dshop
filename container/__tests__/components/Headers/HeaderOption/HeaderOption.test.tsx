import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { HeaderOptionProps } from "@container/types/props";

import HeaderOption from "@container/components/Headers/HeaderOption/HeaderOption";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

const mockOnClick = jest.fn();

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

const renderComponent = (props: Partial<HeaderOptionProps> = {}): RenderResult => {
  const defaultProps: HeaderOptionProps = {
    name: "Shop",
    open: false,
    isMenu: false,
    onClick: mockOnClick,
    ...props,
  };

  return render(
    <LoadingProvider>
      <HeaderOption {...defaultProps} />
    </LoadingProvider>
  );
};

describe("HeaderOption", () => {
  describe("rendering", () => {
    it("should render a button labelled with the option name", () => {
      renderComponent({ name: "Brands" });

      expect(screen.getByRole("button", { name: "header Brands" })).toBeInTheDocument();
    });

    it("should render the option name as text", () => {
      renderComponent({ name: "On Sale" });

      expect(screen.getByText("On Sale")).toBeInTheDocument();
    });

    it("should apply the provided class name to the button", () => {
      renderComponent({ name: "Shop", className: "menu-header__option" });

      const button = screen.getByRole("button", { name: "header Shop" });

      expect(button).toHaveClass("header-option");
      expect(button).toHaveClass("menu-header__option");
    });

    it("should not render an icon wrapper when the option is not a menu", () => {
      const { container } = renderComponent({ isMenu: false });

      expect(container.querySelector<HTMLDivElement>("[data-mfe]")).not.toBeInTheDocument();
    });
  });

  describe("menu icon", () => {
    it("should render the chevron down icon when it is a menu and is closed", async () => {
      const { container } = renderComponent({ isMenu: true, open: false });

      await act(async () => {
        await Promise.resolve();
      });

      expect(container.querySelector<SVGPathElement>("svg path")).toHaveAttribute(
        "d",
        "M6 9L12 15L18 9"
      );
    });

    it("should render the chevron up icon when it is a menu and is open", async () => {
      const { container } = renderComponent({ isMenu: true, open: true });

      await act(async () => {
        await Promise.resolve();
      });

      expect(container.querySelector<SVGPathElement>("svg path")).toHaveAttribute(
        "d",
        "M6 15L12 9L18 15"
      );
    });
  });

  describe("behavior", () => {
    it("should call onClick when the button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent({ name: "Shop" });

      await user.click(screen.getByRole("button", { name: "header Shop" }));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});

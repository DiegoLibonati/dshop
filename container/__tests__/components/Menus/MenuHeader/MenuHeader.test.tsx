import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { MenuHeaderProps } from "@container/types/props";

import MenuHeader from "@container/components/Menus/MenuHeader/MenuHeader";

import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

import { lang } from "@container/constants/lang";

const mockHandleClickMenuClose = jest.fn();

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

const wrap = (props: MenuHeaderProps): JSX.Element => (
  <LoadingProvider>
    <MenuHeader {...props} />
  </LoadingProvider>
);

const renderComponent = async (props: Partial<MenuHeaderProps> = {}): Promise<RenderResult> => {
  const defaultProps: MenuHeaderProps = {
    isMenuOpen: false,
    handleClickMenuClose: mockHandleClickMenuClose,
    language: "en",
    children: <span>menu child</span>,
    ...props,
  };

  let result!: RenderResult;

  await act(async () => {
    result = render(wrap(defaultProps));
    await Promise.resolve();
  });

  return result;
};

describe("MenuHeader", () => {
  describe("rendering", () => {
    it("should render the projected children", async () => {
      await renderComponent({ children: <span>projected content</span> });

      expect(screen.getByText("projected content")).toBeInTheDocument();
    });

    it("should render the search form with the localized placeholder", async () => {
      await renderComponent();

      expect(screen.getByPlaceholderText(lang.en.header.placeholder)).toBeInTheDocument();
    });

    it("should render the close button", async () => {
      await renderComponent();

      expect(screen.getByRole("button", { name: "close menu header" })).toBeInTheDocument();
    });
  });

  describe("open state", () => {
    it("should apply the open modifier class when the menu is open", async () => {
      const { container } = await renderComponent({ isMenuOpen: true });

      expect(container.querySelector<HTMLDivElement>(".menu-screen-white")).toHaveClass(
        "menu-header--open"
      );
    });

    it("should not apply the open modifier class when the menu is closed", async () => {
      const { container } = await renderComponent({ isMenuOpen: false });

      expect(container.querySelector<HTMLDivElement>(".menu-screen-white")).not.toHaveClass(
        "menu-header--open"
      );
    });
  });

  describe("behavior", () => {
    it("should call handleClickMenuClose when the close button is clicked", async () => {
      const user = userEvent.setup();
      await renderComponent();

      await user.click(screen.getByRole("button", { name: "close menu header" }));

      expect(mockHandleClickMenuClose).toHaveBeenCalledTimes(1);
    });

    it("should log the submitted value when the internal search form is submitted", async () => {
      const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);
      const user = userEvent.setup();
      await renderComponent();

      await user.type(screen.getByPlaceholderText(lang.en.header.placeholder), "shoes{enter}");

      expect(consoleLogSpy).toHaveBeenCalledWith("shoes");
    });
  });
});

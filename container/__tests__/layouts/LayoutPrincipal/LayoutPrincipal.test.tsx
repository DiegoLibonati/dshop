import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import LayoutPrincipal from "@container/layouts/LayoutPrincipal/LayoutPrincipal";

import { GeneralProvider } from "@container/contexts/GeneralContext/GeneralProvider";
import { LoadingProvider } from "@container/contexts/LoadingContext/LoadingProvider";

import { lang } from "@container/constants/lang";

import { HeaderModule, NotificationBarModule } from "@tests/__mocks__/sharedAngularSdk.mock";

jest.mock("shared-react/sdk", () => {
  const sharedReactMock = jest.requireActual("@tests/__mocks__/sharedReactSdk.mock");

  return {
    LoaderScreen: sharedReactMock.LoaderScreen,
    FooterWithSubscribeNewsletter: sharedReactMock.FooterWithSubscribeNewsletter,
  };
});

jest.mock("shared-angular/sdk", () => {
  const sharedAngularMock = jest.requireActual("@tests/__mocks__/sharedAngularSdk.mock");

  return {
    NotificationBarModule: sharedAngularMock.NotificationBarModule,
    HeaderModule: sharedAngularMock.HeaderModule,
  };
});

const LocationProbe = (): JSX.Element => {
  const location = useLocation();
  return <span data-testid="location">{location.pathname}</span>;
};

const wrap = (children: ReactNode, initialEntry = "/"): JSX.Element => (
  <MemoryRouter initialEntries={[initialEntry]}>
    <LoadingProvider>
      <GeneralProvider>
        <LayoutPrincipal>{children}</LayoutPrincipal>
        <LocationProbe />
      </GeneralProvider>
    </LoadingProvider>
  </MemoryRouter>
);

const renderLayout = async (
  children: ReactNode = <p>page outlet</p>,
  initialEntry = "/"
): Promise<RenderResult> => {
  let result!: RenderResult;

  await act(async () => {
    result = render(wrap(children, initialEntry));
    await Promise.resolve();
  });

  return result;
};

describe("LayoutPrincipal", () => {
  describe("rendering", () => {
    it("should render the projected page content", async () => {
      await renderLayout(<p>page outlet content</p>);

      expect(screen.getByText("page outlet content")).toBeInTheDocument();
    });

    it("should render the localized header options inside the menu", async () => {
      await renderLayout();

      expect(
        screen.getByRole("button", { name: `header ${lang.en.header.options.shop}` })
      ).toBeInTheDocument();
    });

    it("should render the footer sections", async () => {
      await renderLayout();

      expect(screen.getByText(lang.en.footer.sections.company.title)).toBeInTheDocument();
    });
  });

  describe("shared angular mounts", () => {
    it("should mount the notification bar and the header modules", async () => {
      await renderLayout();

      expect(NotificationBarModule.mount).toHaveBeenCalled();
      expect(HeaderModule.mount).toHaveBeenCalled();
    });
  });

  describe("notification bar", () => {
    it("should hide the notification bar when its close handler is invoked", async () => {
      await renderLayout();

      const notificationProps = NotificationBarModule.mount.mock.calls.at(-1)?.[1] as {
        onClose: () => void;
      };

      await act(async () => {
        notificationProps.onClose();
        await Promise.resolve();
      });

      expect(NotificationBarModule.mount).toHaveBeenLastCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({ className: "notification-bar--hidden" })
      );
    });
  });

  describe("navigation", () => {
    it("should navigate home when the header title handler is invoked", async () => {
      await renderLayout(<p>page outlet</p>, "/product/5");

      const headerProps = HeaderModule.mount.mock.calls.at(-1)?.[1] as {
        onClickTitle: () => void;
      };

      expect(screen.getByTestId("location")).toHaveTextContent("/product/5");

      act(() => {
        headerProps.onClickTitle();
      });

      expect(screen.getByTestId("location")).toHaveTextContent(/^\/$/);
    });
  });
});

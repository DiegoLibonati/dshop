import { render, screen } from "@testing-library/angular";
import user from "@testing-library/user-event";

import { HeaderProps } from "@src/app/entities/props";

import { HeaderComponent } from "@src/app/components/composed/headers/header/header.component";
import { FormSearchComponent } from "@src/app/components/core/forms/form-search/form-search.component";
import { SvgSearchComponent } from "@src/app/components/core/svgs/svg-search/svg-search.component";
import { SvgHamburgerMenuComponent } from "@src/app/components/core/svgs/svg-hamburger-menu/svg-hamburger-menu.component";
import { SvgChevronDownComponent } from "@src/app/components/core/svgs/svg-chevron-down/svg-chevron-down.component";
import { SvgChevronUpComponent } from "@src/app/components/core/svgs/svg-chevron-up/svg-chevron-up.component";
import { SvgCartShoppingComponent } from "@src/app/components/core/svgs/svg-cart-shopping/svg-cart-shopping.component";

type RenderComponent = {
  props: HeaderProps & {
    onClickMenu: jest.Mock;
    onClickTitle: jest.Mock;
    onSubmitSearch: jest.Mock;
    onClickSearch: jest.Mock;
    onClickCart: jest.Mock;
  };
  container: Element;
};

const renderComponent = async (isFixed: boolean): Promise<RenderComponent> => {
  const props: HeaderProps & {
    onClickMenu: jest.Mock;
    onClickTitle: jest.Mock;
    onSubmitSearch: jest.Mock;
    onClickSearch: jest.Mock;
    onClickCart: jest.Mock;
  } = {
    name: "namecito",
    isFixed: isFixed,
    onClickCart: jest.fn(),
    onClickTitle: jest.fn(),
    onClickMenu: jest.fn(),
    onClickSearch: jest.fn(),
    onSubmitSearch: jest.fn(),
  };

  const { container } = await render(HeaderComponent, {
    declarations: [
      SvgSearchComponent,
      SvgHamburgerMenuComponent,
      SvgChevronDownComponent,
      SvgChevronUpComponent,
      SvgCartShoppingComponent,
      FormSearchComponent,
    ],
    componentProperties: props,
  });

  return {
    props: props,
    container: container,
  };
};

describe("header.component.ts", () => {
  describe("General Tests.", () => {
    const isFixed = false;

    test("It must render the component.", async () => {
      const { container } = await renderComponent(isFixed);

      const header = container.querySelector<HTMLElement>(".header");

      expect(header).toBeInTheDocument();
    });
  });

  describe("Header logo section.", () => {
    const isFixed = false;

    test("It must render the logo section of the header.", async () => {
      const { container, props } = await renderComponent(isFixed);

      const headerLogo =
        container.querySelector<HTMLDivElement>(".header__logo");
      const btnHeaderOpen = screen.getByRole("button", {
        name: "header open",
      }) as HTMLButtonElement;
      const title = screen.getByRole("heading", {
        name: props.name,
      }) as HTMLHeadingElement;

      expect(headerLogo).toBeInTheDocument();
      expect(btnHeaderOpen).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });

    test("The onClickMenu function should be executed when the open header is clicked.", async () => {
      const { props } = await renderComponent(isFixed);

      const btnHeaderOpen = screen.getByRole("button", {
        name: "header open",
      }) as HTMLButtonElement;

      expect(btnHeaderOpen).toBeInTheDocument();

      await user.click(btnHeaderOpen);

      expect(props.onClickMenu).toHaveBeenCalledTimes(1);
      expect(props.onClickMenu).toHaveBeenCalledWith(expect.any(Event));
    });

    test("The onClickTitle function must be executed when is clicked.", async () => {
      const { props } = await renderComponent(isFixed);

      const title = screen.getByRole("heading", {
        name: props.name,
      }) as HTMLHeadingElement;

      await user.click(title);

      expect(props.onClickTitle).toHaveBeenCalledTimes(1);
      expect(props.onClickTitle).toHaveBeenCalledWith(expect.any(Event));
    });
  });

  describe("Header options section.", () => {
    const isFixed = false;

    test("It must render the options section of the header.", async () => {
      const { container } = await renderComponent(isFixed);

      const headerOptions =
        container.querySelector<HTMLElement>(".header__options");

      expect(headerOptions).toBeInTheDocument();
    });
  });

  describe("Header form section.", () => {
    const isFixed = false;

    test("It must render the form section of the header.", async () => {
      const { container } = await renderComponent(isFixed);

      const headerForm =
        container.querySelector<HTMLElement>("app-form-search");

      expect(headerForm).toBeInTheDocument();
    });
  });

  describe("Header actions section.", () => {
    const isFixed = false;

    test("It must render the actions section of the header.", async () => {
      const { container } = await renderComponent(isFixed);

      const headerActions =
        container.querySelector<HTMLFormElement>(".header__actions");
      const btnHeaderSearch = screen.getByLabelText(
        /header search/i
      ) as HTMLButtonElement;
      const btnHeaderCart = screen.getByLabelText(
        /header cart/i
      ) as HTMLButtonElement;

      expect(headerActions).toBeInTheDocument();
      expect(btnHeaderSearch).toBeInTheDocument();
      expect(btnHeaderCart).toBeInTheDocument();
    });

    test("The onClickSearch and onClickCart functions must be executed when their respective buttons are clicked.", async () => {
      const { props } = await renderComponent(isFixed);

      const btnHeaderSearch = screen.getByLabelText(
        /header search/i
      ) as HTMLButtonElement;
      const btnHeaderCart = screen.getByLabelText(
        /header cart/i
      ) as HTMLButtonElement;

      expect(btnHeaderSearch).toBeInTheDocument();
      expect(btnHeaderCart).toBeInTheDocument();

      await user.click(btnHeaderSearch);

      expect(props.onClickSearch).toHaveBeenCalledTimes(1);
      expect(props.onClickSearch).toHaveBeenCalledWith(expect.any(Event));

      await user.click(btnHeaderCart);

      expect(props.onClickCart).toHaveBeenCalledTimes(1);
      expect(props.onClickCart).toHaveBeenCalledWith(expect.any(Event));
    });
  });

  describe("Without isFixed", () => {
    const isFixed = false;

    test("It should not be fixed.", async () => {
      const { container } = await renderComponent(isFixed);

      const header = container.querySelector<HTMLElement>(".header");

      expect(header!.classList.contains("header--fixed")).toBeFalsy();
    });
  });

  describe("With isFixed", () => {
    const isFixed = true;

    test("It should be fixed.", async () => {
      const { container } = await renderComponent(isFixed);

      const header = container.querySelector<HTMLElement>(".header");

      expect(header!.classList.contains("header--fixed")).toBeTruthy();
    });
  });
});

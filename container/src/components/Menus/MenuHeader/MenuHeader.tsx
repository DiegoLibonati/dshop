import { lazy, Fragment } from "react";

import type { JSX } from "react";
import type { MenuHeaderProps } from "@container/types/props";

import SharedMfe from "@container/components/SharedMfe/SharedMfe";

import { lang } from "@container/constants/lang";

import "@container/components/Menus/MenuHeader/MenuHeader.css";

const MenuScreenWhite = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.MenuScreenWhite }))
);
const FormSearch = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.FormSearch })));
const ButtonBlack = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.ButtonBlack })));
const SvgClose = lazy(() => import("shared-core/sdk").then((m) => ({ default: m.SvgClose })));

const MenuHeader = ({
  isMenuOpen,
  children,
  language = "en",
  handleClickMenuClose,
}: MenuHeaderProps): JSX.Element => {
  const handleClickSubmit = (inputValue: string): void => {
    console.log(inputValue);
  };

  return (
    <SharedMfe
      component={MenuScreenWhite}
      componentProps={{
        className: `menu-header ${isMenuOpen ? "menu-header--open" : ""}`,
        children: (
          <Fragment>
            {children}

            <hr className="menu-header__separator" />

            <SharedMfe
              component={FormSearch}
              componentProps={{
                className: "menu-header__form",
                onSubmit: handleClickSubmit,
                placeholder: lang[language].header.placeholder,
              }}
              wrapperClass="menu-header__form-wrapper"
              loadingClass="menu-header__form-loader"
            />

            <SharedMfe
              component={ButtonBlack}
              componentProps={{
                ariaLabel: "close menu header",
                onClick: handleClickMenuClose,
                className: "menu-header__btn-close",
                children: (
                  <SharedMfe
                    component={SvgClose}
                    componentProps={{ className: "menu-header__btn-close-icon" }}
                    wrapperClass="menu-header__btn-close-icon-wrapper"
                    loadingClass="menu-header__btn-close-icon-loader"
                  />
                ),
              }}
              wrapperClass="menu-header__btn-close-wrapper"
              loadingClass="menu-header__btn-close-loader"
            />
          </Fragment>
        ),
      }}
      wrapperClass="menu-header-wrapper"
      loadingClass="menu-header-loader"
    />
  );
};

export default MenuHeader;

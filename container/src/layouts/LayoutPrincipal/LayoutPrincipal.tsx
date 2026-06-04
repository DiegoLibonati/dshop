import { lazy, Fragment } from "react";

import type { JSX } from "react";
import type { LayoutPrincipalProps } from "@container/types/props";

import SharedMfe from "@container/components/SharedMfe/SharedMfe";
import HeaderOption from "@container/components/Headers/HeaderOption/HeaderOption";
import FooterSection from "@container/components/Footers/FooterSection/FooterSection";
import MenuHeader from "@container/components/Menus/MenuHeader/MenuHeader";

import { useMfeCallbacks } from "@container/hooks/useMfeCallbacks";
import { useGeneralContext } from "@container/hooks/useGeneralContext";

import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  NOTIFICATION_TEXT,
  TITLE_APP,
  X_LINK,
} from "@container/constants/vars";
import { lang } from "@container/constants/lang";

import "@container/layouts/LayoutPrincipal/LayoutPrincipal.css";

const FooterWithSubscribeNewsletter = lazy(() =>
  import("shared-react/sdk").then((m) => ({ default: m.FooterWithSubscribeNewsletter }))
);

const LayoutPrincipal = ({ children }: LayoutPrincipalProps): JSX.Element => {
  const { onNavigate } = useMfeCallbacks();
  const {
    generalState,
    handleClickCart,
    handleClickCloseNotification,
    handleClickHeaderOption,
    handleClickMenu,
    handleClickMenuClose,
    handleClickSearch,
    handleSubmitSearch,
    handleSubmitSubscribeNewsletter,
  } = useGeneralContext();

  const { notificationClosed, footerLinks, headerOptions, isMenuOpen } = generalState;

  const handleClickTitle = (): void => {
    onNavigate("/");
  };

  return (
    <Fragment>
      <SharedMfe
        loader={() => import("shared-angular/sdk").then((m) => m.NotificationBarModule)}
        componentProps={{
          language: "en",
          text: NOTIFICATION_TEXT,
          className: notificationClosed ? "notification-bar--hidden" : "",
          onClose: handleClickCloseNotification,
        }}
        wrapperClass="notification-bar-wrapper"
        loadingClass="notification-bar-loader"
      />

      <SharedMfe
        loader={() => import("shared-angular/sdk").then((m) => m.HeaderModule)}
        componentProps={{
          name: TITLE_APP,
          language: "en",
          onClickCart: handleClickCart,
          onClickMenu: handleClickMenu,
          onClickTitle: handleClickTitle,
          onClickSearch: handleClickSearch,
          onSubmitSearch: handleSubmitSearch,
        }}
        wrapperClass="header-wrapper"
        loadingClass="header-loader"
      />

      <MenuHeader isMenuOpen={isMenuOpen} language="en" handleClickMenuClose={handleClickMenuClose}>
        <div className="menu-header__options">
          {headerOptions.map((ho) => (
            <HeaderOption
              key={`menu-header-option-${ho.id}`}
              name={ho.name}
              isMenu={ho.isMenu ?? false}
              open={ho.open ?? false}
              onClick={handleClickHeaderOption}
              className="menu-header__option"
            />
          ))}
        </div>
      </MenuHeader>

      {children}

      <SharedMfe
        component={FooterWithSubscribeNewsletter}
        mfe="shared-react"
        componentProps={{
          title: TITLE_APP,
          description: lang.en.footer.description,
          instagram: INSTAGRAM_LINK,
          facebook: FACEBOOK_LINK,
          twitter: X_LINK,
          language: "en",
          onSubmitSubscribe: handleSubmitSubscribeNewsletter,
          children: footerLinks.map((fl) => (
            <FooterSection key={`footer-link-${fl.id}`} title={fl.title} content={fl.content} />
          )),
        }}
        wrapperClass="footer-with-subscribe-newsletter-wrapper"
        loadingClass="footer-with-subscribe-newsletter-loader"
      />
    </Fragment>
  );
};

export default LayoutPrincipal;

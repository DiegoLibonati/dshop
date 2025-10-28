import React, { Fragment, lazy, Suspense, useRef } from "react";

import { LayoutPageProps } from "@src/entities/props";

import { HeaderOption } from "@src/components/composed/Headers/HeaderOption/HeaderOption";
import { FooterSection } from "@src/components/composed/Footers/FooterSection/FooterSection";
import { LoaderScreen } from "@src/components/core/Loaders/LoaderScreen/LoaderScreen";

import { useRouter } from "@src/hooks/useRouter";
import { useGeneralContext } from "@src/hooks/useGeneralContext";

import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  TITLE_APP,
  X_LINK,
} from "@src/constants/vars";
import { lang } from "@src/constants/lang";

import { getIdsByLength } from "shared_core/SharedCore";

import "@src/layouts/LayoutPrincipal/LayoutPrincipal.css";

const NotificationBarLazy = lazy(
  () =>
    import("@src/components/core/Notifications/NotificationBar/NotificationBar")
);
const HeaderLazy = lazy(
  () => import("@src/components/core/Headers/Header/Header")
);
const MenuHeaderLazy = lazy(
  () => import("@src/components/composed/Menus/MenuHeader/MenuHeader")
);
const FooterWithSubscribeNewsletterLazy = lazy(
  () =>
    import(
      "@src/components/core/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter"
    )
);

const LayoutPrincipal = ({ children }: LayoutPageProps) => {
  const idsLayouts = useRef<string[]>(getIdsByLength(4));

  const { navigateToHome } = useRouter();
  const {
    scrolled,
    notificationClosed,
    footerLinks,
    headerOptions,
    isMenuOpen,
    handleClickCart,
    handleClickCloseNotification,
    handleClickHeaderOption,
    handleClickMenu,
    handleClickMenuClose,
    handleClickSearch,
    handleSubmitSearch,
    handleSubmitSubscribeNewsletter,
  } = useGeneralContext();

  const handleClickTitle = (_: MouseEvent) => {
    navigateToHome();
  };

  return (
    <Suspense
      fallback={<LoaderScreen idRoot={idsLayouts.current[0]}></LoaderScreen>}
    >
      <Fragment>
        <NotificationBarLazy
          idRoot={idsLayouts.current[1]}
          onClose={handleClickCloseNotification}
          className={`${
            (scrolled || notificationClosed) && "notification-bar--hidden"
          }`}
        >
          {lang["en"].notifications.bar}
        </NotificationBarLazy>

        <HeaderLazy
          idRoot={idsLayouts.current[2]}
          name={TITLE_APP}
          isFixed={true}
          onClickCart={handleClickCart}
          onClickMenu={handleClickMenu}
          onClickTitle={handleClickTitle}
          onClickSearch={handleClickSearch}
          onSubmitSearch={handleSubmitSearch}
        >
          {/* @ts-ignore */}
          {headerOptions.map((ho) => {
            return (
              <HeaderOption
                key={`header-option-${ho.id}`}
                name={ho.name}
                isMenu={ho.isMenu!}
                open={ho.open!}
                onClick={handleClickHeaderOption}
              ></HeaderOption>
            );
          })}
        </HeaderLazy>

        <MenuHeaderLazy
          isMenuOpen={isMenuOpen}
          language="en"
          handleClickMenuClose={handleClickMenuClose}
        >
          <div className="menu-header__options">
            {headerOptions.map((ho) => {
              return (
                <HeaderOption
                  key={`menu-header-option-${ho.id}`}
                  name={ho.name}
                  isMenu={ho.isMenu!}
                  open={ho.open!}
                  onClick={handleClickHeaderOption}
                  className="menu-header__option"
                ></HeaderOption>
              );
            })}
          </div>
        </MenuHeaderLazy>

        {children}

        <FooterWithSubscribeNewsletterLazy
          idRoot={idsLayouts.current[3]}
          title={TITLE_APP}
          description={lang["en"].footer.description}
          instagram={INSTAGRAM_LINK}
          facebook={FACEBOOK_LINK}
          twitter={X_LINK}
          language={"en"}
          onSubmitSubscribe={handleSubmitSubscribeNewsletter}
        >
          {footerLinks.length > 0 &&
            footerLinks.map((fl) => {
              return (
                <FooterSection
                  key={`footer-link-${fl.id}`}
                  title={fl.title}
                  content={fl.content}
                ></FooterSection>
              );
            })}
        </FooterWithSubscribeNewsletterLazy>
      </Fragment>
    </Suspense>
  );
};

export default LayoutPrincipal;

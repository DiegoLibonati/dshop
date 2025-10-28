import React, { createContext, useEffect, useState } from "react";

import type { GeneralContext as GeneralContextT } from "@src/entities/contexts";
import { GeneralProviderProps } from "@src/entities/props";
import {
  FooterSection as FooterSectionT,
  HeaderOption as HeaderOptionT,
} from "@src/entities/app";

import { getHeaderOptions } from "@src/helpers/getHeaderOptions";
import { getFooterLinks } from "@src/helpers/getFooterLinks";

export const GeneralContext = createContext<GeneralContextT | null>(null);

export const GeneralProvider = ({ children }: GeneralProviderProps) => {
  const [headerOptions, setHeaderOptions] = useState<HeaderOptionT[]>(() =>
    getHeaderOptions("en")
  );
  const [footerLinks, setFooterLinks] = useState<FooterSectionT[]>(() =>
    getFooterLinks("en")
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [notificationClosed, setNotificationClosed] = useState<boolean>(false);

  const handleClickMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleClickCart = (_: MouseEvent) => {
    alert("Not configured.");
  };

  const handleClickMenu = (_: MouseEvent) => {
    setIsMenuOpen(true);
  };

  const handleClickSearch = (_: MouseEvent) => {
    setIsMenuOpen(true);
  };

  const handleSubmitSearch = (_: string) => {
    alert("Not configured.");
  };

  const handleSubmitSubscribeNewsletter = (_: string) => {
    alert("Not configured.");
  };

  const handleClickHeaderOption = () => {
    alert("Not configured.");
  };

  const handleClickCloseNotification = () => {
    setNotificationClosed(true);
  };

  const onLanguageChange = () => {
    const lng = "en";

    setHeaderOptions(getHeaderOptions(lng));
    setFooterLinks(getFooterLinks(lng));
  };

  const onWindowScroll = () => {
    const scrollY = window.scrollY;

    if (!scrollY) return setScrolled(false);
    return setScrolled(true);
  };

  useEffect(onLanguageChange, []);
  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        headerOptions,
        footerLinks,
        isMenuOpen,
        scrolled,
        notificationClosed,
        handleClickCloseNotification,
        handleClickMenuClose,
        handleClickCart,
        handleClickMenu,
        handleClickSearch,
        handleSubmitSearch,
        handleSubmitSubscribeNewsletter,
        handleClickHeaderOption,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

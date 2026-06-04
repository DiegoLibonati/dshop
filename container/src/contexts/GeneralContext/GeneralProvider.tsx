import { useEffect, useState } from "react";

import type { JSX } from "react";
import type { GeneralProviderProps } from "@container/types/props";
import type { GeneralState } from "@container/types/states";

import { GeneralContext } from "@container/contexts/GeneralContext/GeneralContext";

import { getHeaderOptions } from "@container/helpers/getHeaderOptions";
import { getFooterLinks } from "@container/helpers/getFooterLinks";

export const GeneralProvider = ({ children }: GeneralProviderProps): JSX.Element => {
  const [generalState, setGeneralState] = useState<GeneralState>({
    headerOptions: getHeaderOptions("en"),
    footerLinks: getFooterLinks("en"),
    isMenuOpen: false,
    notificationClosed: false,
  });

  const handleClickMenuClose = (): void => {
    setGeneralState((state) => ({ ...state, isMenuOpen: false }));
  };

  const handleClickCart = (_: MouseEvent): void => {
    alert("Not configured.");
  };

  const handleClickMenu = (_: MouseEvent): void => {
    setGeneralState((state) => ({ ...state, isMenuOpen: true }));
  };

  const handleClickSearch = (_: MouseEvent): void => {
    setGeneralState((state) => ({ ...state, isMenuOpen: true }));
  };

  const handleSubmitSearch = (_: string): void => {
    alert("Not configured.");
  };

  const handleSubmitSubscribeNewsletter = (_: string): void => {
    alert("Not configured.");
  };

  const handleClickHeaderOption = (): void => {
    alert("Not configured.");
  };

  const handleClickCloseNotification = (): void => {
    setGeneralState((state) => ({ ...state, notificationClosed: true }));
  };

  const onLanguageChange = (): void => {
    const lng = "en";

    setGeneralState((state) => ({
      ...state,
      headerOptions: getHeaderOptions(lng),
      footerLinks: getFooterLinks(lng),
    }));
  };

  useEffect(onLanguageChange, []);

  return (
    <GeneralContext.Provider
      value={{
        generalState: generalState,
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

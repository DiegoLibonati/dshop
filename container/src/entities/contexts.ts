import { FooterSection, HeaderOption } from "@src/entities/app";

export type GeneralContext = {
  headerOptions: HeaderOption[];
  footerLinks: FooterSection[];
  isMenuOpen: boolean;
  scrolled: boolean;
  notificationClosed: boolean;
  handleClickCloseNotification: () => void;
  handleClickMenuClose: () => void;
  handleClickCart: (e: MouseEvent) => void;
  handleClickMenu: (e: MouseEvent) => void;
  handleClickSearch: (e: MouseEvent) => void;
  handleSubmitSearch: (value: string) => void;
  handleSubmitSubscribeNewsletter: (value: string) => void;
  handleClickHeaderOption: () => void;
};

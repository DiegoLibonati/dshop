import type { FooterSection, HeaderOption } from "@container/types/app";

export interface GeneralState {
  headerOptions: HeaderOption[];
  footerLinks: FooterSection[];
  isMenuOpen: boolean;
  notificationClosed: boolean;
}

export interface LoadingState {
  pending: number;
  booted: boolean;
  timedOut: boolean;
}

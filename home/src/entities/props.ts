import { Callbacks, Content, DressStyle } from "@src/entities/app";

import { Locale } from "shared_core/SharedCoreEntities";

export interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
  language?: Locale;
  html?: string;
}

export interface AppProps {
  callbacks: Callbacks;
  content: Content;
}

export interface GallerySectionLayoutProps extends DefaultProps {
  btnText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IllustrationWithTitleProps extends DefaultProps {
  type: DressStyle;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CarrouselWithTitleAndArrowsProps extends DefaultProps {}

export interface ConfigProviderProps extends DefaultProps {}
export interface BrandsProviderProps extends DefaultProps {}
export interface NewArrivalsProviderProps extends DefaultProps {}
export interface TopSellingsProviderProps extends DefaultProps {}
export interface DressStylesProviderProps extends DefaultProps {}
export interface HappyCustomersProviderProps extends DefaultProps {}

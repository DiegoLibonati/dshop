import type { Brand, DressStyle } from "@home/types/app";
import type { Clothes, Locale, MfeScope, Review, SharedComponentModule } from "shared-core/sdk";

export interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
  language?: Locale;
}

interface DefaultSharedMfeProps {
  wrapperClass?: string;
  loadingClass?: string;
}

export type SharedMfeProps<P> = DefaultSharedMfeProps &
  (
    | { component: React.ComponentType<P>; componentProps: P; mfe?: MfeScope }
    | { loader: () => Promise<SharedComponentModule<P>>; componentProps: P }
  );

export interface HomePageProps {
  brands: Brand[];
  newArrivals: Clothes[];
  topSellings: Clothes[];
  reviews: Review[];
}

export interface GallerySectionLayoutProps extends DefaultProps {
  btnText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IllustrationWithTitleProps extends DefaultProps {
  type: DressStyle;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type CarrouselWithTitleAndArrowsProps = DefaultProps;

export interface BrandsProviderProps {
  children: React.ReactNode;
}
export interface NewArrivalsProviderProps {
  children: React.ReactNode;
}
export interface TopSellingsProviderProps {
  children: React.ReactNode;
}
export interface DressStylesProviderProps {
  children: React.ReactNode;
}
export interface HappyCustomersProviderProps {
  children: React.ReactNode;
}

export interface SharedMfeMountProps<P> {
  loader: () => Promise<SharedComponentModule<P>>;
  componentProps: P;
  wrapperClass?: string | undefined;
  loadingClass?: string | undefined;
}

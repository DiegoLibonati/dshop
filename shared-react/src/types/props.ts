import type { Clothes, Locale } from "shared-core/sdk";

export interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
  language?: Locale;
}

export interface SharedMfeProps<P> {
  component: React.ComponentType<P>;
  componentProps: P;
  wrapperClass?: string;
  loadingClass?: string;
}

export interface ItemClothesProps extends DefaultProps {
  src: string;
  name: string;
  rate: number;
  price: number;
  discount: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface FooterWithSubscribeNewsletterProps extends DefaultProps {
  title: string;
  description: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  onSubmitSubscribe: (inputValue: string) => void;
}

export interface SubscribeNewsletterProps extends DefaultProps {
  title: string;
  submitLabel: string;
  onSubmit: (inputValue: string) => void;
}

export type LoaderScreenProps = DefaultProps;

export interface GalleryClothesProps extends DefaultProps {
  title: string;
  clothes: Clothes[] | null;
  onClothesClick: (c: Clothes) => void;
}

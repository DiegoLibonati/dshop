import type { SVGProps } from "react";
import type { Locale } from "@shared-core/types/app";
import type { MfeCallbacks } from "@shared-core/types/mfe";

export interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
  language?: Locale;
}

export interface ButtonBlackProps extends DefaultProps {
  ariaLabel: string;
  rounded?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ImageWithBackgroundColorProps extends DefaultProps {
  src: string;
  alt: string;
  bgColor: string;
  isActive: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface InformationItemClothesProps extends DefaultProps {
  name: string;
  rate: number;
  price: number;
  discount: number;
  description?: string;
}

export interface RateStarsProps extends DefaultProps {
  max: number;
  value: number;
  inColor: string;
  outColor: string;
  classNameStar?: string;
}

export type SliderSnapXProps = DefaultProps;

export interface ButtonWhiteProps extends DefaultProps {
  ariaLabel: string;
  rounded?: boolean;
  borderGray?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AnchorCircularProps extends DefaultProps {
  ariaLabel: string;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  borderGray?: boolean;
}

export type MenuScreenWhiteProps = DefaultProps;

export interface FormSearchProps extends DefaultProps {
  placeholder?: string;
  onSubmit: (inputValue: string) => void;
}

export interface ColorCircleProps extends DefaultProps {
  color: string;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface TagSimpleProps extends DefaultProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface CounterWithActionsProps extends DefaultProps {
  limit?: number;
  onChange: (value: number) => void;
}

export interface SkeletonShimmerProps extends DefaultProps {
  rounded?: boolean;
}

export type LoaderCircularProps = DefaultProps;

export interface SvgStarToFillProps extends SVGProps<SVGSVGElement>, DefaultProps {
  outColor: string;
  inColor: string;
  fill: string;
  className?: string;
}

export type SvgSearchProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgHamburgerMenuProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgChevronUpProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgChevronDownProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgCartShoppingProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgSkyStarProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgArrowLeftProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgArrowRightProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgTwitterProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgFacebookProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgInstagramProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgCloseProps = SVGProps<SVGSVGElement> & DefaultProps;

export type SvgCheckProps = SVGProps<SVGSVGElement> & DefaultProps;

export interface InheritedProviderProps {
  children: React.ReactNode;
  callbacks: MfeCallbacks;
}

export interface MfeErrorBoundaryProps {
  children: React.ReactNode;
  onError?: ((error: Error) => void) | undefined;
}

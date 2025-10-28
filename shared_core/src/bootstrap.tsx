import React from "react";
import { createRoot, Root } from "react-dom/client";

import { MountOptions, UnMountOptions } from "@src/entities/app";
import {
  AnchorCircularProps,
  ButtonBlackProps,
  ButtonWhiteProps,
  ColorCircleProps,
  CounterWithActionsProps,
  FormSearchProps,
  GetComponentIdProps,
  ImageWithBackgroundColorProps,
  InformationItemClothesProps,
  LoaderCircularProps,
  MenuScreenWhiteProps,
  RateStarsProps,
  SkeletonShimmerProps,
  SliderSnapXProps,
  SvgArrowLeftProps,
  SvgArrowRightProps,
  SvgCartShoppingProps,
  SvgCheckProps,
  SvgChevronDownProps,
  SvgChevronUpProps,
  SvgCloseProps,
  SvgFacebookProps,
  SvgHamburgerMenuProps,
  SvgInstagramProps,
  SvgSearchProps,
  SvgSkyStarProps,
  SvgStarToFillProps,
  SvgTwitterProps,
  TagSimpleProps,
} from "@src/entities/props";
import { Component } from "@src/entities/enum";

import { App } from "@src/App";
import { SvgStarToFill } from "@src/components/Svgs/SvgStarToFill/SvgStarToFill";
import { SvgChevronDown } from "@src/components/Svgs/SvgChevronDown/SvgChevronDown";
import { SvgChevronUp } from "@src/components/Svgs/SvgChevronUp/SvgChevronUp";
import { SvgHamburgerMenu } from "@src/components/Svgs/SvgHamburgerMenu/SvgHamburgerMenu";
import { SvgCartShopping } from "@src/components/Svgs/SvgCartShopping/SvgCartShopping";
import { SvgSearch } from "@src/components/Svgs/SvgSearch/SvgSearch";
import { SvgSkyStar } from "@src/components/Svgs/SvgSkyStar/SvgSkyStar";
import { SvgArrowLeft } from "@src/components/Svgs/SvgArrowLeft/SvgArrowLeft";
import { SvgArrowRight } from "@src/components/Svgs/SvgArrowRight/SvgArrowRight";
import { SvgTwitter } from "@src/components/Svgs/SvgTwitter/SvgTwitter";
import { SvgFacebook } from "@src/components/Svgs/SvgFacebook/SvgFacebook";
import { SvgInstagram } from "@src/components/Svgs/SvgInstagram/SvgInstagram";
import { SvgClose } from "@src/components/Svgs/SvgClose/SvgClose";
import { SvgCheck } from "@src/components/Svgs/SvgCheck/SvgCheck";
import { ButtonBlack } from "@src/components/Buttons/ButtonBlack/ButtonBlack";
import { ButtonWhite } from "@src/components/Buttons/ButtonWhite/ButtonWhite";
import { ImageWithBackgroundColor } from "@src/components/Images/ImageWithBackgroundColor/ImageWithBackgroundColor";
import { InformationItemClothes } from "@src/components/Informations/InformationItemClothes/InformationItemClothes";
import { RateStars } from "@src/components/Ratings/RateStars/RateStars";
import { SliderSnapX } from "@src/components/Sliders/SliderSnapX/SliderSnapX";
import { AnchorCircular } from "@src/components/Anchors/AnchorCircular/AnchorCircular";
import { MenuScreenWhite } from "@src/components/Menus/MenuScreenWhite/MenuScreenWhite";
import { FormSearch } from "@src/components/Forms/FormSearch/FormSearch";
import { ColorCircle } from "@src/components/Colors/ColorCircle/ColorCircle";
import { TagSimple } from "@src/components/Tags/TagSimple/TagSimple";
import { CounterWithActions } from "@src/components/Counters/CounterWithActions/CounterWithActions";
import { SkeletonShimmer } from "@src/components/Skeletons/SkeletonShimmer/SkeletonShimmer";
import { LoaderCircular } from "@src/components/Loaders/LoaderCircular/LoaderCircular";

import { getFinalPriceByDiscount } from "@src/helpers/getFinalPriceByDiscount";
import { getIdsByLength } from "@src/helpers/getIdsByLength";

import envs from "@src/constants/envs";

const roots: Record<string, Root> = {};
const titleMfe: string = "Shared Core";

export const getComponentById = (
  idComponent: Component,
  props: GetComponentIdProps
): React.ReactNode => {
  return {
    [Component.AppTest]: <App></App>,
    [Component.SvgStarToFill]: (
      <SvgStarToFill {...(props as SvgStarToFillProps)} />
    ),
    [Component.SvgCartShopping]: (
      <SvgCartShopping {...(props as SvgCartShoppingProps)} />
    ),
    [Component.SvgChevronDown]: (
      <SvgChevronDown {...(props as SvgChevronDownProps)} />
    ),
    [Component.SvgChevronUp]: (
      <SvgChevronUp {...(props as SvgChevronUpProps)} />
    ),
    [Component.SvgHamburgerMenu]: (
      <SvgHamburgerMenu {...(props as SvgHamburgerMenuProps)} />
    ),
    [Component.SvgSearch]: <SvgSearch {...(props as SvgSearchProps)} />,
    [Component.SvgSkyStar]: <SvgSkyStar {...(props as SvgSkyStarProps)} />,
    [Component.SvgArrowLeft]: (
      <SvgArrowLeft {...(props as SvgArrowLeftProps)} />
    ),
    [Component.SvgArrowRight]: (
      <SvgArrowRight {...(props as SvgArrowRightProps)} />
    ),
    [Component.SvgTwitter]: <SvgTwitter {...(props as SvgTwitterProps)} />,
    [Component.SvgFacebook]: <SvgFacebook {...(props as SvgFacebookProps)} />,
    [Component.SvgInstagram]: (
      <SvgInstagram {...(props as SvgInstagramProps)} />
    ),
    [Component.SvgClose]: <SvgClose {...(props as SvgCloseProps)} />,
    [Component.SvgCheck]: <SvgCheck {...(props as SvgCheckProps)} />,
    [Component.ButtonBlack]: <ButtonBlack {...(props as ButtonBlackProps)} />,
    [Component.ButtonWhite]: <ButtonWhite {...(props as ButtonWhiteProps)} />,
    [Component.ImageWithBackgroundColor]: (
      <ImageWithBackgroundColor {...(props as ImageWithBackgroundColorProps)} />
    ),
    [Component.InformationItemClothes]: (
      <InformationItemClothes {...(props as InformationItemClothesProps)} />
    ),
    [Component.RateStars]: <RateStars {...(props as RateStarsProps)} />,
    [Component.SliderSnapX]: <SliderSnapX {...(props as SliderSnapXProps)} />,
    [Component.AnchorCircular]: (
      <AnchorCircular {...(props as AnchorCircularProps)} />
    ),
    [Component.MenuScreenWhite]: (
      <MenuScreenWhite {...(props as MenuScreenWhiteProps)} />
    ),
    [Component.FormSearch]: <FormSearch {...(props as FormSearchProps)} />,
    [Component.ColorCircle]: <ColorCircle {...(props as ColorCircleProps)} />,
    [Component.TagSimple]: <TagSimple {...(props as TagSimpleProps)} />,
    [Component.CounterWithActions]: (
      <CounterWithActions
        {...(props as CounterWithActionsProps)}
      ></CounterWithActions>
    ),
    [Component.SkeletonShimmer]: (
      <SkeletonShimmer {...(props as SkeletonShimmerProps)}></SkeletonShimmer>
    ),
    [Component.LoaderCircular]: (
      <LoaderCircular {...(props as LoaderCircularProps)}></LoaderCircular>
    ),
  }[idComponent];
};

const mountComponent = (el: HTMLDivElement, options: MountOptions) => {
  const debug = options?.debug;
  const props = options?.props;
  const idComponent = options.idComponent;

  if (!envs.IS_DEV && idComponent === Component.AppTest) {
    throw new Error(
      `[mountComponent - ${titleMfe}] You cannot render this component. Component: ${idComponent}`
    );
  }

  const idRootComponent = props?.idRoot as string;

  if (!idRootComponent) {
    throw new Error(
      `[mountComponent - ${titleMfe}] You must provide an 'idRoot' to identify the component`
    );
  }

  const reactNode = getComponentById(idComponent, props!);
  const rootExists = roots[idRootComponent];

  if (rootExists) {
    rootExists.render(reactNode);
    return;
  }

  const root = createRoot(el);

  root.render(reactNode);
  roots[idRootComponent] = root;

  if (envs.IS_DEV === "development" && debug) {
    console.log(`[mountComponent - ${titleMfe}] mounting ${idRootComponent}`);
  }
};

const unMountComponent = (idRoot: string, options?: UnMountOptions) => {
  const debug = options?.debug;
  const rootExists = roots[idRoot];

  if (!rootExists) {
    throw new Error(
      `[unMountComponent - ${titleMfe}] No component found with idRoot: ${idRoot}`
    );
  }

  requestAnimationFrame(() => rootExists.unmount());
  delete roots[idRoot];

  if (envs.IS_DEV === "development" && debug) {
    console.log(`[unMountComponent - ${titleMfe}] Unmounting ${idRoot}`);
  }
};

// Dev
if (envs.IS_DEV === "development") {
  const devRoot = document.getElementById(
    "_shared-core-dev-root"
  ) as HTMLDivElement;

  if (devRoot) {
    const options: MountOptions = {
      props: { idRoot: "Rootcito APP" },
      idComponent: Component.AppTest,
    };

    mountComponent(devRoot, options);
  }
}

export {
  mountComponent,
  unMountComponent,
  getFinalPriceByDiscount,
  getIdsByLength,
};

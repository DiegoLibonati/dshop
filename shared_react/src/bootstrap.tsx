import React from "react";
import { createRoot, Root } from "react-dom/client";

import {
  FooterWithSubscribeNewsletterProps,
  GalleryClothesProps,
  GetComponentByIdProps,
  ItemClothesProps,
  LoaderScreenProps,
  SubscribeNewsletterProps,
} from "@src/entities/props";
import { Component } from "@src/entities/enum";
import { MountOptions, UnMountOptions } from "@src/entities/entities";

import { App } from "@src/App";
import { ItemClothes } from "@src/components/composed/Items/ItemClothes/ItemClothes";
import { FooterWithSubscribeNewsletter } from "@src/components/composed/Footers/FooterWithSubscribeNewsletter/FooterWithSubscribeNewsletter";
import { SubscribeNewsletter } from "@src/components/composed/Subscribes/SubscribeNewsletter/SubscribeNewsletter";
import { LoaderScreen } from "@src/components/composed/Loaders/LoaderScreen/LoaderScreen";
import { GalleryClothes } from "@src/components/composed/Galleries/GalleryClothes/GalleryClothes";

import envs from "@src/constants/envs";

const roots: Record<string, Root> = {};
const titleMfe: string = "Shared React";

export const getComponentById = (
  idComponent: Component,
  props: GetComponentByIdProps
): React.ReactNode => {
  return {
    [Component.AppTest]: <App {...(props as Record<string, unknown>)} />,
    [Component.ItemClothes]: (
      <ItemClothes {...(props as ItemClothesProps)}></ItemClothes>
    ),
    [Component.FooterWithSubscribeNewsletter]: (
      <FooterWithSubscribeNewsletter
        {...(props as FooterWithSubscribeNewsletterProps)}
      ></FooterWithSubscribeNewsletter>
    ),
    [Component.SubscribeNewsletter]: (
      <SubscribeNewsletter
        {...(props as SubscribeNewsletterProps)}
      ></SubscribeNewsletter>
    ),
    [Component.LoaderScreen]: (
      <LoaderScreen {...(props as LoaderScreenProps)}></LoaderScreen>
    ),
    [Component.GalleryClothes]: (
      <GalleryClothes {...(props as GalleryClothesProps)}></GalleryClothes>
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
    "_shared-react-dev-root"
  ) as HTMLDivElement;

  if (devRoot) {
    const options: MountOptions = {
      idComponent: Component.AppTest,
      props: { idRoot: "Rootcito APP" },
    };

    mountComponent(devRoot, options);
  }
}

export { mountComponent, unMountComponent };

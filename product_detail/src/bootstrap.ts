import { createApp, type App as VueApp } from "vue";

import { MountOptions, UnMountOptions } from "@src/entities/app";

import App from "@src/App.vue";

import envs from "@src/constants/envs";
import { PRODUCT_1 } from "@src/constants/products";
import { CLOTHES_1 } from "@src/constants/clothes";

const titleMfe: string = "Product Detail";
let app: VueApp | null = null;

const mount = (el: HTMLElement, options?: MountOptions) => {
  const debug = options?.debug;
  const props = options?.props || {};

  if (!app) app = createApp(App, props);

  app.mount(el);

  if (envs.IS_DEV === "development" && debug) {
    console.log(`[mountComponent - ${titleMfe}] mounting ${titleMfe}`);
  }
};

const unMount = (options?: UnMountOptions) => {
  const debug = options?.debug;

  if (!app) {
    throw new Error(
      `[unMountComponent - ${titleMfe}] No MFE found ${titleMfe}`
    );
  }

  app.unmount();
  app = null;

  if (envs.IS_DEV === "development" && debug) {
    console.log(`[unMountComponent - ${titleMfe}] Unmounting ${titleMfe}`);
  }
};

// Dev
if (envs.IS_DEV === "development") {
  const devRoot = document.getElementById(
    "_product-detail-dev-root"
  ) as HTMLDivElement;

  if (devRoot) {
    const options: MountOptions = {
      props: { content: { product: PRODUCT_1, clothesAlsoLike: CLOTHES_1 } },
    };
    mount(devRoot, options);
  }
}

export { mount, unMount };

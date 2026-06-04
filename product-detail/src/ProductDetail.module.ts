import { createApp } from "vue";

import type { App as VueApp } from "vue";
import type { ProductDetailMfeMountOptions } from "@product-detail/types/mfe";

import ProductDetailPage from "@product-detail/pages/ProductDetailPage/ProductDetailPage.vue";

import "@product-detail/index.css";

const apps = new Map<HTMLElement, VueApp>();

const mount = (container: HTMLElement, options: ProductDetailMfeMountOptions): void => {
  container.dataset.mfe = "product-detail";

  if (apps.has(container)) {
    unmount(container);
  }

  const app = createApp(ProductDetailPage, {
    product: options.product,
    clothesAlsoLike: options.clothesAlsoLike,
  });
  app.config.errorHandler = (error: unknown): void => {
    options.onError?.(error instanceof Error ? error : new Error(String(error)));
  };
  app.provide("mfeCallbacks", options.callbacks);
  apps.set(container, app);
  app.mount(container);
};

const unmount = (container: HTMLElement): void => {
  const app = apps.get(container);

  if (app) {
    app.unmount();
    apps.delete(container);
  }
};

export { mount, unmount };

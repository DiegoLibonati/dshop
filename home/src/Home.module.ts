import { createElement } from "react";

import { mount as sharedMount, unmount } from "shared-core/sdk";

import type { HomeMfeMountOptions } from "@home/types/mfe";

import App from "@home/App";

import "@home/index.css";

const mount = (container: HTMLElement, options: HomeMfeMountOptions): void => {
  container.dataset.mfe = "home";

  const { brands, newArrivals, topSellings, reviews, ...mountOptions } = options;

  const HomeApp: React.ComponentType = () =>
    createElement(App, { brands, newArrivals, topSellings, reviews });

  sharedMount(HomeApp, container, mountOptions);
};

export { mount, unmount };

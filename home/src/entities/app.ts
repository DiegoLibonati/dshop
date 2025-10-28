import { AppProps } from "@src/entities/props";

import { Clothes, Review } from "shared_core/SharedCoreEntities";

export type MountOptions = {
  props: AppProps;
  debug?: Debug;
};

export type UnMountOptions = {
  debug?: Debug;
};

export type Debug = boolean;

export type Callbacks = { navigateToProductDetail: (id: string) => void };

export type Content = {
  brands: string[];
  newArrivals: Clothes[];
  topSellings: Clothes[];
  reviews: Review[];
};

export type DressStyle = "casual" | "formal" | "party" | "gym";

export type Brand = string;

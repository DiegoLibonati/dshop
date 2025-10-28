import { AppProps } from "@src/entities/props";

import { Clothes, Product } from "shared_core/SharedCoreEntities";

export type MountOptions = {
  props: AppProps;
  debug?: Debug;
};

export type UnMountOptions = {
  debug?: Debug;
};

export type Debug = boolean;

export type Content = {
  product: Product;
  clothesAlsoLike: Clothes[];
};

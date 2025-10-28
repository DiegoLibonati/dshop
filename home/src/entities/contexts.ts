import { Brand, Callbacks, DressStyle } from "@src/entities/app";

import { Clothes, Review } from "shared_core/SharedCoreEntities";

export type ConfigContext = {
  callbacks: Callbacks | null;
  handleSetInitialConfig: ({ callbacks }: { callbacks: Callbacks }) => void;
};

export type BrandsContext = {
  brands: Brand[] | null;
  handleSetBrands: (brands: Brand[] | null) => void;
};

export type NewArrivalsContext = {
  newArrivals: Clothes[] | null;
  handleSetNewArrivals: (newArrivals: Clothes[] | null) => void;
};

export type TopSellingsContext = {
  topSellings: Clothes[] | null;
  handleSetTopSellings: (topSellings: Clothes[] | null) => void;
};

export type DressStylesContext = {
  dressStyles: DressStyle[] | null;
  handleSetDressStyles: (dressStyles: DressStyle[] | null) => void;
};

export type HappyCustomersContext = {
  reviews: Review[] | null;
  handleSetReviews: (reviews: Review[] | null) => void;
};

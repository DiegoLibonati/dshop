import type {
  BrandsState,
  NewArrivalsState,
  TopSellingsState,
  DressStylesState,
  HappyCustomersState,
} from "@home/types/states";
import type { Brand, DressStyle } from "@home/types/app";
import type { Clothes, Review } from "shared-core/sdk";

export interface BrandsContext {
  brandsState: BrandsState;
  handleSetBrands: (brands: Brand[] | null) => void;
}

export interface NewArrivalsContext {
  newArrivalsState: NewArrivalsState;
  handleSetNewArrivals: (newArrivals: Clothes[] | null) => void;
}

export interface TopSellingsContext {
  topSellingsState: TopSellingsState;
  handleSetTopSellings: (topSellings: Clothes[] | null) => void;
}

export interface DressStylesContext {
  dressStylesState: DressStylesState;
  handleSetDressStyles: (dressStyles: DressStyle[] | null) => void;
}

export interface HappyCustomersContext {
  happyCustomersState: HappyCustomersState;
  handleSetReviews: (reviews: Review[] | null) => void;
}

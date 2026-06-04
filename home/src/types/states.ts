import type { Brand, DressStyle } from "@home/types/app";
import type { Clothes, Review } from "shared-core/sdk";

export interface BrandsState {
  brands: Brand[] | null;
}

export interface DressStylesState {
  styles: DressStyle[] | null;
}

export interface HappyCustomersState {
  reviews: Review[] | null;
}

export interface NewArrivalsState {
  clothes: Clothes[] | null;
}

export interface TopSellingsState {
  clothes: Clothes[] | null;
}

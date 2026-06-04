import type { Brand } from "@home/types/app";
import type { Clothes, MfeMountOptions, Review } from "shared-core/sdk";

export interface HomeMfeMountOptions extends MfeMountOptions {
  brands: Brand[];
  newArrivals: Clothes[];
  topSellings: Clothes[];
  reviews: Review[];
}

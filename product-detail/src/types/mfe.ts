import type { Clothes, MfeMountOptions, Product } from "shared-core/sdk";

export interface ProductDetailMfeMountOptions extends MfeMountOptions {
  product: Product;
  clothesAlsoLike: Clothes[];
}

declare module "home/HomeApp" {
  import type { MfeModule } from "shared-core/sdk";
  const homeModule: MfeModule;
  export default homeModule;
  export const mount: MfeModule["mount"];
  export const unmount: MfeModule["unmount"];
}

declare module "product-detail/ProductDetailApp" {
  import type { MfeModule } from "shared-core/sdk";
  const aboutModule: MfeModule;
  export default aboutModule;
  export const mount: MfeModule["mount"];
  export const unmount: MfeModule["unmount"];
}

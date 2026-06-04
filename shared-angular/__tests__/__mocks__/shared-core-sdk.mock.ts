import type { SharedComponentModule } from "shared-core/sdk";

export const makeSharedModule = (): SharedComponentModule => ({
  mount: jest.fn(),
  unmount: jest.fn(),
});

export const SvgHamburgerMenuModule = makeSharedModule();
export const SvgSearchModule = makeSharedModule();
export const SvgCartShoppingModule = makeSharedModule();
export const FormSearchModule = makeSharedModule();
export const SvgCloseModule = makeSharedModule();
export const RateStarsModule = makeSharedModule();

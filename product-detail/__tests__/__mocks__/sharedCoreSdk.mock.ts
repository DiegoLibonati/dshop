import type { Mock } from "vitest";

interface SharedComponentModuleMock {
  mount: Mock;
  unmount: Mock;
}

const createSharedComponentModuleMock = (): SharedComponentModuleMock => ({
  mount: vi.fn(),
  unmount: vi.fn(),
});

export const ImageWithBackgroundColorModule = createSharedComponentModuleMock();
export const InformationItemClothesModule = createSharedComponentModuleMock();
export const ColorCircleModule = createSharedComponentModuleMock();
export const TagSimpleModule = createSharedComponentModuleMock();
export const CounterWithActionsModule = createSharedComponentModuleMock();
export const ButtonBlackModule = createSharedComponentModuleMock();

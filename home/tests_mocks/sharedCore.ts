export const getIdsByLength = (length: number): string[] =>
  Array.from({ length }, (_, i) => `mock-id-${i}`);

export const mountComponent = jest.fn();
export const unMountComponent = jest.fn();

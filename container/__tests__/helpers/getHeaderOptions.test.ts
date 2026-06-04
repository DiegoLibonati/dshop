import type { HeaderOptionId } from "@container/types/app";

import { getHeaderOptions } from "@container/helpers/getHeaderOptions";

import { lang } from "@container/constants/lang";

describe("getHeaderOptions", () => {
  it("should return one option per configured header entry", () => {
    const options = getHeaderOptions("en");

    expect(options).toHaveLength(Object.keys(lang.en.header.options).length);
  });

  it("should map each option id and name from the language config", () => {
    const options = getHeaderOptions("en");

    const expectedIds: HeaderOptionId[] = ["shop", "onSale", "newArrivals", "brands"];

    expect(options.map((option) => option.id)).toEqual(expectedIds);
    expect(options.map((option) => option.name)).toEqual([
      lang.en.header.options.shop,
      lang.en.header.options.onSale,
      lang.en.header.options.newArrivals,
      lang.en.header.options.brands,
    ]);
  });

  it("should default isMenu and open to false for every option", () => {
    const options = getHeaderOptions("en");

    expect(options.every((option) => option.isMenu === false)).toBe(true);
    expect(options.every((option) => option.open === false)).toBe(true);
  });
});

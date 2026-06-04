import { getRandomBetweenWithDecimals } from "@container/helpers/getRandomBetweenWithDecimals";

describe("getRandomBetweenWithDecimals", () => {
  describe("scaling", () => {
    it("should scale the random source linearly between min and max", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);

      expect(getRandomBetweenWithDecimals(1, 5)).toBe(3);
    });

    it("should return the minimum when the random source is zero", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);

      expect(getRandomBetweenWithDecimals(2, 8)).toBe(2);
    });

    it("should stay within the inclusive range for any random value", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.999999);

      const result = getRandomBetweenWithDecimals(1, 5);

      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(5);
    });
  });

  describe("decimals", () => {
    it("should round to one decimal by default", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.123456);

      expect(getRandomBetweenWithDecimals(0, 10)).toBe(1.2);
    });

    it("should round to the provided number of decimals", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.123456);

      expect(getRandomBetweenWithDecimals(0, 10, 2)).toBe(1.23);
    });

    it("should return a number", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.4);

      expect(typeof getRandomBetweenWithDecimals(1, 5)).toBe("number");
    });
  });
});

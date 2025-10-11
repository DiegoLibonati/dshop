import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "<rootDir>/tests/mocks/css.js",

    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  transformIgnorePatterns: [],
};

export default config;

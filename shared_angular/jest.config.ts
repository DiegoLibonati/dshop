import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  transform: {
    "^.+\\.(mjs|js)$": "babel-jest",
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        useESM: true,
      },
    ],
    "^.+\\.html$": "<rootDir>/tests_mocks/rawTransform.ts",
    "^.+\\.css$": "<rootDir>/tests_mocks/rawTransform.ts",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: [
    "node_modules/(?!(@angular|rxjs|tslib|@testing-library/angular)/)",
  ],
  moduleNameMapper: {
    "\\.(scss|sass|less)$": "<rootDir>/tests_mocks/styleMock.ts",
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
    "^shared_core/SharedCore$": "<rootDir>/tests_mocks/SharedCore.ts",
    "^shared_core/SharedCoreEntities$":
      "<rootDir>/tests_mocks/SharedCoreEntities.ts",
    "^shared_core/SharedCoreEnums$": "<rootDir>/tests_mocks/SharedCoreEnums.ts",
    "^shared_core/SharedCoreProps$": "<rootDir>/tests_mocks/SharedCoreProps.ts",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "mjs", "json", "node"],
  watchPathIgnorePatterns: ["<rootDir>/dist", "<rootDir>/node_modules"],
};

export default config;

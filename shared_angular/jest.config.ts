import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
    "^.+\\.html$": "<rootDir>/tests/mocks/rawTransform.js",
    "^.+\\.css$": "<rootDir>/tests/mocks/rawTransform.js",
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "\\.(scss|sass|less)$": "<rootDir>/tests/mocks/css.js",

    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",

    "^shared_core/SharedCore$": "<rootDir>/tests/mocks/SharedCore.js",
    "^shared_core/SharedCoreEntities$":
      "<rootDir>/tests/mocks/SharedCoreEntities.js",
    "^shared_core/SharedCoreEnums$": "<rootDir>/tests/mocks/SharedCoreEnums.js",
    "^shared_core/SharedCoreProps$": "<rootDir>/tests/mocks/SharedCoreProps.js",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$|tslib|@angular|rxjs)"],
};

export default config;

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "<rootDir>/tests_mocks/styleMock.ts",

    "^.+\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/tests_mocks/fileMock.ts",

    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",

    "^shared_core/SharedCore$": "<rootDir>/tests_mocks/SharedCore.ts",
    "^shared_core/SharedCoreEntities$":
      "<rootDir>/tests_mocks/SharedCoreEntities.ts",
    "^shared_core/SharedCoreEnums$": "<rootDir>/tests_mocks/SharedCoreEnums.ts",
    "^shared_core/SharedCoreProps$": "<rootDir>/tests_mocks/SharedCoreProps.ts",
  },
  transformIgnorePatterns: [],
};

export default config;

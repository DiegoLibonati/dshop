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
    "^shared_core/SharedCoreEnums$": "<rootDir>/tests_mocks/SharedCoreEnums.ts",
    "^shared_core/SharedCoreEntities$":
      "<rootDir>/tests_mocks/SharedCoreEntities.ts",
    "^shared_core/SharedCoreProps$": "<rootDir>/tests_mocks/SharedCoreProps.ts",

    "^shared_react/SharedReact$": "<rootDir>/tests_mocks/SharedReact.ts",
    "^shared_react/SharedReactEnums$":
      "<rootDir>/tests_mocks/SharedReactEnums.ts",
    "^shared_react/SharedReactProps$":
      "<rootDir>/tests_mocks/SharedReactProps.ts",

    "^shared_angular/SharedAngular$": "<rootDir>/tests_mocks/SharedAngular.ts",
    "^shared_angular/SharedAngularEnums$":
      "<rootDir>/tests_mocks/SharedAngularEnums.ts",
    "^shared_angular/SharedAngularProps$":
      "<rootDir>/tests_mocks/SharedAngularProps.ts",
  },
  transformIgnorePatterns: [],
};

export default config;

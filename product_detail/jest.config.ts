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
    "^.+\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/tests/mocks/imgs.js",

    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",

    "^shared_core/SharedCore$": "<rootDir>/tests/mocks/SharedCore.js",
    "^shared_core/SharedCoreEnums$": "<rootDir>/tests/mocks/SharedCoreEnums.js",
    "^shared_core/SharedCoreEntities$":
      "<rootDir>/tests/mocks/SharedCoreEntities.js",
    "^shared_core/SharedCoreProps$": "<rootDir>/tests/mocks/SharedCoreProps.js",

    "^shared_react/SharedReact$": "<rootDir>/tests/mocks/SharedReact.js",
    "^shared_react/SharedReactEnums$":
      "<rootDir>/tests/mocks/SharedReactEnums.js",
    "^shared_react/SharedReactProps$":
      "<rootDir>/tests/mocks/SharedReactProps.js",

    "^shared_angular/SharedAngular$": "<rootDir>/tests/mocks/SharedAngular.js",
    "^shared_angular/SharedAngularEnums$":
      "<rootDir>/tests/mocks/SharedAngularEnums.js",
    "^shared_angular/SharedAngularProps$":
      "<rootDir>/tests/mocks/SharedAngularProps.js",
  },
  transformIgnorePatterns: [],
};

export default config;

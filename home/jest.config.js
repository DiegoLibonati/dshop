/** @type {import('jest').Config} */

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  roots: ["<rootDir>/__tests__"],
  setupFiles: ["<rootDir>/__tests__/jest.polyfills.ts"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__tests__/__mocks__/style.mock.ts",
    "\\.(png|jpg|jpeg|gif|svg|webp)$":
      "<rootDir>/__tests__/__mocks__/file.mock.ts",
    "^react$": "<rootDir>/node_modules/react",
    "^react/(.*)$": "<rootDir>/node_modules/react/$1",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "^react-dom/(.*)$": "<rootDir>/node_modules/react-dom/$1",
    "^shared-core/sdk$": "<rootDir>/../shared-core/src/exports.ts",
    "^@shared-core/(.*)$": "<rootDir>/../shared-core/src/$1",
    "^shared-react/sdk$": "<rootDir>/../shared-react/src/exports.ts",
    "^@shared-react/(.*)$": "<rootDir>/../shared-react/src/$1",
    "^shared-angular/sdk$": "<rootDir>/../shared-angular/src/exports.ts",
    "^@shared-angular/(.*)$": "<rootDir>/../shared-angular/src/$1",
    "^@home/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/__tests__/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/types/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
};

export default config;

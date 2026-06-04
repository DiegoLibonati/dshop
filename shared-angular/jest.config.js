/** @type {import('jest').Config} */

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  roots: ["<rootDir>/__tests__"],
  setupFiles: [
    "<rootDir>/__tests__/jest.polyfills.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__tests__/__mocks__/style.mock.ts",
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__tests__/__mocks__/file.mock.ts",
    "^shared-core/sdk$": "<rootDir>/../shared-core/src/exports.ts",
    "^@shared-core/(.*)$": "<rootDir>/../shared-core/src/$1",
    "^@shared-angular/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/__tests__/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(@angular|zone\\.js)/)"],
  transform: {
    "^.+\\.(ts|tsx|mjs)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.ts",
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
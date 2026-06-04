/** @type {import('jest').Config} */

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  roots: ["<rootDir>/__tests__"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
  testTimeout: 30000,
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__tests__/__mocks__/style.mock.ts",
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__tests__/__mocks__/file.mock.ts",
    "^react-dom/(.*)$": "<rootDir>/node_modules/react-dom/$1",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "^react/(.*)$": "<rootDir>/node_modules/react/$1",
    "^react$": "<rootDir>/node_modules/react",
    "^shared-core/sdk$": "<rootDir>/../shared-core/src/exports.ts",
    "^@shared-core/(.*)$": "<rootDir>/../shared-core/src/$1",
    "^@shared-react/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/__tests__/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/types/**/*.ts"],
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

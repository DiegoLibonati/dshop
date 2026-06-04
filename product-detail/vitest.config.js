import path from "path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "shared-core/sdk": path.resolve(
        import.meta.dirname,
        "./__tests__/__mocks__/sharedCoreSdk.mock.ts"
      ),
      "@shared-core": path.resolve(import.meta.dirname, "../shared-core/src"),
      "shared-react/sdk": path.resolve(
        import.meta.dirname,
        "./__tests__/__mocks__/sharedReactSdk.mock.ts"
      ),
      "@shared-react": path.resolve(import.meta.dirname, "../shared-react/src"),
      "shared-angular/sdk": path.resolve(
        import.meta.dirname,
        "./__tests__/__mocks__/sharedAngularSdk.mock.ts"
      ),
      "@shared-angular": path.resolve(import.meta.dirname, "../shared-angular/src"),
      "@product-detail": path.resolve(import.meta.dirname, "./src"),
      "@tests": path.resolve(import.meta.dirname, "./__tests__"),
    },
  },
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: "http://localhost",
      },
    },
    root: ".",
    include: ["__tests__/**/*.{test,spec}.ts"],
    setupFiles: ["__tests__/vitest.setup.ts"],
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,vue}"],
      exclude: ["src/**/*.d.ts", "src/index.ts", "src/types/**/*.ts"],
      reportsDirectory: "coverage",
      reporter: ["text", "lcov", "html"],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
});

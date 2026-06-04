import path from "path";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import prefixSelector from "postcss-prefix-selector";

import type { UserConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const isDev = mode === "development";

  return {
    plugins: [
      federation({
        name: "shared-core",
        filename: "remoteEntry.js",
        exposes: {
          "./sdk": "./src/exports.ts",
        },
        shared: {
          react: { singleton: true, requiredVersion: "^19.0.0" },
          "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        },
        dts: false,
      }),
      cssInjectedByJsPlugin({ relativeCSSInjection: true }),
    ],
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    css: {
      postcss: {
        plugins: [
          prefixSelector({
            prefix: '[data-mfe="shared-core"]'.repeat(1),
            transform: (prefix, selector, prefixedSelector) => {
              if (selector.startsWith("*")) return selector;
              if ([":root", "html", "body"].includes(selector)) return prefix;
              if (/^[a-z][\w-]*$/i.test(selector)) return selector;
              return prefixedSelector;
            },
          }),
        ],
      },
    },
    resolve: {
      alias: [
        { find: "@shared-core", replacement: path.resolve(import.meta.dirname, "./src") },
        { find: "@tests", replacement: path.resolve(import.meta.dirname, "./__tests__") },
      ],
    },
    server: {
      port: 4000,
      strictPort: true,
      host: "0.0.0.0",
      cors: true,
    },
    preview: {
      port: 4001,
      strictPort: true,
      cors: true,
    },
    build: {
      outDir: "dist",
      sourcemap: isDev,
      target: "esnext",
      minify: isDev ? false : "esbuild",
      modulePreload: false,
    },
  };
});

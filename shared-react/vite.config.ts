import path from "path";
import { defineConfig, loadEnv } from "vite";
import { federation } from "@module-federation/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import prefixSelector from "postcss-prefix-selector";

import type { UserConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const isDev = mode === "development";

  return {
    plugins: [
      federation({
        name: "shared-react",
        filename: "remoteEntry.js",
        exposes: {
          "./sdk": "./src/exports.ts",
        },
        remotes: {
          "shared-core": {
            type: "module",
            name: "shared-core",
            entry: env.VITE_REMOTE_SHARED_CORE_URL || "http://localhost:4000/remoteEntry.js",
          },
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
            prefix: '[data-mfe="shared-react"]'.repeat(2),
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
        {
          find: "@shared-core",
          replacement: path.resolve(import.meta.dirname, "../shared-core/src"),
        },
        { find: "@shared-react", replacement: path.resolve(import.meta.dirname, "./src") },
        { find: "@tests", replacement: path.resolve(import.meta.dirname, "./__tests__") },
      ],
    },
    experimental: {
      renderBuiltUrl: (filename, { hostType }) => {
        if (hostType === "js") return { relative: true };
        return { relative: false };
      },
    },
    server: {
      port: 4010,
      origin: env.VITE_PUBLIC_ORIGIN || "http://localhost:4010",
      strictPort: true,
      host: "0.0.0.0",
      cors: true,
    },
    preview: {
      port: 4011,
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

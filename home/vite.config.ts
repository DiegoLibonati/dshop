import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
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
        name: "home",
        filename: "remoteEntry.js",
        exposes: {
          "./HomeApp": "./src/Home.module.ts",
        },
        remotes: {
          "shared-core": {
            type: "module",
            name: "shared-core",
            entry: env.VITE_REMOTE_SHARED_CORE_URL || "http://localhost:4000/remoteEntry.js",
          },
          "shared-react": {
            type: "module",
            name: "shared-react",
            entry: env.VITE_REMOTE_SHARED_REACT_URL || "http://localhost:4010/remoteEntry.js",
          },
          "shared-angular": {
            type: "module",
            name: "shared-angular",
            entry: env.VITE_REMOTE_SHARED_ANGULAR_URL || "http://localhost:4020/remoteEntry.js",
          },
        },
        shared: {
          react: { singleton: true, requiredVersion: "^19.0.0" },
          "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        },
        dts: false,
      }),
      react(),
      cssInjectedByJsPlugin({ relativeCSSInjection: true }),
    ],
    css: {
      postcss: {
        plugins: [
          prefixSelector({
            prefix: '[data-mfe="home"]'.repeat(3),
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
        {
          find: "@shared-react",
          replacement: path.resolve(import.meta.dirname, "../shared-react/src"),
        },
        {
          find: "@shared-angular",
          replacement: path.resolve(import.meta.dirname, "../shared-angular/src"),
        },
        {
          find: "@tests",
          replacement: path.resolve(import.meta.dirname, "./__tests__"),
        },
        {
          find: "@home",
          replacement: path.resolve(import.meta.dirname, "./src"),
        },
      ],
    },
    experimental: {
      renderBuiltUrl: (filename, { hostType }) => {
        if (hostType === "js") return { relative: true };
        return { relative: false };
      },
    },
    server: {
      port: 3010,
      origin: env.VITE_PUBLIC_ORIGIN || "http://localhost:3010",
      strictPort: true,
      host: "0.0.0.0",
      cors: true,
    },
    preview: {
      port: 3011,
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

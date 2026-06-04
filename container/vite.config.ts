import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import prefixSelector from "postcss-prefix-selector";

import type { UserConfig } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const isDev = mode === "development";

  return {
    plugins: [
      federation({
        name: "container",
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
          home: {
            type: "module",
            name: "home",
            entry: env.VITE_REMOTE_HOME_URL || "http://localhost:3010/remoteEntry.js",
          },
          "product-detail": {
            type: "module",
            name: "product-detail",
            entry: env.VITE_REMOTE_PRODUCT_DETAIL_URL || "http://localhost:3020/remoteEntry.js",
          },
        },
        shared: {
          react: { singleton: true, requiredVersion: "^19.0.0" },
          "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
          "react-router": { singleton: true, requiredVersion: "^7.0.0" },
        },
        dts: false,
      }),
      react(),
    ],
    css: {
      postcss: {
        plugins: [
          prefixSelector({
            prefix: '[data-mfe="container"]'.repeat(4),
            ignoreFiles: [/index\.css$/, /global\.css$/],
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
          find: "@home",
          replacement: path.resolve(import.meta.dirname, "../home/src"),
        },
        {
          find: "@product-detail",
          replacement: path.resolve(import.meta.dirname, "../product-detail/src"),
        },
        {
          find: "@tests",
          replacement: path.resolve(import.meta.dirname, "./__tests__"),
        },
        {
          find: "@container",
          replacement: path.resolve(import.meta.dirname, "./src"),
        },
      ],
    },
    server: {
      port: 3000,
      open: false,
      host: "0.0.0.0",
      strictPort: true,
      cors: true,
      proxy: {
        "/api/v1": {
          target: env.VITE_API_URL || "https://api.escuelajs.co",
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    build: {
      outDir: "dist",
      sourcemap: isDev,
      target: "esnext",
      minify: "esbuild",
    },
  };
});

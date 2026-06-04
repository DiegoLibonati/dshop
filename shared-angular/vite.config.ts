import path from "path";
import { defineConfig, loadEnv } from "vite";
import { transform } from "esbuild";
import angular from "@analogjs/vite-plugin-angular";
import { federation } from "@module-federation/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import prefixSelector from "postcss-prefix-selector";

import type { Plugin, UserConfig } from "vite";

interface AboutConfig extends UserConfig {
  oxc?: false;
}

export const tsTransformPlugin = (): Plugin => ({
  name: "ts-transform",
  async transform(code: string, id: string): Promise<{ code: string; map: string } | undefined> {
    if (!id.endsWith(".ts") && !id.endsWith(".tsx")) return;
    if (id.includes("node_modules") || id.includes("\0") || id.includes("virtual:")) return;
    if (code.trim() !== "") return;
    const { readFileSync } = await import("fs");
    code = readFileSync(id, "utf-8");
    const isTsx = id.endsWith(".tsx");
    const result = await transform(code, {
      loader: isTsx ? "tsx" : "ts",
      ...(isTsx && { jsx: "automatic" as const, jsxImportSource: "react" }),
      sourcemap: true,
      target: "esnext",
      tsconfigRaw: JSON.stringify({
        compilerOptions: { experimentalDecorators: true },
      }),
    });
    return { code: result.code, map: result.map };
  },
});

export default defineConfig(({ mode }): AboutConfig => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const isDev = mode === "development";

  return {
    plugins: [
      federation({
        name: "shared-angular",
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
          "@angular/core": { singleton: true, requiredVersion: "^19.2.0" },
          "@angular/common": { singleton: true, requiredVersion: "^19.2.0" },
          "@angular/compiler": { singleton: true, requiredVersion: "^19.2.0" },
          "@angular/platform-browser": { singleton: true, requiredVersion: "^19.2.0" },
        },
        dts: false,
      }),
      angular({ tsconfig: "./tsconfig.app.json" }),
      tsTransformPlugin(),
      cssInjectedByJsPlugin({ relativeCSSInjection: true }),
    ],
    oxc: false,
    css: {
      postcss: {
        plugins: [
          prefixSelector({
            prefix: '[data-mfe="shared-angular"]'.repeat(2),
            ignoreFiles: [/\.component\.css/],
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
      mainFields: ["module"],
      alias: [
        {
          find: "@shared-core",
          replacement: path.resolve(import.meta.dirname, "../shared-core/src"),
        },
        {
          find: "@shared-angular",
          replacement: path.resolve(import.meta.dirname, "./src"),
        },
        {
          find: "@tests",
          replacement: path.resolve(import.meta.dirname, "./__tests__"),
        },
      ],
    },
    server: {
      port: 4020,
      strictPort: true,
      host: "0.0.0.0",
      cors: true,
    },
    preview: {
      port: 4021,
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

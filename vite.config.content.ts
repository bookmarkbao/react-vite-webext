/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-06 02:40:57
 */
import { defineConfig } from "vite";
import { sharedConfig } from "./vite.config";
import { r, isDev } from "./scripts/utils";
import packageJson from "./package.json";

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev
      ? {
          include: [r("src/contentScripts/**/*"), r("src/components/**/*"), r("src/logic/**/*"), r("src/store/**/*"), r("src/network/**/*")],
        }
      : undefined,
    outDir: r("extension/dist/contentScripts"),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    lib: {
      entry: r("src/contentScripts/index.tsx"),
      name: packageJson.name,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true,
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
});

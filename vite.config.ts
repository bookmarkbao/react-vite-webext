/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-08 09:28:24
 */
import { dirname, relative } from "path";
import { defineConfig, UserConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { r, port, isDev } from "./scripts/utils";
import react from "@vitejs/plugin-react";
import vitePluginImp from 'vite-plugin-imp'

export const sharedConfig: UserConfig = {
  root: r("src"),
  resolve: {
    alias: {
      "~/": `${r("src")}/`,
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    // React fast refresh doesn't work, cause injecting of preambleCode into index.html
    // TODO: fix it
    react({ fastRefresh: false }),
    AutoImport({
      imports: [
        {
          "webextension-polyfill": [["default", "browser"]],
        },
      ],
      dts: r("src/auto-imports.d.ts"),
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
        }
      ]
    }),

    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      },
    },
  ],
  optimizeDeps: {
    include: ["webextension-polyfill"],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      less: {
        modifyVars: { 'primary-color': '#13c2c2' },
        javascriptEnabled: true
      }
    }
  }
};
// 情景配置: dev/serve 或 build
export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost",
    },
  },
  build: {
    outDir: r("extension/dist"), // 指定输出目录(相对于根目录)
    emptyOutDir: false, // 清空目录，关闭警告
    sourcemap: isDev ? "inline" : false, // 构建后是否生成 source map 文件
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: { // 用于 ES6+ 的 JavaScript mangler/compressor 工具包
      mangle: false, // 是否混淆
    },
    rollupOptions: { // 自定义底层的 Rollup 打包配置。
      input: {
        background: r("src/background/index.html"),
        options: r("src/options/index.html"),
        popup: r("src/popup/index.html"),
        views: r("src/views/index.html"),
      },
    },
  },
  plugins: [...sharedConfig.plugins!]
}));

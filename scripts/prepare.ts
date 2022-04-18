/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-06 17:25:25
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-18 20:54:37
 */
// generate stub index.html files for dev entry
import { execSync } from "child_process";
import fs from "fs-extra";
import chokidar from "chokidar";
import { r, port, isDev, log } from "./utils";

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = ["options", "popup", "background","views"];

  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`));
    let data = await fs.readFile(r(`src/${view}/index.html`), "utf-8");
    data = data
      .replace('"./main.tsx"', `"http://localhost:${port}/${view}/main.tsx"`)
      .replace('"./main.ts"', `"http://localhost:${port}/${view}/main.ts"`)
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite server did not start</div>'
      );
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, "utf-8");
    log("PRE", `stub ${view}`);
  }
}

function writeManifest() {
  execSync("npx esno ./scripts/manifest.ts", { stdio: "inherit" });
}

function tsupScripts(){
  // execSync("ls", { stdio: "inherit" });
  execSync("rm -rf ./extension/pageScriptsInject/*.*")
  execSync("tsup ./src/contentScriptsInject/*.ts -d ./extension/pageScriptsInject/", { stdio: "inherit" });
  log("PRE", `src/contentScriptsInject/**.ts > contentScriptsInject/pageScriptsInject/**.js`);
}

writeManifest();
tsupScripts();

if (isDev) {
  stubIndexHtml();
  chokidar.watch(r("src/**/*.html")).on("change", () => {
    stubIndexHtml();
  });
  chokidar.watch([r("src/manifest.ts"), r("package.json")]).on("change", () => {
    writeManifest();
  });
  chokidar.watch([r("src/contentScriptsInject/*.ts")]).on("change", () => {
    tsupScripts();
  });
}

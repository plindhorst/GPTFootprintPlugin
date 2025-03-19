import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";

import baseConfig, { baseBuildOptions, baseManifest } from "./vite.config.base";

const outDir = resolve(__dirname, "dist_firefox");

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      ...baseBuildOptions,
      outDir
    },
    plugins: [
      crx({
        browser: "firefox",
        contentScripts: {
          injectCss: true
        },
        manifest: {
          ...baseManifest,
          background: {
            scripts: ["src/pages/background/index.ts"]
          }
        } as ManifestV3Export
      })
    ],
    publicDir: resolve(__dirname, "public")
  })
);

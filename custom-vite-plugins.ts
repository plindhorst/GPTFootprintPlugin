import type { PluginOption } from "vite";

import fs from "fs";
import { resolve } from "path";

// plugin to support i18n
export function crxI18n(options: { localise: boolean; src: string }): PluginOption {
  if (!options.localise) return null;

  const getJsonFiles = (dir: string): Array<string> => {
    const files = fs.readdirSync(dir, { recursive: true }) as string[];
    return files.filter(file => !!file && file.endsWith(".json"));
  };
  const entry = resolve(__dirname, options.src);
  const localeFiles = getJsonFiles(entry);
  const files = localeFiles.map((file) => {
    return {
      fileName: file,
      id: "",
      source: fs.readFileSync(resolve(entry, file))
    };
  });
  return {
    buildStart: {
      handler() {
        files.forEach((file) => {
          const refId = this.emitFile({
            fileName: "_locales/" + file.fileName,
            source: file.source,
            type: "asset"
          });
          file.id = refId;
        });
      },
      order: "post"
    },
    enforce: "pre",
    name: "crx-i18n"
  };
}

// plugin to remove dev icons from prod build
export function stripDevIcons(isDev: boolean) {
  if (isDev) return null;

  return {
    name: "strip-dev-icons",
    renderStart(outputOptions: never, _inputOptions: never) {
      const outDir = outputOptions.dir;
      fs.rm(resolve(outDir, "dev-icon-32.png"), () => console.log(`Deleted dev-icon-32.png from prod build`));
      fs.rm(resolve(outDir, "dev-icon-128.png"), () => console.log(`Deleted dev-icon-128.png from prod build`));
    },
    resolveId(source: string) {
      return source === "virtual-module" ? source : null;
    }
  };
}

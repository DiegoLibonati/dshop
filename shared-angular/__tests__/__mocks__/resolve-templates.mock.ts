import * as fs from "fs";
import * as path from "path";

import { ɵresolveComponentResources } from "@angular/core";

const srcDir = path.resolve(__dirname, "..", "..", "src");

function findFile(dir: string, filename: string): string | null {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFile(fullPath, filename);
      if (found) return found;
    } else if (entry.name === filename) {
      return fullPath;
    }
  }
  return null;
}

export const resolveAngularTemplates = async (): Promise<void> => {
  await ɵresolveComponentResources((url: string) => {
    const filename = url.replace(/^\.\//, "");
    const filePath = findFile(srcDir, filename);
    if (filePath) {
      return Promise.resolve(fs.readFileSync(filePath, "utf-8"));
    }
    return Promise.resolve("");
  });
};

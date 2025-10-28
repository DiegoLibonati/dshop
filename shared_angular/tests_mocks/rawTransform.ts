import fs from "fs";

export default {
  process(_: unknown, filename: string) {
    const content = fs.readFileSync(filename, "utf8");
    return {
      code: `module.exports = ${JSON.stringify(content)};`,
    };
  },
};

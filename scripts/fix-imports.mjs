import { globby } from "globby";
import fs from "fs/promises";

const files = await globby(["components/**/*.tsx", "app/**/*.tsx", "src/**/*.tsx"]);

for (const f of files) {
  let s = await fs.readFile(f, "utf8");
  s = s.replace(/@radix-ui\/react-slot@\d+\.\d+\.\d+/g, "@radix-ui/react-slot");
  s = s.replace(/class-variance-authority@\d+\.\d+\.\d+/g, "class-variance-authority");
  await fs.writeFile(f, s, "utf8");
  console.log("fixed", f);
}

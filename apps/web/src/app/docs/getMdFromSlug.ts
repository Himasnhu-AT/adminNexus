import path from "path";
import { sections } from "./sections";
import fs from "fs/promises";

export async function getMdFromSlug(slug: string): Promise<string> {
  const page = sections
    .flatMap((section) => section.pages)
    .find((page) => page.slug === slug);

  const fallback = "# ERROR: Didnt find anything";
  if (!page) {
    return fallback;
  }

  const filePath = path.join(process.cwd(), page.path);
  const content = await fs.readFile(filePath, "utf8");

  if (content === "") {
    return fallback;
  }

  return content;
}

import fs from "fs";
import path from "path";

export function getImagesFromFolder(folderPath: string): string[] {
  const imagesDir = path.join(process.cwd(), folderPath);
  const imageFiles = fs.readdirSync(imagesDir);
  
  // Return URLs that Next.js can serve
  return imageFiles.map((file) => `/images/${file}`);
}

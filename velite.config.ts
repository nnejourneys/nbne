import { defineConfig, defineCollection, s } from "velite";
import { processR2GalleryFolder, GalleryImage } from "@/lib/gallery-processor";
import { getR2FolderImages } from "@/lib/r2-folder-mapping";

// Define base data type
interface BaseData {
  slug: string;
  galleryFolder?: string;
  galleryimages?: string[];
  gallery?: GalleryImage[] | string;
}

// Define the processed data type
interface ProcessedData extends BaseData {
  slugAsParams: string;
  gallery: GalleryImage[];
}

/**
 * Normalize gallery folder paths to be consistent with R2 mapping
 */
function normalizeGalleryPath(inputPath: string): string {
  // Remove leading slashes, trailing slashes, and "images/" prefix
  let normalized = inputPath.replace(/^\/+/, '').replace(/\/+$/, '').replace(/^images\//, '');
  
  // Ensure it starts with "tours/gallery/"
  if (!normalized.startsWith('tours/gallery/')) {
    if (normalized.startsWith('gallery/')) {
      normalized = 'tours/' + normalized;
    } else if (!normalized.startsWith('tours/')) {
      normalized = 'tours/gallery/' + normalized;
    }
  }
  
  return normalized;
}

const computedFields = <T extends BaseData>(data: T): T & ProcessedData => {
  let gallery: GalleryImage[] = [];
  
  // Priority 1: Use existing gallery array if present
  if (Array.isArray(data.gallery)) {
    gallery = data.gallery;
  }
  // Priority 2: Use galleryimages array with galleryFolder
  else if (Array.isArray(data.galleryimages) && data.galleryimages.length > 0) {
    const folderPath = data.galleryFolder ? normalizeGalleryPath(data.galleryFolder) : '';
    gallery = processR2GalleryFolder(folderPath, data.galleryimages);
  }
  // Priority 3: Use galleryFolder with auto-loaded images from R2 mapping
  else if (typeof data.galleryFolder === 'string' && data.galleryFolder) {
    const normalizedPath = normalizeGalleryPath(data.galleryFolder);
    const folderImages = getR2FolderImages(normalizedPath);
    
    if (folderImages.length > 0) {
      gallery = processR2GalleryFolder(normalizedPath, folderImages);
      console.log(`✅ Auto-loaded ${folderImages.length} images for: ${normalizedPath}`);
    } else {
      console.warn(`⚠️  No images found in R2 mapping for: ${normalizedPath}`);
    }
  }
  // Priority 4: If gallery is a string, treat it as a folder path
  else if (typeof data.gallery === 'string' && data.gallery) {
    const normalizedPath = normalizeGalleryPath(data.gallery);
    const folderImages = getR2FolderImages(normalizedPath);
    
    if (folderImages.length > 0) {
      gallery = processR2GalleryFolder(normalizedPath, folderImages);
    }
  }
  
  return {
    ...data,
    slug: `${data.slug.split("/").pop()}`,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
    gallery,
  } as T & ProcessedData;
};

// Define gallery image schema for Velite
const galleryImageSchema = s.object({
  thumbnailURL: s.string(),
  largeURL: s.string(),
  width: s.number(),
  height: s.number(),
  alt: s.string().optional(),
  blurDataURL: s.string().optional(),
});

const tours = defineCollection({
  name: "Tours",
  pattern: "tours/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      draft: s.boolean().default(false),
      title: s.string().max(99).optional(),
      subtitle: s.string().max(99).optional(),
      keywords: s.string().optional(),
      days: s.string().max(99).optional(),
      description: s.string().max(999).optional(),
      bg_image: s.string().optional(),
      image: s.string().optional(),
      type: s.string().max(99).optional(),
      tourtype: s.string().max(99).optional(),
      category: s.string().max(99).optional(),
      cat: s.string().max(99).optional(),
      tags: s.array(s.string()).optional(),
      weight: s.number().optional(),
      touricon: s.string().max(99).optional(),
      overview: s
        .array(
          s.object({ label: s.string(), icon: s.string(), data: s.string() })
        )
        .optional(),
      overs: s
        .array(
          s.object({ l: s.string(), d: s.union([s.string(), s.number()]) })
        )
        .optional(),
      highlights: s.array(s.string()).optional(),
      inclusions: s.array(s.string()).optional(),
      exclusions: s.array(s.string()).optional(),
      accommodation: s.string().max(99).optional(),
      meals: s.string().max(99).optional(),
      refreshments: s.string().optional(),
      faq: s
        .array(s.object({ title: s.string(), text: s.string() }))
        .optional(),
      galleryFolder: s.string().optional(),
      galleryimages: s.array(s.string()).optional(),
      gallery: s.array(galleryImageSchema).optional(),
      video: s.string().optional(),
      othertours: s
        .array(
          s.object({ title: s.string(), link: s.string(), image: s.string() })
        )
        .optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const posts = defineCollection({
  name: "Posts",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      draft: s.boolean().default(false),
      keywords: s.string().optional(),
      title: s.string().max(99).optional(),
      date: s.coerce.date(),
      excerpt: s.string().max(299).optional(),
      author: s
        .array(
          s.object({
            name: s.string(),
            picture: s.string(),
            initials: s.string(),
          })
        )
        .optional(),
      coverImage: s.string().optional(),
      ogImage: s.string().optional(),
      galleryFolder: s.string().optional(),
      galleryimages: s.array(s.string()).optional(),
      gallery: s.array(galleryImageSchema).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, tours },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});

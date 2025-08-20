// Define our gallery image type
export interface GalleryImage {
  thumbnailURL: string;
  largeURL: string;
  width: number;
  height: number;
  alt?: string;
  blurDataURL?: string;
}

/**
 * Normalizes folder paths to ensure consistency
 * @param folderPath Input folder path
 * @returns Normalized path without leading/trailing slashes
 */
function normalizeFolderPath(folderPath: string): string {
  if (!folderPath) return '';
  
  // Remove leading and trailing slashes
  let normalized = folderPath.replace(/^\/+|\/+$/g, '');
  
  // Ensure it starts with tours/gallery/ if it doesn't already
  if (!normalized.startsWith('tours/gallery/')) {
    if (normalized.startsWith('gallery/')) {
      normalized = 'tours/' + normalized;
    } else if (normalized.startsWith('tours/')) {
      // If it starts with tours/ but not tours/gallery/, add gallery/
      if (!normalized.startsWith('tours/gallery/')) {
        normalized = normalized.replace('tours/', 'tours/gallery/');
      }
    } else {
      // If it doesn't start with tours/ at all, add the full prefix
      normalized = 'tours/gallery/' + normalized;
    }
  }
  
  return normalized;
}

/**
 * Processes a gallery folder from R2 bucket to extract image information
 * @param folderPath Path to the gallery folder in R2 bucket (e.g., 'tours/gallery/cycle-tour-of-assam')
 * @param imageList Array of image filenames in the folder
 * @param defaultDimensions Default dimensions if actual dimensions aren't available
 * @returns Array of GalleryImage objects with RELATIVE paths (for R2Image component)
 */
export function processR2GalleryFolder(
  folderPath: string, 
  imageList: string[],
  defaultDimensions: { width: number; height: number } = { width: 1200, height: 800 }
): GalleryImage[] {
  // console.log(`Processing R2 gallery folder: ${folderPath}`);
  // console.log(`Image list received:`, imageList);
 
  if (!folderPath) {
    console.warn("No folder path provided to processR2GalleryFolder");
    return [];
  }

  if (!imageList || imageList.length === 0) {
    console.warn(`No images provided for folder: ${folderPath}`);
    return [];
  }
 
  try {
    // Filter for valid image files and extract just the filename
    const imageFiles = imageList
      .filter(file => {
        const ext = file.split('.').pop()?.toLowerCase();
        return ext && ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext);
      })
      .map(file => {
        // If the file already contains path separators, extract just the filename
        if (file.includes('/')) {
          const filename = file.split('/').pop() || '';
          // console.log(`Extracting filename from path: ${file} -> ${filename}`);
          return filename;
        }
        return file;
      })
      .filter(file => file.length > 0);
   
    // console.log(`Found ${imageFiles.length} image files in R2 folder: ${folderPath}`);
   
    // Normalize the folder path
    const normalizedFolderPath = normalizeFolderPath(folderPath);
    // console.log(`Normalized folder path: ${folderPath} -> ${normalizedFolderPath}`);
   
    return imageFiles.map(fileName => {
      // Create the R2 path WITHOUT base URL (R2Image component will add it)
      const r2Path = `${normalizedFolderPath}/${fileName}`;
      
      // console.log(`Created R2 path: ${fileName} -> ${r2Path}`);
     
      return {
        thumbnailURL: r2Path,  // Relative path only
        largeURL: r2Path,      // Relative path only
        width: defaultDimensions.width,
        height: defaultDimensions.height,
        alt: fileName.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' '),
      };
    });
  } catch (err) {
    console.error(`Error processing R2 gallery folder ${folderPath}:`, err);
    return [];
  }
}

/**
 * Processes gallery images with known dimensions
 * @param images Array of image objects with filename and optional dimensions
 * @param folderPath Path to the gallery folder in R2 bucket
 * @returns Array of GalleryImage objects with RELATIVE paths
 */
export function processR2GalleryWithDimensions(
  images: Array<{
    filename: string;
    width?: number;
    height?: number;
    alt?: string;
  }>,
  folderPath: string = ''
): GalleryImage[] {
  // console.log(`Processing R2 gallery with dimensions for folder: ${folderPath}`);
  
  if (!images || images.length === 0) {
    console.warn("No images provided to processR2GalleryWithDimensions");
    return [];
  }

  try {
    // Normalize the folder path
    const normalizedFolderPath = normalizeFolderPath(folderPath);
    // console.log(`Normalized folder path: ${folderPath} -> ${normalizedFolderPath}`);
    
    return images.map(image => {
      const r2Path = normalizedFolderPath ? `${normalizedFolderPath}/${image.filename}` : image.filename;
      
      // console.log(`Created R2 path: ${r2Path}`);
      
      return {
        thumbnailURL: r2Path,  // Relative path only
        largeURL: r2Path,      // Relative path only
        width: image.width || 1200,
        height: image.height || 800,
        alt: image.alt || image.filename.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' '),
      };
    });
  } catch (err) {
    console.error(`Error processing R2 gallery with dimensions:`, err);
    return [];
  }
}

/**
 * Creates a gallery from a simple array of R2 image paths
 * @param imagePaths Array of full R2 paths or relative paths
 * @param defaultDimensions Default dimensions for all images
 * @returns Array of GalleryImage objects with RELATIVE paths
 */
export function createR2Gallery(
  imagePaths: string[],
  defaultDimensions: { width: number; height: number } = { width: 1200, height: 800 }
): GalleryImage[] {
  // console.log(`Creating R2 gallery from ${imagePaths.length} image paths`);
  
  if (!imagePaths || imagePaths.length === 0) {
    console.warn("No image paths provided to createR2Gallery");
    return [];
  }

  try {
    return imagePaths.map(imagePath => {
      let finalPath: string;
      
      // If it's already a full URL, keep as-is
      if (imagePath.startsWith('http')) {
        finalPath = imagePath;
      } else {
        // For relative paths, ensure they're properly formatted
        finalPath = imagePath.replace(/^\/+/, ''); // Remove leading slashes
        
        // If it doesn't start with tours/, normalize it
        if (!finalPath.startsWith('tours/')) {
          finalPath = normalizeFolderPath(finalPath);
        }
      }
      
      // Extract filename for alt text
      const filename = imagePath.split('/').pop() || imagePath;
      const alt = filename.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
      
      // console.log(`Created R2 path: ${imagePath} -> ${finalPath}`);
      
      return {
        thumbnailURL: finalPath,
        largeURL: finalPath,
        width: defaultDimensions.width,
        height: defaultDimensions.height,
        alt,
      };
    });
  } catch (err) {
    console.error('Error creating R2 gallery:', err);
    return [];
  }
}

/**
 * Helper function to get the full R2 URL from a relative path
 * @param relativePath Relative path to the image
 * @returns Full R2 URL
 */
export function getFullR2URL(relativePath: string): string {
  // If it's already a full URL, return as-is
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // Remove any leading slashes to avoid double slashes
  const cleanPath = relativePath.replace(/^\/+/, '');
  
  // Get the bucket URL from environment variable
  const bucketURL = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
  
  if (!bucketURL) {
    console.warn('NEXT_PUBLIC_R2_BUCKET_URL not set');
    return relativePath; // Return relative path as fallback
  }
  
  // Construct the full URL
  const fullURL = `${bucketURL}/${cleanPath}`;
  
  // console.log(`Full R2 URL: ${relativePath} -> ${fullURL}`);
  
  return fullURL;
}
interface ImageOptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png' | 'avif'
}

/**
 * Get the full URL for an image from R2 bucket
 */
export function getImageUrl(path: string): string {
  // If it's already a full URL, return as-is
  if (path.startsWith('http')) return path
  
  // Your R2 bucket base URL
  const baseUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL || 'https://pub-3d943afeed9643318d31712e02ebf613.r2.dev'
  
  // Remove leading slash if present
  const cleanPath = path.replace(/^\//, '')
  
  return `${baseUrl}/${cleanPath}`
}

/**
 * Get an optimized image URL with Cloudflare Image Resizing
 * Note: This requires Cloudflare Image Resizing to be enabled
 */
export function getOptimizedImageUrl(
  path: string, 
  options: ImageOptimizationOptions = {}
): string {
  const baseUrl = getImageUrl(path)
  const { width, height, quality = 80, format } = options
  
  // If no optimization options, return original URL
  if (!width && !height && !format && quality === 80) {
    return baseUrl
  }
  
  // Build optimization parameters for Cloudflare Image Resizing
  const params = new URLSearchParams()
  
  if (width) params.set('width', width.toString())
  if (height) params.set('height', height.toString())
  if (format) params.set('format', format)
  if (quality !== 80) params.set('quality', quality.toString())
  
  const queryString = params.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * Process R2 gallery folder - Return relative paths for R2Image component
 */
export function processR2GalleryFolder(
  folderPath: string, 
  imageList: string[],
  defaultDimensions: { width: number; height: number } = { width: 1200, height: 800 }
): Array<{
  thumbnailURL: string;
  largeURL: string;
  width: number;
  height: number;
  alt?: string;
  blurDataURL?: string;
}> {
  console.log(`Processing R2 gallery folder: ${folderPath}`);
 
  if (!folderPath) {
    console.warn("No folder path provided to processR2GalleryFolder");
    return [];
  }

  if (!imageList || imageList.length === 0) {
    console.warn(`No images provided for folder: ${folderPath}`);
    return [];
  }
 
  try {
    // Filter for valid image files
    const imageFiles = imageList.filter(file => {
      const ext = file.split('.').pop()?.toLowerCase();
      return ext && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
    });
   
    console.log(`Found ${imageFiles.length} image files in R2 folder: ${folderPath}`);
   
    return imageFiles.map(fileName => {
      // Create the R2 path without base URL (for R2Image component)
      const cleanFolderPath = folderPath.replace(/^\/+|\/+$/g, '');
      const r2Path = `${cleanFolderPath}/${fileName}`;
     
      return {
        thumbnailURL: r2Path,  // Just the path, R2Image will add base URL
        largeURL: r2Path,      // Just the path, R2Image will add base URL
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
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(path: string): {
  small: string
  medium: string
  large: string
  original: string
} {
  return {
    small: getOptimizedImageUrl(path, { width: 480, quality: 75 }),
    medium: getOptimizedImageUrl(path, { width: 768, quality: 80 }),
    large: getOptimizedImageUrl(path, { width: 1200, quality: 85 }),
    original: getImageUrl(path)
  }
}

/**
 * Check if a path is a valid image URL
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']
    const urlObj = new URL(url)
    const pathname = urlObj.pathname.toLowerCase()
    
    return validExtensions.some(ext => pathname.endsWith(ext))
  } catch {
    return false
  }
}

/**
 * Extract filename from R2 URL
 */
export function getImageFilename(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname.split('/').pop() || ''
  } catch {
    return ''
  }
}

/**
 * Generate blur data URL for placeholder (simple base64 encoded 1x1 pixel)
 */
export function generateBlurDataURL(color: string = '#f3f4f6'): string {
  // Convert hex to rgb
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Create a 1x1 pixel canvas with the color
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, 0, 1, 1)
    return canvas.toDataURL()
  }
  
  // Fallback base64 1x1 gray pixel
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
}


// interface ImageOptimizationOptions {
//   width?: number
//   height?: number
//   quality?: number
//   format?: 'webp' | 'jpeg' | 'png' | 'avif'
// }

// /**
//  * Get the full URL for an image from R2 bucket
//  */
// export function getImageUrl(path: string): string {
//   // If it's already a full URL, return as-is
//   if (path.startsWith('http')) return path
  
//   // Your R2 bucket base URL
//   const baseUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL || 'https://pub-3d943afeed9643318d31712e02ebf613.r2.dev'
  
//   // Remove leading slash if present
//   const cleanPath = path.replace(/^\//, '')
  
//   return `${baseUrl}/${cleanPath}`
// }

// /**
//  * Get an optimized image URL with Cloudflare Image Resizing
//  * Note: This requires Cloudflare Image Resizing to be enabled
//  */
// export function getOptimizedImageUrl(
//   path: string, 
//   options: ImageOptimizationOptions = {}
// ): string {
//   const baseUrl = getImageUrl(path)
//   const { width, height, quality = 80, format } = options
  
//   // If no optimization options, return original URL
//   if (!width && !height && !format && quality === 80) {
//     return baseUrl
//   }
  
//   // Build optimization parameters for Cloudflare Image Resizing
//   const params = new URLSearchParams()
  
//   if (width) params.set('width', width.toString())
//   if (height) params.set('height', height.toString())
//   if (format) params.set('format', format)
//   if (quality !== 80) params.set('quality', quality.toString())
  
//   const queryString = params.toString()
//   return queryString ? `${baseUrl}?${queryString}` : baseUrl
// }

// /**
//  * Generate responsive image URLs for different screen sizes
//  */
// export function getResponsiveImageUrls(path: string): {
//   small: string
//   medium: string
//   large: string
//   original: string
// } {
//   return {
//     small: getOptimizedImageUrl(path, { width: 480, quality: 75 }),
//     medium: getOptimizedImageUrl(path, { width: 768, quality: 80 }),
//     large: getOptimizedImageUrl(path, { width: 1200, quality: 85 }),
//     original: getImageUrl(path)
//   }
// }

// /**
//  * Check if a path is a valid image URL
//  */
// export function isValidImageUrl(url: string): boolean {
//   try {
//     const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']
//     const urlObj = new URL(url)
//     const pathname = urlObj.pathname.toLowerCase()
    
//     return validExtensions.some(ext => pathname.endsWith(ext))
//   } catch {
//     return false
//   }
// }

// /**
//  * Extract filename from R2 URL
//  */
// export function getImageFilename(url: string): string {
//   try {
//     const urlObj = new URL(url)
//     return urlObj.pathname.split('/').pop() || ''
//   } catch {
//     return ''
//   }
// }

// /**
//  * Generate blur data URL for placeholder (simple base64 encoded 1x1 pixel)
//  */
// export function generateBlurDataURL(color: string = '#f3f4f6'): string {
//   // Convert hex to rgb
//   const hex = color.replace('#', '')
//   const r = parseInt(hex.substr(0, 2), 16)
//   const g = parseInt(hex.substr(2, 2), 16)
//   const b = parseInt(hex.substr(4, 2), 16)
  
//   // Create a 1x1 pixel canvas with the color
//   const canvas = document.createElement('canvas')
//   canvas.width = 1
//   canvas.height = 1
//   const ctx = canvas.getContext('2d')
//   if (ctx) {
//     ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
//     ctx.fillRect(0, 0, 1, 1)
//     return canvas.toDataURL()
//   }
  
//   // Fallback base64 1x1 gray pixel
//   return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
// }
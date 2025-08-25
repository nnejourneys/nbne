"use client"
import React, { JSX, useEffect } from "react";
import SimR2Image from "./SimR2Image";

// Dynamically load PhotoSwipe CSS only when needed
const loadPhotoSwipeStyles = () => {
  if (typeof window !== 'undefined' && !document.querySelector('link[href*="photoswipe"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/photoswipe@5.4.4/dist/photoswipe.css';
    document.head.appendChild(link);
  }
};

interface GalleryImage {
  thumbnailURL: string;
  largeURL: string;
  width: number;
  height: number;
  alt?: string;
  blurDataURL?: string;
}

interface SimpleGalleryProps {
  galleryID: string;
  images: GalleryImage[] | string | null | undefined;
}

export default function SwipeGallery({ galleryID, images }: SimpleGalleryProps): JSX.Element | null {
  
  // Safely convert to array
  const galleryImages = React.useMemo(() => {
    if (Array.isArray(images)) return images;
    return [];
  }, [images]);

  // Debug log what we received
  useEffect(() => {
    console.log('SwipeGallery received:', {
      galleryID,
      imagesType: typeof images,
      isArray: Array.isArray(images),
      imagesLength: Array.isArray(images) ? images.length : 0,
      firstImage: Array.isArray(images) && images.length > 0 ? images[0] : null
    });
  }, [galleryID, images]);
 
  // Initialize PhotoSwipe with dynamic import
  useEffect(() => {
    // Don't initialize if no images
    if (galleryImages.length === 0) return;
    
    let lightbox: unknown = null;
    
    const initPhotoSwipe = async () => {
      try {
        // Load CSS and PhotoSwipe only when needed
        loadPhotoSwipeStyles();
        const PhotoSwipeLightbox = (await import("photoswipe/lightbox")).default;
        
        lightbox = new PhotoSwipeLightbox({
          gallery: "#" + galleryID,
          children: "a",
          pswpModule: () => import("photoswipe"),
        });
       
        (lightbox as { init: () => void }).init();
      } catch (error) {
        console.error('Failed to load PhotoSwipe:', error);
      }
    };
    
    initPhotoSwipe();
   
    return () => {
      if (lightbox) {
        (lightbox as { destroy: () => void }).destroy();
      }
    };
  }, [galleryID, galleryImages.length]);

  // Helper function to construct full R2 URL with better path cleaning
  const getFullR2URL = (relativePath: string): string => {
    // If it's already a full URL, return as-is
    if (relativePath.startsWith('http')) {
      return relativePath;
    }
    
    // Clean the path more thoroughly
    const cleanPath = relativePath
      .replace(/^\/+/, '')        // Remove leading slashes
      .replace(/\/+/g, '/')       // Replace multiple slashes with single slash
      .replace(/\/+$/, '');       // Remove trailing slashes
    
    // Get the bucket URL from environment variable
    const bucketURL = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
    
    if (!bucketURL) {
      console.warn('NEXT_PUBLIC_R2_BUCKET_URL not set');
      return relativePath; // Return relative path as fallback
    }
    
    // Construct the full URL
    const fullURL = `${bucketURL}/${cleanPath}`;
    
    // console.log(`URL construction: ${relativePath} -> ${cleanPath} -> ${fullURL}`);
    
    return fullURL;
  };

  // No gallery to display
  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className="font-bold text-xl mt-8 mb-4">Photo Gallery</h3>
      <div className="pswp-gallery grid grid-cols-2 md:grid-cols-3 gap-4" id={galleryID}>
        {galleryImages.map((image, index) => {
          // Use the helper function to construct full URLs
          const fullLargeURL = getFullR2URL(image.largeURL);
          
          // console.log(`Image ${index}:`, {
          //   originalPath: image.largeURL,
          //   fullURL: fullLargeURL
          // });
           
          return (
            <a
              href={fullLargeURL}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              key={galleryID + "-" + index}
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden rounded-lg"
            >
              <SimR2Image
                src={image.thumbnailURL}
                alt={image.alt || "Gallery image"}
                width={image.width}
                height={image.height}
                className="object-cover transition-transform hover:scale-105"
                priority={index < 4}
              />
            </a>
          );
        })}
      </div>
    </>
  );
}
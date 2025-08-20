import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Simple base64 blur placeholder (server-safe)
const DEFAULT_BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

interface R2ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  blurDataURL?: string;
  enableBlur?: boolean;
}

export default function R2Image({
  src,
  alt = "",
  width = 1200,
  height = 800,
  className,
  priority = false,
  quality = 75,
  fill = false,
  sizes,
  style,
  blurDataURL,
  enableBlur = true,
  ...props
}: R2ImageProps) {
  const imageUrl = `${process.env.NEXT_PUBLIC_R2_BUCKET_URL}/${src.replace(/^\//, '')}`;
  
  // Use provided blur data URL or default
  const finalBlurDataURL = enableBlur 
    ? blurDataURL || DEFAULT_BLUR_DATA_URL
    : undefined;

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={cn(className)}
        priority={priority}
        quality={quality}
        sizes={sizes || "100vw"}
        style={style}
        placeholder={enableBlur ? "blur" : "empty"}
        blurDataURL={finalBlurDataURL}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      priority={priority}
      quality={quality}
      sizes={sizes}
      style={style}
      placeholder={enableBlur ? "blur" : "empty"}
      blurDataURL={finalBlurDataURL}
      {...props}
    />
  );
}
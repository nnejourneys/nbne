"use client";
// components/styledcomps/video.tsx
import {
  MediaController,
} from "media-chrome/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  src: string;
  muted?: boolean;
  className?: string;
  poster?: string;
}

export default function VideoPlayer({
  src = "https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4",
  className,
  muted = true,
  poster,
  ...props
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(!!poster);

  useEffect(() => {
    // Ensure video attributes are set after component mounts
    if (videoRef.current) {
      videoRef.current.tabIndex = -1;
      
      // Add error handling for video loading
      videoRef.current.onerror = (err) => {
        console.error("Video loading failed:", err);
        // Hide the video element if it fails to load using CSS class
        if (videoRef.current) {
          videoRef.current.classList.add('hidden');
        }
      };
      
      // Try to play the video manually
      videoRef.current.play().then(() => {
        // Hide poster when video starts playing
        setShowPoster(false);
      }).catch((err) => {
        console.log("Video autoplay prevented:", err);
      });
      
      // Also hide poster when video starts playing
      videoRef.current.onplay = () => setShowPoster(false);
    }
  }, []);

  return (
    <div className={cn("relative", className)}>
      {showPoster && poster && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src={poster}
            alt="Video thumbnail"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
      )}
      <MediaController
        className="w-full h-full"
        suppressHydrationWarning={true}
        // @ts-ignore - suppress third-party library key warnings
        key="media-controller"
        {...props}
      >
        <video 
          ref={videoRef}
          slot="media" 
          src={src} 
          preload="auto" 
          muted={muted} 
          autoPlay 
          loop
          tabIndex={-1}
          suppressHydrationWarning={true}
          playsInline
          className="w-full h-full object-cover"
        />
      </MediaController>
    </div>
  );
}
"use client";
// components/styledcomps/video.tsx
import {
  MediaController,
} from "media-chrome/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    // Ensure video attributes are set after component mounts
    if (videoRef.current) {
      videoRef.current.tabIndex = -1;
      // Try to play the video manually
      videoRef.current.play().catch((err) => {
        console.log("Video autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <MediaController 
      className={cn(className)} 
      suppressHydrationWarning={true}
      {...props}
    >
      <video 
        ref={videoRef}
        slot="media" 
        src={src} 
        poster={poster}
        preload="auto" 
        muted={muted} 
        autoPlay 
        loop
        tabIndex={-1}
        suppressHydrationWarning={true}
        playsInline
      />
    </MediaController>
  );
}

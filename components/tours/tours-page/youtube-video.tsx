"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import {
  MediaController,
  MediaControlBar, 
} from "media-chrome/react";
import type { MediaController as MediaControllerType } from "media-chrome";

interface YouTubeVideoProps {
  url: string;
  title?: string;
  className?: string;
  poster?: string;
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export default function YouTubeVideo({
  url,
  title = "YouTube Video",
  className = "",
  poster,
}: YouTubeVideoProps) {
  const [isClient, setIsClient] = useState(false);
  const [mediaPlayerLoaded, setMediaPlayerLoaded] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef<MediaControllerType>(null);
  const videoId = extractVideoId(url);

  useEffect(() => {
    setIsClient(true);

    // Dynamically import media-chrome
    import("media-chrome")
      .then(() => {
        setMediaPlayerLoaded(true);
      })
      .catch(console.error);
  }, []);

  if (!videoId) {
    return (
      <div className={`bg-muted rounded-lg p-4 text-center ${className}`}>
        <p className="text-muted-foreground">Invalid YouTube URL</p>
      </div>
    );
  }

  // Show loading state until client-side and media-chrome is loaded
  if (!isClient || !mediaPlayerLoaded) {
    const backgroundImageUrl = poster 
      ? `${process.env.NEXT_PUBLIC_R2_BUCKET_URL || ''}${poster}`
      : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    return (
      <div className={`relative w-full ${className}`}>
        <div 
          className="relative w-full aspect-video bg-cover bg-center bg-no-repeat cursor-pointer group rounded-lg overflow-hidden"
          style={{ 
            backgroundImage: `url(${backgroundImageUrl})` 
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
            {title}
          </div>
        </div>
      </div>
    );
  }

  // Create media-chrome elements using createElement to avoid JSX issues
  const backgroundImageUrl = poster 
    ? `${process.env.NEXT_PUBLIC_R2_BUCKET_URL || ''}${poster}`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  return (
    <div className={`relative w-full ${className}`}>
      <MediaController
        ref={videoRef}
        className="w-full rounded-lg overflow-hidden"
        // @ts-ignore - suppress third-party library key warnings
        key={`media-controller-${videoId}`}
      >
        <iframe
          slot="media"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video"
        />

        {showPoster && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat cursor-pointer group rounded-lg overflow-hidden"
            style={{ 
              backgroundImage: `url(${backgroundImageUrl})` 
            }}
            onClick={() => setShowPoster(false)}
          >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary hover:bg-primary/50 rounded-full flex items-center justify-center shadow-lg transition-colors group-hover:scale-105 transform">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
            {title}
          </div>
        </div>
        )}

        <MediaControlBar>
          {/* <MediaPlayButton 
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 mx-2 border-0"
          >
            <Play className="w-5 h-5" fill="currentColor" />
          </MediaPlayButton> */}
          {/* <MediaTimeDisplay showDuration /> */}
        </MediaControlBar>
      </MediaController>
    </div>
  );
}

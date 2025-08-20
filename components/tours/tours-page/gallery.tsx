"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react"; 
import R2Image from "@/components/styledcomps/R2Image";

// Custom hook for keyboard navigation
const useKeyboardNavigation = (
  onLeft: () => void,
  onRight: () => void,
  dependencies: unknown[] = []
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          onLeft();
          break;
        case "ArrowRight":
        case " ": // Space bar
        case "Enter":
          onRight();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);
};

interface GalleryProps {
  galleryImages: string[];
}


export default function Gallery({ galleryImages }: GalleryProps) {
  const [slideNumber, setSlideNumber] = useState(0);

  const prevSlide = () => {
    setSlideNumber(
      slideNumber === 0 ? galleryImages.length - 1 : slideNumber - 1
    );
  };

  const nextSlide = () => {
    setSlideNumber(
      slideNumber + 1 === galleryImages.length ? 0 : slideNumber + 1
    );
  };

  // Use our custom hook for keyboard navigation
  useKeyboardNavigation(prevSlide, nextSlide, [
    slideNumber,
    galleryImages.length,
  ]);

  return (
    <Dialog>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {galleryImages.map((slide: string, index) => (
          <div key={index} className="mb-0">
            <DialogTrigger
              onClick={() => setSlideNumber(index)}
              className="cursor-pointer overflow-hidden"
            >
              <R2Image
                className="max-w-full object-cover hover:scale-105 overflow-hidden"
                src={slide}
                alt="image"
                width={640}
                height={480}
              />
            </DialogTrigger>
            <DialogContent className="w-full p-0 border-none">
              <DialogTitle className="sr-only">Gallery</DialogTitle>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  <CarouselItem>
                    <R2Image
                      src={galleryImages[slideNumber]}
                      alt="image"
                      width={1920}
                      height={1080}
                    />
                  </CarouselItem>
                </CarouselContent>
                <Button
                  onClick={prevSlide}
                  variant="outline"
                  size="icon"
                  className="absolute h-8 w-8 rounded-full top-1/2 left-5 md:-left-5 lg:-left-10"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Previous slide</span>
                </Button>
                <Button
                  onClick={nextSlide}
                  variant="outline"
                  size="icon"
                  className="absolute h-8 w-8 rounded-full top-1/2 right-5 md:-right-5 lg:-right-10"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Next slide</span>
                </Button>
              </Carousel>
            </DialogContent>
          </div>
        ))}
      </div>
    </Dialog>
  );
}

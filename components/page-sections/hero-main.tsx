"use client";
import Slides from "@/data/heroslider.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "../ui/button";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Heading } from "../styledcomps/heading";
import React from "react";
import R2Image from "../styledcomps/R2Image";

export default function HeroMain() {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Fade(),
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {Slides.hero.slides.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-video relative w-full h-[60vh] sm:h-[100vh] z-0">
                <R2Image
                  className="absolute aspect-video object-cover"
                  src={item.image}
                  alt={item.title} 
                  fill
                  priority={item.load}
                  quality={85}
                  sizes="100vw"
                />
                <div className="absolute top-0 left-0 w-full h-[60vh] sm:h-[100vh] bg-black/20" />
                <div className="absolute top-[40%] left-[10%]">
                  <Heading
                    size="xs"
                    className="text-white font-bold mb-1 [text-shadow:_0.5px_0.5px_rgb(0_0_0_/_100%)]"
                    asChild={true}
                  >
                    <h1> {item.title} </h1>
                  </Heading>
                  <Heading
                    size="xl"
                    className="text-white font-bold mb-3 [text-shadow:_1px_1px_rgb(0_0_0_/_100%)]"
                  >
                    {item.subtitle}
                  </Heading>
                  <Heading
                    size="sm"
                    className="text-white font-semibold mb-5 [text-shadow:_0.5px_0.5px_rgb(0_0_0_/_100%)]"
                    asChild={true}
                  >
                    <h3>{item.description}</h3>
                  </Heading>
                  <Link href="/tours">
                    <Button size="lg">Explore all tours</Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-5" />
        <CarouselNext className="absolute top-1/2 right-5" />
      </Carousel>
    </>
  );
}

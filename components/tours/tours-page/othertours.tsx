"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heading } from "@/components/styledcomps/heading";
import React from "react";
import { Container } from "@/components/styledcomps/container";
import { Tours } from "@/.velite";
import R2Image from "@/components/styledcomps/R2Image";

interface OthertoursProps {
  tours: Tours[];
  tourtype: string | undefined;
}

export default function Othertours({ tours, tourtype }: OthertoursProps) {
  return (
    <Container width="nomargin">
      <Heading className="text-semibold text-center capitalize mb-5" size="md">
        Other {tourtype} tours
      </Heading>
      <Carousel
        className="mx-5 md:mx-14 mb-20"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {tours?.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 group"
            >
              <div className="relative">
                <AspectRatio ratio={16 / 9}>
                  <R2Image
                    className="img-fluid w-full"
                    src={item.image!}
                    width={240}
                    height={160}
                    alt={item.title!}
                  />
                </AspectRatio>
                <div className="absolute top-0 left-0 h-full w-full bg-black[60%] z-50 transition duration-300 ease-out">
                  <Link
                    // href={item.slug}
                    href={item.slug}
                    className="font-bold drop-shadow absolute left-7 bottom-10 translate-x-5 translate-y-5 rounded-md
                  group-hover:bg-primary group-hover:p-2 group-hover:translate-x-0 group-hover:translate-y-0
                  transition duration-300 ease-out"
                  >
                    <Heading
                      size="xs"
                      className="text-white text-balance mb-0"
                      asChild={true}
                    >
                      <h5> {item.title} </h5>
                    </Heading>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
    </Container>
  );
}

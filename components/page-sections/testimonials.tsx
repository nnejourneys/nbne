"use client";
// import Image from "next/image";
// import { imgblurDataURL } from "@/lib/constants";
import Testimonialdata from "@/data/testimonials.json";
import { Icon } from "@iconify/react"; 
import { Heading } from "../styledcomps/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { P } from "../ui/p";
import { Container } from "../styledcomps/container";
import R2Image from "../styledcomps/R2Image";

export default function Testimonials() {
  return ( 
      <Container width="marginxy">
        <Heading variant="sectiontitle" size="md">
          Clientspeak
        </Heading>
        <Icon
          className="mb-2 h-16 w-16 p-0.5 text-primary leading-relaxed inline-block text-center"
          icon="icomoon-free:quotes-left"
          width="30"
          height="30"
        />
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 15000,
            }),
          ]}
        >
          <CarouselContent>
            {Testimonialdata.testimonials.map((item, index) => (
              <CarouselItem key={index}>
                <div className="py-24 px-5 md:p-10 lg:p-24 mb-10 md:w-full lg:w-[90vw] xl:w-[80vw]">
                  <div className="md:flex gap-8 mb-6">
                    <R2Image
                      className="rounded-full block mb-5"
                      src={item.img}
                      // placeholder="blur"
                      // blurDataURL={imgblurDataURL}
                      // title={item.name}
                      alt={item.name}
                      width={200}
                      height={200}
                    />
                    <div>
                      <p className="text-xl font-semibold italic mb-2">
                        {item.name}
                      </p>
                      <p className="text-muted-foreground">{item.tour}</p>
                    </div>
                  </div>
                  <P>{item.text}</P>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:inline-flex" />
          <CarouselNext className="hidden lg:inline-flex" />
        </Carousel>
      </Container> 
  );
}

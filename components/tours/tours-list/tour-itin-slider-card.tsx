import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Heading } from "@/components/styledcomps/heading";
import { Tours } from "@/.velite";
import R2Image from "@/components/styledcomps/R2Image";
import { Card } from "@/components/ui/card";

export default function TourSliderCard({
  bg_image,
  title,
  subtitle,
  slug,
  cat,
}: Tours) {
  return (
    <Card className="relative group rounded-lg overflow-hidden">
      <Link href={`tours/${slug}`} title={title}>
        <AspectRatio ratio={16 / 9}>
          <R2Image
            className=""
            src={bg_image!}
            width={720}
            height={480}
            alt={title!}
          />
        </AspectRatio>

        <div className="absolute top-0 left-0 h-full w-full bg-black/20 ease-in-out duration-300">
          <p className="absolute top-0 end-0 text-white text-xs bg-primary text-center px-3 py-1">
            {cat}
          </p>
          <div className="absolute left-2 bottom-10 translate-y-5 opacity-90 group-hover:bg-primary ease-in-out duration-300 p-2">
            <h5 className="font-bold text-white [text-shadow:_1px_1px_rgb(0_0_0_/_100%)]">
              {title}
            </h5>
            <h6 className="font-light text-xs text-white [text-shadow:_1px_1px_rgb(0_0_0_/_100%)]">
              {subtitle}
            </h6>
          </div>
        </div>
      </Link>
    </Card>
  );
}

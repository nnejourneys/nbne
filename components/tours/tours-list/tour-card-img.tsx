// components/tours/tours-list/tour-card-img.tsx
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tours } from "@/.velite";
import R2Image from "@/components/styledcomps/R2Image";

export default function TourCardImg({ tour }: { tour: Tours }) {
  return ( 
      // <div className="bg-green-300 flex items-center justify-center">
        <R2Image
          className="opacity-80 w-full object-cover object-center transition duration-500 ease-in-out group-hover:scale-110"
          src={tour.bg_image!}
          width={720}
          height={480}
          alt={tour.title!}
        />
      // </div> 
  );
}

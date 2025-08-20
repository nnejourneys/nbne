import { Heading } from "@/components/styledcomps/heading";
import R2Image from "@/components/styledcomps/R2Image";

type TourProps = {
  title: string;
  subtitle?: string;
  days?: string;
  image: string | undefined;
};

export default function TourCoverImage({
  title,
  subtitle,
  days,
  image,
}: TourProps) {
  const coverImage = (
    <R2Image
      src={image as string}
      alt={title}
      className="z-10 bg-cover object-cover bg-center w-[100%] h-[60%] lg:h-full"
      fill
      priority={true}
      sizes="100vw"
    />
  );
  return (
    <div className="tour-cover-image w-full h-[60vh] lg:h-[100vh] bg-center bg-no-repeat relative z-10 ">
      <div className="tour-overlay absolute top-0 left-0 h-[60vh] lg:h-[100vh] w-full z-20 bg-black/20" />
      {coverImage}
      <div className="w-full md:w-5/6 tour-content page absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center z-30">
        <Heading
          size="xl"
          className="uppercase text-balance text-white font-bold [text-shadow:_1px_1px_rgb(0_0_0_/_100%)]"
          asChild={true}
        >
          <h1>{title}</h1>
        </Heading>
        <Heading
          size="md"
          className="capitalize text-balance text-white font-semibold [text-shadow:_1px_1px_rgb(0_0_0_/_100%)]"
        >
          {subtitle}
        </Heading>
        <Heading
          size="sm"
          className="capitalize text-balance text-white [text-shadow:_1px_1px_rgb(0_0_0_/_100%)]"
        >
          {days}
        </Heading>
      </div>
    </div>
  );
}

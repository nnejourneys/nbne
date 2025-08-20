import { Skeleton } from "../ui/skeleton";
import R2Image from "../styledcomps/R2Image";

interface CoverImageProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
}

export default function CoverImage({
  src,
  title,
  width = 720,
  height = 480,
}: CoverImageProps) {
  return (
    <>
      {src ? (
        <R2Image
          src={src}
          alt={`Cover Image for ${title}`}
          className="max-h-72 object-cover rounded-t-md"
          width={width}
          height={height}
        />
      ) : (
        <Skeleton className="max-h-72 w-full" />
      )}
    </>
  );
}

import R2Image from "../styledcomps/R2Image";

interface PostImageProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
}

export default function PostImage({
  src,
  title,
  width = 720,
  height = 480,
}: PostImageProps) {
  return (
    <>
      {src ? (
        <R2Image
          src={src}
          alt={`Image for ${title}`}
          className="w-full mx-auto my-10" //max-h-96
          width={width}
          height={height}
        />
      ) : null}
    </>
  );
}

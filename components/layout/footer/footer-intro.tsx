// import Image from "next/image";
// import { imgblurDataURL, SITE_TITLE } from "@/lib/constants";
import { SITE_TITLE } from "@/lib/constants";
import R2Image from "@/components/styledcomps/R2Image";

interface FooterData {
  img: string;
  content: string;
}

interface FooterIntroProps {
  footerdata: FooterData;
}

export default function FooterIntro({ footerdata }: FooterIntroProps) {
  return (
    <div>
      <R2Image
        className="mt-1 mb-5 mx-auto md:mx-1"
        src={footerdata.img}
        // placeholder="blur"
        // blurDataURL={imgblurDataURL}
        alt={SITE_TITLE}
        // title={SITE_TITLE}
        width={180}
        height={180}
      />
      <p className="my-5 text-justify">{footerdata.content}</p>
    </div>
  );
}
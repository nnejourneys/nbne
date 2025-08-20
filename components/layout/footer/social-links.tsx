"use client";
import { Icon } from "@iconify/react"; 

interface SocialItem {
  link: string;
  name: string;
  icons: string;
}

interface FooterData {
  social: SocialItem[];
}

interface SocialLinksProps {
  footerdata: FooterData;
}

export default function SocialLinks({ footerdata }: SocialLinksProps) {
  return ( 
      <ul className="flex justify-center md:justify-start gap-8">
        {footerdata.social.map((item: SocialItem, index: number) => (
          <li className="mr-1" key={index}>
            <a href={item.link} aria-label={item.name} target="_blank" title={item.name}>
              <Icon
                icon={item.icons}
                className="w-10 h-10 text-foreground hover:text-primary transition duration-150 ease-out"
              /> 
            </a>
          </li>
        ))}
      </ul> 
  );
}

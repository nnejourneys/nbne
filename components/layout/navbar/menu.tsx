"use client";
import React, { useEffect, useState } from "react"; 
import Navbar from "./navbar";
import HamburgerMenu from "./hamburger-menu";
import ContactBanner from "./contact-banner";
import Link from "next/link";
import { SITE_TITLE } from "@/lib/constants";
import Image from "next/image";

export default function Menu() {
  const [yValue, setYValue] = useState(0);
  const [toHide, setToHide] = useState(false);

  useEffect(() => {
    const showHeaderOnScrollUp = () => {
      if (yValue >= window.scrollY) {
        setToHide(false);
      } else {
        setToHide(true);
      }
      setYValue(window.scrollY);
    };

    window.addEventListener("scroll", showHeaderOnScrollUp);

    return () => {
      window.removeEventListener("scroll", showHeaderOnScrollUp);
    };
  }, [yValue]);

  return (
    <>
      <div
        className={
          "fixed max-w-[100vw] top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur" +
          (toHide && "py-0 h-0 hidden")
        }
      >
        <div className="hidden md:block">
          <ContactBanner />
        </div>

        <div className="flex justify-between py-1 px-1 md:px-3 lg:px-5 xl:px-10 gap-x-5 items-center">
          <Link href="/" title={SITE_TITLE}>
            <Image
              src="/images/logo.svg"
              alt={SITE_TITLE} 
              className="w-20 h-auto"
              width={300}
              height={205}
            />
          </Link>
          <HamburgerMenu />
          <div className="hidden md:flex">
            <Navbar />
          </div>
        </div>
      </div>
    </>
  );
}

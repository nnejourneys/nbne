"use client";
import Link from "next/link"; 
import { Button } from "../ui/button";
import R2Image from "../styledcomps/R2Image";

export default function CTA() {
  return (
    <>
      <section className="h-96 relative">
        <R2Image
          className="object-cover object-center"
          src="/ferry-crossing.jpg"
          alt="Northeast India ferry crossing"
          fill 
        />
        <div className="absolute right-20 top-1/2">
          <Link href="/contact">
            <Button size="lg" className="uppercase">
              get in touch
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

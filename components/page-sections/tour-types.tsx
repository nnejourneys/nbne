"use client";
// import Image from "next/image";
// import { imgblurDataURL } from "@/lib/constants";
import Tourtypedata from "@/data/tourtypes.json"; 
import { Heading } from "../styledcomps/heading";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Container } from "../styledcomps/container";
import R2Image from "../styledcomps/R2Image";

export default function TourTypes() {
  return (
    <Container width="marginxy">
      <Heading variant="sectiontitle" size="md" className="text-balance">
        {Tourtypedata.tourtypetitle}
      </Heading>
      <div className="grid md:grid-cols-3 gap-4">
        {Tourtypedata.tourtype.map((item, index) => (
          <div className="mb-4" key={index}>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{item.title}</CardTitle>
              </CardHeader>
              <div className="relative">
                <R2Image
                  className="w-full"
                  src={item.img}
                  alt={item.title}
                  // title={item.title}
                  // placeholder="blur"
                  // blurDataURL={imgblurDataURL}
                  width={240}
                  height={170}
                  // sizes="30vw"
                />
              </div>
              <CardContent>
                <p className="text-justif pt-3 px-1 mb-5">{item.text}</p>
                <Link href={item.url} title={item.btnText}>
                  <Button
                    id={item.btnText}
                    aria-label={item.btnText}
                    title={item.btnText}
                  >
                    {item.btnText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

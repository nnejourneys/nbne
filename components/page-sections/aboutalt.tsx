"use client";
import Link from "next/link";
import Aboutdata from "@/data/about.json";
import { Heading } from "@/components/styledcomps/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { P } from "../ui/p";
import { Container } from "../styledcomps/container";
// import R2Image from "../styledcomps/R2Image";
import VideoPlayer from "../styledcomps/video";

export default function AboutAlt() {
  return (
    <Container
      className={`relative my-20 before:absolute before:content-['']
            before:h-full before:w-full before:top-0 before:left-0 before:bg-[rgba(0, 0, 0, 0.329)] before:opacity-60`}
      animate
    >
      <div className="">
        <VideoPlayer
          src="https://pub-3d943afeed9643318d31712e02ebf613.r2.dev/North-by-Northeast-tours-Northeast-India.mp4"
          poster="https://pub-3d943afeed9643318d31712e02ebf613.r2.dev/videoposter.jpg"
          className="z-0 object-cover object-center"
        />

        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
          <div className="grid lg:grid-cols-6">
            <div className="md:col-end-7 md:col-span-3">
              <div>
                <Card className="bg-gray-950/70 border-0">
                  <CardHeader>
                    <Heading variant="sectiontitlehalf">
                      <span className="text-white">
                        {Aboutdata.about.title}
                      </span>
                    </Heading>
                  </CardHeader>
                  <CardContent>
                    <P className="text-justify text-white mb-8">
                      {Aboutdata.about.text}
                    </P>
                    <Link href={Aboutdata.about.btnlink} className="mt-2">
                      <Button>{Aboutdata.about.btntext}</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

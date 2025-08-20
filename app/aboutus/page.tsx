"use client";
import React from "react";
import Aboutusdata from "@/data/aboutus.json";
import { Icon } from "@iconify/react";
import { Heading } from "@/components/styledcomps/heading";
import { P } from "@/components/ui/p";
import { Container } from "@/components/styledcomps/container";
import R2Image from "@/components/styledcomps/R2Image";

export default function Aboutus() {
  return (
    <>
      <Container width="marginxy">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-7 px-4 text-justify">
            <Heading variant="sectiontitlehalf">
              {Aboutusdata.abouttitle}
            </Heading>
            <P>{Aboutusdata.abouttext}</P>
          </div>

          <div className="lg:col-span-5 md:mb-50">
            <R2Image
              className="w-full px-4"
              src={Aboutusdata.aboutimg} 
              alt={Aboutusdata.abouttitle}
              width={300}
              height={300}
            />
          </div>
        </div>
      </Container>
      <Container width="marginxy">
        <div className="grid lg:grid-cols-12 rounded-lg bg-muted">
          <div className="lg:col-span-5 bg-center bg-cover bg-no-repeat">
            <R2Image
              className="lg:rounded-l-lg"
              src={Aboutusdata.visionimg}
              alt={Aboutusdata.visiontitle}
              width={640}
              height={480}
            />
          </div>
          <div className="lg:col-span-7 p-5">
            <Heading variant="sectiontitlehalf" className="text-muted-foreground">
              {Aboutusdata.visiontitle}
            </Heading>
            <P className="text-muted-foreground text-justify">{Aboutusdata.visiontext}</P>
          </div>
        </div>
      </Container>

      <Container width="marginxy">
        <Heading>{Aboutusdata.responsibilitytitle}</Heading>
        <Heading variant="sectiontitlehalf">
          {Aboutusdata.responsibilitysubtitle}
        </Heading>
        <div className="grid grid-cols-2 lg:grid-cols-4 my-5">
          {Aboutusdata.responsibility.map((item, index) => (
            <div key={index}>
              <Icon
                className="w-72 mx-auto"
                icon={item.icon}
                width="100"
                height="100"
              />
              <Heading className="text-center" size="xs">
                {item.title}
              </Heading>
            </div>
          ))}
        </div>
        <P className=" text-justify">{Aboutusdata.responsibilitytext}</P>
      </Container>
    </>
  );
}

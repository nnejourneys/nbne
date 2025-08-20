"use client";
import Regiondata from "@/data/region.json";
import { Heading } from "../styledcomps/heading";
import { P } from "../ui/p";
import { Container } from "../styledcomps/container"; 
import R2Image from "../styledcomps/R2Image";

export default function Region() {
  return (
    <Container width="marginxy">
      <Heading variant="sectiontitle" size="lg">
        The region at a glance
      </Heading>
      <ul className="region-card-list my-20">
        {Regiondata.accordion.map((item, index) => (
          <li
            className="row block md:flex md:flex-row even:flex-row-reverse gap-8 py-20 "
            key={index}
          >
            <div className="w-full md:w-1/2 px-2 lg:px-0 mb-4">
              <Heading variant="sectiontitlehalf" size="md">
                {item.title}
              </Heading>
              <P className="text-justify">{item.text}</P>
            </div>
            <div className="w-full md:w-1/2">
              <R2Image
                className="w-full"
                src={item.image}
                // placeholder="blur"
                // blurDataURL={imgblurDataURL}
                alt={item.title}
                // title={item.title}
                width={480}
                height={480}
              />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

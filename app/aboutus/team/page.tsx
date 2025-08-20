"use client";
// import { imgblurDataURL } from "@/lib/constants";
// import Image from "next/image";
import Teamdata from "@/data/team.json";
// import { Icon } from "@iconify/react";
import { Heading } from "@/components/styledcomps/heading";
import { Card } from "@/components/ui/card";
import { P } from "@/components/ui/p";
import { Container } from "@/components/styledcomps/container";
import R2Image from "@/components/styledcomps/R2Image";

export default function Team() {
  return (
    <Container width="marginxy">
      <Heading variant="sectiontitlehalf">{Teamdata.title}</Heading>
      <P className="text-justify my-10">{Teamdata.text}</P>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 row">
        {Teamdata.teammembers
          .sort((a, b) => (a.weight > b.weight ? 1 : -1))
          .map((item, index) => (
            <Card key={index}>
              {/* <div className="card text-center"> */}
                <R2Image
                  className=" rounded-t-lg "
                  src={item.image}
                  // placeholder="blur"
                  // blurDataURL={imgblurDataURL}
                  width={480}
                  height={360}
                  alt="team-member"
                />
                {/* <div className="card-body card-body-2 p-4 transition duration-150 ease-out"> */}
                  {/* <h5 className="card-title z-20 py-auto text-2xl font-bold text-nne-font"> */}
                  <Heading className="text-center mt-3" size="xs">{item.title}</Heading>

                  {/* </h5> */}
                  {/* <div className="pb-3">
                    {item.information.map((item, index) => (
                      <div className="flex justify-between my-auto" key={index}>
                        <p className="flex">
                          <Icon className="pr-0.5 my-auto" icon={item.icon} />
                          {item.label}
                        </p>
                        <p className="text-right font-semibold">{item.data}</p>
                      </div>
                    ))}
                  </div> */}
                {/* </div> */}
              {/* </div> */}
            </Card>
          ))}
      </div>
    </Container>
  );
}

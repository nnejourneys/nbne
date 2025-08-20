"use client";
import Contactdata from "@/data/contact.json";
import { Icon } from "@iconify/react";
import { Container } from "../styledcomps/container";

export default function Contacts() {
  return (
    <Container>
      <h2 className="text-3xl font-bold mb-14">Contact Us</h2>
      <ul className="ps-0">
        {Contactdata.contact.map((item, index) => (
          <li className="group flex mb-8" key={index}>
            <div className="relative round-icon me-3 h-16 w-16 rounded-full border-2 border-muted text-center leading-loose text-3xl text-nne-primary inline-block">
              <Icon
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-primary transition duration-150 ease-out"
                icon={item.icon}
                width="25"
                height="25"
              />
            </div>
            <a
              className="my-auto font-semibold text-md group-hover:text-primary transition duration-150 ease-out"
              href={item.link}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}

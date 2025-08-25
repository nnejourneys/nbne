"use client";
import Alertdata from "@/data/alert.json";
import { Icon } from "@iconify/react";
import { Button } from "../../ui/button";

export default function ContactBanner() {
  return (
    <>
      <div className="bg-slate-800 px-5">
        <ul className=" flex flex-wrap justify-center md:justify-end">
          {Alertdata.contact.map((item, index) => (
            <li className="m-0" key={index}>
              <a href={item.link} aria-label={item.name} title={item.name}>
                <Button variant="link">{item.name}</Button>
              </a>
            </li>
          ))}
          {Alertdata.social.map((item, index) => (
            <li key={index} className="m-0 mr-3 my-auto">
              <a
                href={item.link}
                target="_blank"
                aria-label={item.name}
                title={item.name}
              > 
                  <Icon
                    className="text-primary my-auto w-4 h-4 hover:opacity-80"
                    icon={item.icons}
                    aria-label={item.name}
                  /> 
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

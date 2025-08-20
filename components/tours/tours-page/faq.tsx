import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface FAQProps {
  title: string;
  text: string;
}

export default function FAQ({ faq }: { faq: FAQProps[] }) {
  return (
    <>
      <p className="bg-muted w-full inline-flex h-9 items-center rounded-lg px-3 py-1 text-xs md:text-sm font-medium mb-3">
        FAQ
      </p>
      <Accordion type="single" collapsible>
        {faq.map((item, index) => (
          <AccordionItem key={index} value={item.title}>
            <AccordionTrigger className="text-lg font-semibold px-2">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="w-10/12 text-justify">{item.text}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { Tours } from "@/.velite";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/styledcomps/heading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TourCardBody({ tour }: { tour: Tours }) {
  return (
    <div className="flex flex-col justify-between py-3">
      <Link href={`/tours/${tour.slug}`} title={tour.title}>
        <Tooltip>
          <TooltipTrigger
            onMouseEnter={(e) =>
              e.currentTarget.closest("a")?.removeAttribute("title")
            }
            onMouseLeave={(e) =>
              e.currentTarget.closest("a")?.setAttribute("title", tour.title!)
            }
          >
            <Heading
              className="text-muted-foreground mb-0 text-left text-balance line-clamp-2 font-bold group-hover:text-primary"
              size="xs"
            >
              {tour.title}
            </Heading>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tour.title}</p>
          </TooltipContent>
        </Tooltip>
        <Heading
          className="text-muted-foreground leading-4 mb-4"
          size="xxs"
          fontweight="medium"
          fontstyle="sans"
        >
          {tour.subtitle}
        </Heading>
      </Link>
      <div className="flex flex-row lg:flex-col justify-between gap-4">
        <div className="flex">
          <Icon
            className="my-1 p-2 bg-muted-foreground/20 group-hover:text-primary rounded-lg"
            icon={tour.touricon!}
            width="40"
          />
          <div className="my-auto">
            <Heading
              className="flex ml-2 mb-0"
              size="xxxs"
              fontweight="light"
              fontstyle="display"
            >
              <Icon className="me-2 my-auto" icon="bytesize:flag" />
              {tour.days}
            </Heading>
            <Separator className="ms-2 w-32 max-h-px" />
            <Heading
              className="flex ml-2 mb-0"
              size="xxxs"
              fontweight="light"
              fontstyle="display"
            >
              <Icon className="me-2 my-auto" icon="bi:speedometer2" />
              {tour.cat}
            </Heading>
          </div>
        </div>
        <div>
          <Link href={`/tours/${tour.slug}`} title={tour.title}>
            <Button size="sm">Tour Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

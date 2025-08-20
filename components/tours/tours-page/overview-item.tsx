"use client"; 
import { Icon, IconifyIcon } from "@iconify/react";

export type OverviewItemProps = {
  data: string;
  label: string | undefined;
  icon: string | IconifyIcon;
};

export default function TourOverviewItem({
  icon,
  label,
  data,
}: OverviewItemProps) {
  return (
    <>
      <li className="flex justify-between py-3 border-bottom-not-last hover:bg-muted/50 text-sm">
        <span className="flex my-auto">
          <Icon className="my-auto mr-2" icon={icon} />
          <p>{label}</p>
        </span>
        <span>
          <p className="font-medium">{data}</p> 
        </span>
      </li>
    </>
  );
}

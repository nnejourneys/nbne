import { parseISO, format } from "date-fns";

interface DateFormatterProps {
  dateString: string | Date; // Allow both string and Date types
}

export default function DateFormatter({ dateString }: DateFormatterProps) {
  let date: Date;

  if (typeof dateString === "string") {
    date = parseISO(dateString);
  } else if (dateString instanceof Date) {
    date = dateString;
  } else {
    throw new Error("Invalid date format");
  }

  return (
    <time dateTime={date.toISOString()}>{format(date, "LLLL d, yyyy")}</time>
  );
}

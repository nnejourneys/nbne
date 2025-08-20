import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type AccoProps = {
  meals: string;
  accommodation: string | undefined;
  refreshments: string | undefined;
};

export default function TouraccoList({
  meals,
  accommodation,
  refreshments,
}: AccoProps) {
  return (
    <>
      <Table>
        <TableBody>
          {meals ? (
            <TableRow className="flex flex-col py-3">
              <TableCell className="fw-bolder text-muted-foreground p-0">
                Meals
              </TableCell>
              <TableCell className="p-0">{meals}</TableCell>
            </TableRow>
          ) : null}
          {accommodation ? (
            <TableRow className="flex flex-col py-3">
              <TableCell className="fw-bolder text-muted-foreground p-0">
                Accommodation
              </TableCell>
              <TableCell className="p-0">{accommodation}</TableCell>
            </TableRow>
          ) : null}
          {refreshments ? (
            <TableRow className="flex flex-col py-3">
              <TableCell className="fw-bolder text-muted-foreground p-0">
                Refreshments
              </TableCell>
              <TableCell className="p-0">{refreshments}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </>
  );
}

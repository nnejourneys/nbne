import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export interface ItemsProps {
  l: string;
  d: string;
}

export default function TouroversList({ items }: { items: ItemsProps[] }) {
  return (
    <>
      <Table>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index} className="flex flex-col py-3"> 
            <TableCell className="text-muted-foreground p-0">{item.l}</TableCell>
            <TableCell className="p-0">{item.d}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";

export default function ListTable({ items }: { items: string[] }) {
  return (
    <Table>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index} className="">
            <TableCell className="text-muted-foreground px-0 py-3">{item}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

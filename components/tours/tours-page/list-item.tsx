import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function List({ items }: { items: string[] }) {
  return (
    <>
      <Table>
        {items.map((item: string, index: number) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell>
                {/* <li className="list-circle list-inside"> */}
                {item} 
                {/* </li> */}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </>
  );
}

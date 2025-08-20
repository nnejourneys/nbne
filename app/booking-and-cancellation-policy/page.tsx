import { Container } from "@/components/styledcomps/container";
import { Heading } from "@/components/styledcomps/heading";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody, 
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Privacypolicy() {
  return ( 
      <Container width="marginxy">
        <div className="max-w-4xl mx-auto">
          <Heading size="md" className="mb-10">
            Booking Policy
          </Heading>
          <ul className="list-circle ml-5 my-10 space-y-4">
            <li>
              30% of the tour expenses is to be deposited with North by
              Northeast Journeys at the time of booking. This deposit along with
              an invoice from North by Northeast Journeys on receipt of such an
              amount will be considered the confirmation of the booking
            </li>
            <li>
              The full payment for the tour needs to be paid 40 days prior to
              departure
            </li>
          </ul>

          <Separator />
          <Heading size="md" className="my-10">
            Cancellation Policy
          </Heading>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Timeframe</TableHead>
                <TableHead>Cancellation Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>30+ days prior departure</TableCell>
                <TableCell>15% of tour fee</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>29 - 22 days prior departure</TableCell>
                <TableCell>50% of tour fee</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>21 - 15 days prior depature</TableCell>
                <TableCell>75% of tour fee</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>14 - 0 days prior depature</TableCell>
                <TableCell>100% of tour fee</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <ul className="list-circle ml-5 my-10 space-y-4">
            <li>
              Cancellations must be intimated to North by Northeast Journeys in
              writing
            </li>
            <li>
              Cancellation in the unforeseen eventualities of disaster, war,
              riots, political or industrial unrest like Airline operators
              strike or any other force majeure (forces outside our control), it
              may be necessary to cancel the tour in the best interests of our
              clients. In such an eventuality our clients will be informed as
              soon as possible. 75% of the expenses borne by the clients
              (depending on the cancellation policies of the hotels, resorts,
              homestays etc) will be refunded by North by Northeast Journeys.
            </li>
            <li>
              North by Northeast Journeys does not own places of accommodation
              (hotels, resorts) for its clients. While we do exert influence for
              the service providers to adhere to the utmost quality, the
              ultimate responsibility for the service is with the Hotels
              themselves.
            </li>
            <li>
              North by Northeast Journeys will not refund the booking amount for
              entry refused due to VISA or health factors, such cancellations
              will be guided by the cancellation policy.
            </li>
          </ul>
        </div>
      </Container> 
  );
}

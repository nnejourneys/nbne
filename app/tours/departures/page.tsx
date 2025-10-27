import HeroPage from "@/components/page-sections/hero-page";
import { Heading } from "@/components/styledcomps/heading";
import TourCard from "@/components/tours/tours-list/tour-card";
import { Tours, tours } from "#site/content";
import { Container } from "@/components/styledcomps/container";

export default function Departures() {
  const departureTours = tours
    .filter((tour) => tour.category === "departures")
    .sort((a, b) => a.weight! - b.weight!)
    .filter((tour) => !tour.draft);

  // console.log(departureTours);
  console.log(tours[1].slug);
  console.log(tours[0].slugAsParams);

  return (
    <>
      <HeroPage />
      <Container width="marginxy">
        <Heading size="xl" variant="sectiontitle">
          {" "}
          Fixed Departures 2025{" "}
        </Heading>
        <section className="mx-auto">
          <ul className="grid md:grid-cols-2 gap-4">
            {departureTours.map((tour: Tours, index) => (
              <li key={index} className="flex">
                <TourCard
                  draft={tour.draft}
                  slugAsParams={tour.slugAsParams}
                  title={tour.title}
                  slug={tour.slug}
                  subtitle={tour.subtitle}
                  days={tour.days}
                  bg_image={tour.bg_image}
                  type={tour.type}
                  tourtype={tour.tourtype}
                  category={tour.category}
                  cat={tour.cat}
                  weight={tour.weight}
                  touricon={tour.touricon}
                  body={tour.body}
                  gallery={tour.gallery}
                />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}

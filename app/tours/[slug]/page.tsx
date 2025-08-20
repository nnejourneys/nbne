import React from "react";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/styledcomps/heading";
import { Container } from "@/components/styledcomps/container";
import TourCoverImage from "@/components/tours/tours-page/cover-image";
import TouroversList, { ItemsProps } from "@/components/tours/tours-page/overs";
import ListTable from "@/components/tours/tours-page/table";
import TouraccoList from "@/components/tours/tours-page/acco-list";
import Othertours from "@/components/tours/tours-page/othertours";
import TourOverviewItem from "@/components/tours/tours-page/overview-item";
import FAQ from "@/components/tours/tours-page/faq";
// import Gallery from "@/components/tours/tours-page/gallery";
import EnquiryForm from "@/components/tours/tours-page/enquiry-form";
import { MDXContent } from "@/components/tours/tours-page/mdx-components";
import { Tours, tours } from "@/.velite";
import { BASE_PATH, SITE_TITLE } from "@/lib/constants"; 
import SwipeGallery from "@/components/tours/tours-page/photoswipe";
import { generateTourSchema, generateBreadcrumbSchema } from "@/lib/schemas";

type Props = {
  params: {
    slug: string[];
  };
};

// Function to get tours by tourtype
function getToursByType(tourtype: string): Tours[] {
  return tours
    .filter((tour) => !tour.draft) // Filter out draft tours
    .filter((tour) => tour.tourtype === tourtype); // Filter by tourtype
}

async function getTourBySlug(params: Props["params"]) {
  const slug = (await params).slug.join("/");
  const tour = tours.find((tour) => tour.slugAsParams === slug);
  return tour;
}

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const tour = tours.find((tour) => tour.slug === params.slug);
  if (!tour) {
    return {};
  }

  return {
    title: `${tour.title} | ${SITE_TITLE}`,
    description: tour.description,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: tour.keywords,
    authors: [{ name: "Roheen Browne" }],
    creator: "Roheen Browne",
    publisher: "Roheen Browne",
    metadataBase: new URL(`${BASE_PATH}`),
    alternates: {
      canonical: `/tours/${tour.slug}`,
    },
    openGraph: {
      title: `${tour.title} | ${SITE_TITLE}`,
      description: tour.description,
      authors: ["Roheen Browne", "Mohan"],
      images: tour.image ? `${BASE_PATH}${tour.image}` : "/images/og-logo.png",
    },
    // ❌ Remove robots metadata - you have robots.ts file
  };
};

export default async function TourPage({ params }: Props) {
  const tour = await getTourBySlug(params);
  if (!tour) notFound();

  // ✅ Use the new comprehensive tour schema with safe defaults
  const tourSchema = generateTourSchema({
    title: tour.title!,
    subtitle: tour.subtitle!,
    slug: tour.slug, 
    days: tour.days || "6 days",
    cat: tour.cat,
    touricon: tour.touricon,
    image: tour.image,
    keywords: tour.keywords,
    tourtype: tour.tourtype,
    highlights: tour.highlights,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    overview: tour.overview
  });

  // ✅ Add breadcrumb schema with safe values
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_PATH },
    { name: "Tours", url: `${BASE_PATH}/tours` },
    { name: tour.title || "Tour", url: `${BASE_PATH}/tours/${tour.slug}` }
  ]);

  // ✅ Combine schemas for better SEO
  const combinedSchemas = [tourSchema, breadcrumbSchema];

  const relatedTours = getToursByType(tour.tourtype || "")
    .filter((t) => t.draft === false)
    .filter((t) => t.slugAsParams !== tour.slug)
    .slice(0, 5);

  return (
    <>
      {tour.title && (
        <TourCoverImage
          title={tour.title}
          subtitle={tour.subtitle}
          days={tour.days}
          image={tour.image}
        />
      )}
      <section className="mb-0 py-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchemas) }}
        />
        <Container width="marginx" className="mb-0">
          <article className="py-6 prose dark:prose-invert">
            {tour.description && (
              <p className="font-bold text-balance text-xl text-center my-10">
                {tour.description}
              </p>
            )}

            <div className="flex flex-col md:flex-row justify-start gap-4 mb-10 md:px-1">
              {tour.overview && (
                <Card className="w-full md:max-w-96 min-h-fit float-left mx-auto md:mx-0 mr-0 md:mr-5 mb-5 md:mb-0">
                  <ul className="divide-y divide-muted p-3">
                    {tour.overview.map((item, index) => (
                      <TourOverviewItem
                        key={index}
                        data={item.data}
                        label={item.label}
                        icon={item.icon}
                      />
                    ))}
                  </ul>
                </Card>
              )}

              {tour.highlights && (
                <div>
                  <Heading>Tour Highlights</Heading>
                  <ListTable items={tour.highlights} />
                </div>
              )}
            </div>
            {tour.body && <MDXContent code={tour.body} />}

            <div className="grid lg:grid-cols-2 gap-4 mb-10">
              <div>
                {tour.overs && (
                  <Tabs defaultValue="overview" className="w-full mt-10">
                    <TabsList>
                      {tour.overs && (
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                      )}
                      {tour.inclusions && (
                        <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                      )}
                      {tour.exclusions && (
                        <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
                      )}
                      {tour.meals && (
                        <TabsTrigger value="accomodation">
                          Accomodation
                        </TabsTrigger>
                      )}
                    </TabsList>

                    {tour.overs && (
                      <TabsContent value="overview">
                        {tour.overs && (
                          <TouroversList items={tour.overs as ItemsProps[]} />
                        )}
                      </TabsContent>
                    )}

                    {tour.inclusions && (
                      <TabsContent value="inclusions">
                        {tour.inclusions && (
                          <ListTable items={tour.inclusions} />
                        )}
                      </TabsContent>
                    )}
                    {tour.exclusions && (
                      <TabsContent value="exclusions">
                        {tour.exclusions && (
                          <ListTable items={tour.exclusions} />
                        )}
                      </TabsContent>
                    )}
                    {tour.meals && (
                      <TabsContent value="accomodation">
                        {tour.meals && (
                          <TouraccoList
                            meals={tour.meals}
                            accommodation={tour.accommodation}
                            refreshments={tour.refreshments}
                          />
                        )}
                      </TabsContent>
                    )}
                  </Tabs>
                )}
              </div>
              <div className="mt-10">
                {tour.faq ? <FAQ faq={tour.faq} /> : null}
              </div>
            </div>
            {/* {tour.galleryimages && (
              <Gallery galleryImages={tour.galleryimages} />
            )} */}

            {Array.isArray(tour.gallery) && tour.gallery.length > 0 && (
              <SwipeGallery
                galleryID={`gallery-${tour.slug}`}
                images={tour.gallery}
              />
            )}

            <Separator className="mt-10" />
            <Heading className="mt-10">Enquire about this tour.</Heading>
            <EnquiryForm title={tour.title} />

            <div className="my-12">
              <h6 className="py-8 text-destructive fw-light text-center">
                * Our Itineraries are quite unique hence we prefer not to put it
                up on the site. Please write in to us for the detailed itinerary
                and cost.
              </h6>
              <Separator />
            </div>
          </article>
        </Container>
        {tour.othertours ? (
          <Othertours tourtype={tour.tourtype} tours={relatedTours} />
        ) : null}
      </section>
    </>
  );
}
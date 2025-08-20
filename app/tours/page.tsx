import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HeroPage from "@/components/page-sections/hero-page";
import TourCard from "@/components/tours/tours-list/tour-card";
import StaggeredList from "@/components/styledcomps/staggered-list";
import StaggeredListItem from "@/components/styledcomps/staggered-list-item";
import { Heading } from "@/components/styledcomps/heading";
import { Tours, tours } from "#site/content";
import { Container } from "@/components/styledcomps/container";
import { BASE_PATH, SITE_TITLE } from "@/lib/constants";
import { organizationSchema } from "@/lib/schemas";

// Generate metadata for the tours listing page
export const metadata = {
  title: "Tours | North by North East",
  description: "Explore our Northeast India tours - Adventure, Leisure, and Cultural experiences across Assam, Arunachal Pradesh, Meghalaya, Nagaland, and Sikkim",
  keywords: "Northeast India tours, adventure tours, cultural tours, leisure tours, Assam tours, Arunachal Pradesh tours, Meghalaya tours, Nagaland tours, Sikkim tours",
  openGraph: {
    title: "Northeast India Tours | North by North East",
    description: "Adventure, nature and culture tours across Northeast India",
    images: "/images/og-logo.png",
  },
};

export default async function TourHome(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const categoryVariants = ["active", "leisure", "culture"];

  const active = [
    "",
    "cycling",
    "trekking",
    "multi-activity",
    "motorcycle",
    "family",
  ];
  const leisure = ["", "comfort", "offbeat", "wildlife", "roadtrip"];
  const culture = ["", "arunachal", "assam", "nagaland"];

  const filteredTours: Tours[] = tours
    .filter((tour) => tour.category !== "departures")
    .sort((a, b) => a.weight! - b.weight!)
    .filter((tour) => !tour.draft); 

  // Safely handle searchParams which can be string | string[] | undefined
  const selectedCategory = Array.isArray(searchParams.category) 
    ? searchParams.category[0] 
    : searchParams.category || "active";
  const selectedTag = Array.isArray(searchParams.tag) 
    ? searchParams.tag[0] 
    : searchParams.tag;

  const filterByTag = (filteredData: Tours[]) => {
    if (!selectedTag) {
      return filteredData;
    }
    const filteredTours = filteredData.filter(
      (tour: Tours) => tour.tags?.indexOf(`${selectedTag}`) !== -1
    );
    return filteredTours;
  };
  
  const filterByCategory = (filteredData: Tours[]) => {
    if (!selectedCategory) {
      return filteredData;
    }
    const filteredTours = filteredData.filter(
      (tour: Tours) => tour.category === selectedCategory
    );
    return filteredTours;
  };
  
  let filteredData = filterByTag(filteredTours);
  filteredData = filterByCategory(filteredData);

  // Create comprehensive schema for tours listing page
  const toursListingSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Northeast India Tours",
    description: "Adventure, nature and culture tours across Northeast India",
    url: `${BASE_PATH}/tours`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_PATH
        },
        {
          "@type": "ListItem", 
          position: 2,
          name: "Tours",
          item: `${BASE_PATH}/tours`
        }
      ]
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Northeast India Tour Packages",
      description: "Complete list of tour packages for Northeast India",
      numberOfItems: filteredData.length,
      itemListElement: filteredData.map((tour, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristTrip",
          name: tour.title,
          description: tour.subtitle,
          url: `${BASE_PATH}/tours/${tour.slug}`,
          image: tour.bg_image ? `${BASE_PATH}${tour.bg_image}` : `${BASE_PATH}/images/og-logo.png`,
          duration: tour.days,
          touristType: tour.cat,
          category: tour.category,
          provider: {
            "@type": "TravelAgency",
            name: SITE_TITLE,
            url: BASE_PATH
          }
        }
      }))
    },
    // Add filter categories as structured data
    about: [
      {
        "@type": "Thing",
        name: "Adventure Tours",
        description: "Active adventure tours including cycling, trekking, multi-activity, motorcycle, and family tours"
      },
      {
        "@type": "Thing", 
        name: "Leisure Tours",
        description: "Comfortable leisure tours including comfort, offbeat, wildlife, and road trip experiences"
      },
      {
        "@type": "Thing",
        name: "Cultural Tours", 
        description: "Cultural immersion tours across Arunachal Pradesh, Assam, and Nagaland"
      }
    ],
    provider: organizationSchema
  };

  // Add filter-specific schema when category is selected
  const getFilteredSchema = () => {
    if (selectedCategory && selectedCategory !== "active") {
      const categoryName = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${categoryName} Tours - Northeast India`,
        description: `${categoryName} tours across Northeast India`,
        url: `${BASE_PATH}/tours?category=${selectedCategory}`,
        mainEntity: {
          "@type": "ItemList",
          name: `${categoryName} Tour Packages`,
          numberOfItems: filteredData.length,
          itemListElement: filteredData.map((tour, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "TouristTrip",
              name: tour.title,
              description: tour.subtitle,
              url: `${BASE_PATH}/tours/${tour.slug}`,
              category: selectedCategory
            }
          }))
        }
      };
    }
    return null;
  };

  const filterSchema = getFilteredSchema();
  const combinedSchemas = filterSchema ? [toursListingSchema, filterSchema] : [toursListingSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchemas) }}
      />
      
      <HeroPage /> 
      <Container className="mb-5 px-5 md:px-10 lg:px-20" width="marginy">
        <Heading size="xl" variant="sectiontitle">
          Tours
        </Heading>
        <div>
          <div className=" text-center">
            {categoryVariants.map((item, index) => (
              <Link
                key={index}
                href={`?category=${item}&tag=`}
                scroll={false}
                className="mr-3"
                title={`${item.charAt(0).toUpperCase() + item.slice(1)} tours in Northeast India`}
              >
                <Button className="capitalize">{item}</Button>
              </Link>
            ))}
          </div>

          <RadioGroup
            defaultValue="option-one"
            className="mt-5 flex-col justify-center"
          >
            <div
              className={
                `${selectedCategory}` === "active"
                  ? "md:flex justify-center"
                  : "hidden"
              }
            >
              {active.map((item, index) => (
                <Link
                  key={index}
                  href={`?category=${selectedCategory}&tag=${item}`}
                  scroll={false}
                  className="mx-2"
                  title={item ? `${item} tours` : "All active tours"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={item} />
                    <Label htmlFor={item} className="capitalize">
                      {item || "All"}
                    </Label>
                  </div>
                </Link>
              ))}
            </div>

            <div
              className={
                `${selectedCategory}` === "leisure"
                  ? "md:flex justify-center"
                  : "hidden"
              }
            >
              {leisure.map((item, index) => (
                <Link
                  key={index}
                  href={`?category=${selectedCategory}&tag=${item}`}
                  scroll={false}
                  className="mx-2"
                  title={item ? `${item} tours` : "All leisure tours"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={item} />
                    <Label htmlFor={item} className="capitalize">
                      {item || "All"}
                    </Label>
                  </div>
                </Link>
              ))}
            </div>

            <div
              className={
                `${selectedCategory}` === "culture"
                  ? "md:flex justify-center"
                  : "hidden"
              }
            >
              {culture.map((item, index) => (
                <Link
                  key={index}
                  href={`?category=${selectedCategory}&tag=${item}`}
                  scroll={false}
                  className="mx-2"
                  title={item ? `${item} cultural tours` : "All cultural tours"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={item} id={item} />
                    <Label htmlFor={item} className="capitalize">
                      {item || "All"}
                    </Label>
                  </div>
                </Link>
              ))}
            </div>
          </RadioGroup>
        </div>

        <section className="mx-auto mt-20">
          <StaggeredList>
            {filteredData.map((tour: Tours, index) => (
              <StaggeredListItem key={index}>
                <TourCard
                  slugAsParams={tour.slugAsParams}
                  draft={tour.draft}
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
              </StaggeredListItem>
            ))}
          </StaggeredList>
        </section>
      </Container>
    </>
  );
}
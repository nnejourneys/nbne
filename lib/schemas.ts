// lib/schemas.ts

import { BASE_PATH, SITE_TITLE, SITE_DESC } from "@/lib/constants";
import ContactData from "@/data/contact.json"; // Adjust path as needed
import CompanyData from "@/data/footer.json"; // Add your company data file

// Helper function to find contact info by type
const getContactInfo = (type: string) => {
  return ContactData.contact.find(item => 
    item.title.toLowerCase().includes(type.toLowerCase())
  );
};

// Helper function to get phone number
const getPhoneNumber = () => {
  const phone = getContactInfo('phone');
  return phone ? phone.name : "+91 9150 033 886";
};

// Helper function to get email
const getEmail = () => {
  const email = getContactInfo('email');
  return email ? email.name : "nnejourneys@gmail.com";
};

// Helper function to get address
// const getAddress = () => {
//   const address = getContactInfo('address');
//   return address ? address.name : "Mansiri House, Deorigaon, Tezpur, Assam, 784001";
// };

// Helper function to get social media links
const getSocialLinks = () => {
  return CompanyData.social.map(social => social.link);
};

// Organization/TravelAgency Schema for main site
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_TITLE,
  description: CompanyData.content,
  url: BASE_PATH,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_PATH}${CompanyData.img}`,
    width: 800,
    height: 600
  },
  image: `${BASE_PATH}/images/og-logo.png`,
  sameAs: getSocialLinks(),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: getPhoneNumber(),
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "Worldwide" // Guests from anywhere
    },
    {
      "@type": "ContactPoint", 
      email: getEmail(),
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
      areaServed: "Worldwide"
    }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mansiri House, Deorigaon",
    addressLocality: "Tezpur",
    addressRegion: "Assam",
    postalCode: "784001",
    addressCountry: "IN"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog", 
    name: "Northeast India Tours",
    description: "Adventure, nature and culture tours across Northeast India",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "TouristTrip",
          name: "Adventure Tours",
          description: "Activity-based tours focusing on adventure experiences"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "TouristTrip", 
          name: "Cultural Tours",
          description: "Tours focusing on people, culture and environment of Northeast India"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "TouristTrip",
          name: "Nature Tours", 
          description: "Nature-focused tours across the pristine Northeast region"
        }
      }
    ]
  },
  // Areas where tours are conducted (Northeast India)
  areaServed: [
    {
      "@type": "State",
      name: "Assam",
      containedInPlace: {
        "@type": "Country",
        name: "India"
      }
    },
    {
      "@type": "State", 
      name: "Arunachal Pradesh",
      containedInPlace: {
        "@type": "Country",
        name: "India"
      }
    },
    {
      "@type": "State",
      name: "Meghalaya",
      containedInPlace: {
        "@type": "Country",
        name: "India"
      }
    },
    {
      "@type": "State",
      name: "Nagaland",
      containedInPlace: {
        "@type": "Country",
        name: "India"
      }
    },
    {
      "@type": "State",
      name: "Sikkim",
      containedInPlace: {
        "@type": "Country",
        name: "India"
      }
    }
  ],
  knowsAbout: [
    "Northeast India",
    "Adventure Tourism",
    "Cultural Tourism", 
    "Nature Tourism",
    "Assam",
    "Arunachal Pradesh",
    "Meghalaya",
    "Nagaland", 
    "Sikkim"
  ]
};

// Alternative approach using direct data access:
export const organizationSchemaExplicit = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_TITLE,
  description: SITE_DESC,
  url: BASE_PATH,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_PATH}/images/logo.png`,
    width: 800,
    height: 600
  },
  image: `${BASE_PATH}/images/og-logo.png`,
  sameAs: [
    // Add social media when available
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: ContactData.contact[0]?.name || "+91 9150 033 886", // ✅ Phone
    email: ContactData.contact[1]?.name || "nnejourneys@gmail.com", // ✅ Email
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
    areaServed: "IN"
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mansiri House, Deorigaon",
    addressLocality: "Tezpur", 
    addressRegion: "Assam",
    postalCode: "784001",
    addressCountry: "IN"
  }
};

// If you have company data in a separate file:
// export const createOrganizationSchema = (companyData: any) => ({
//   "@context": "https://schema.org",
//   "@type": "TravelAgency",
//   name: companyData.name || SITE_TITLE,
//   description: companyData.description || SITE_DESC,
//   // ... rest of schema using companyData
// });

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_TITLE,
  url: BASE_PATH,
  description: SITE_DESC,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_PATH}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  publisher: {
    "@type": "Organization",
    name: SITE_TITLE,
    logo: {
      "@type": "ImageObject", 
      url: `${BASE_PATH}/images/logo.png`
    }
  }
};

// Replace your existing generateTourSchema function with this:

// Enhanced Tour Schema Generator (for individual tour pages)
export const generateTourSchema = (tour: {
  title?: string;
  subtitle?: string;
  slug?: string;
  date?: string;
  days?: string;
  cat?: string;
  touricon?: string;
  image?: string;
  keywords?: string;
  tourtype?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  overview?: Array<{label: string; data: string; icon?: string}>;
}) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: tour.title || "Unnamed Tour",
  description: tour.subtitle || tour.title || "Northeast India Tour",
  url: `${BASE_PATH}/tours/${tour.slug || ''}`,
  image: tour.image ? `${BASE_PATH}${tour.image}` : (tour.touricon ? `${BASE_PATH}/images/tours/${tour.touricon}` : `${BASE_PATH}/images/og-logo.png`),
  duration: tour.days || "Multiple days",
  touristType: tour.cat || "Adventure",
  category: tour.tourtype,
  keywords: tour.keywords,
  provider: {
    "@type": "TravelAgency",
    name: SITE_TITLE,
    url: BASE_PATH,
    description: "Specialists in Northeast India tours"
  },
  dateCreated: tour.date || new Date().toISOString(),
  datePublished: tour.date || new Date().toISOString(),
  itinerary: tour.highlights ? {
    "@type": "ItemList",
    name: "Tour Highlights",
    itemListElement: tour.highlights.map((highlight, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: highlight
    }))
  } : undefined,
  includesObject: tour.inclusions ? tour.inclusions.map(inclusion => ({
    "@type": "Thing",
    name: inclusion
  })) : undefined,
  offers: {
    "@type": "Offer",
    description: "Contact us for detailed itinerary and pricing",
    seller: {
      "@type": "TravelAgency", 
      name: SITE_TITLE
    },
    availability: "https://schema.org/InStock",
    validFrom: tour.date || new Date().toISOString()
  },
  geo: {
    "@type": "Place",
    name: "Northeast India",
    containedInPlace: {
      "@type": "Country",
      name: "India"
    }
  },
  audience: {
    "@type": "Audience",
    audienceType: "Adventure and culture travelers",
    geographicArea: "Worldwide"
  }
});

// Blog Post Schema Generator (for individual posts)
export const generatePostSchema = (post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  url: `${BASE_PATH}/posts/${post.slug}`,
  datePublished: post.date,
  dateModified: post.date,
  author: {
    "@type": "Person",
    name: post.author || "Roheen Browne",
  },
  publisher: {
    "@type": "Organization",
    name: SITE_TITLE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_PATH}/images/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_PATH}/posts/${post.slug}`,
  },
});

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});


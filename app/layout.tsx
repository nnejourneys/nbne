import "./globals.css";
import { Montserrat, Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Menu from "@/components/layout/navbar/menu";
import Footer from "@/components/layout/footer/footer";
import {
  BASE_PATH,
  SITE_TITLE,
  SITE_DESC,
  SITE_KEYWORDS,
} from "@/lib/constants";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { organizationSchema, websiteSchema } from "@/lib/schemas";
import { GoogleTagManager } from '@next/third-parties/google'

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"], // Reduce font weights to decrease bundle size
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const open_sans = Open_Sans({
  weight: ["400", "500", "600", "700"], // Reduce font weights to decrease bundle size
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-open_sans",
  display: "swap",
  preload: true,
});

export const metadata = {
  icons: {
    icon:  `${BASE_PATH}/images/logo.png`,
  },
  title: `Home | ${SITE_TITLE}`,
  description: `${SITE_DESC}`,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: `${SITE_KEYWORDS}`,
  authors: [{ name: "Roheen Browne" }],
  creator: "Roheen Browne",
  publisher: "Roheen Browne",
  metadataBase: new URL(`${BASE_PATH}`),
  alternates: {
    canonical: "/",
  },
  other: {
    // Critical resource hints to reduce network chain
    'preconnect': 'https://pub-3d943afeed9643318d31712e02ebf613.r2.dev',
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE}`,
    description: `${SITE_DESC}`,
    siteId: "1467726470533754880",
    creator: "@rbrowne",
    creatorId: "1467726470533754880",
    images: `${BASE_PATH}/images/og-logo.png`,
  },
  openGraph: {
    title: `${SITE_TITLE}`,
    description: `${SITE_DESC}`,
    url: `${BASE_PATH}`,
    siteName: `${SITE_TITLE}`,
    images: [
      {
        url: `${BASE_PATH}/images/og-logo.png`,
        width: 800,
        height: 600,
      },
      {
        url: `${BASE_PATH}/images/og-logo.png`,
        width: 1800,
        height: 1600,
        alt: "North by North East",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${open_sans.variable}`}
    >
      <head>
        {/* Fonts are automatically optimized by Next.js */}
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://pub-3d943afeed9643318d31712e02ebf613.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-3d943afeed9643318d31712e02ebf613.r2.dev" />
        {/* Resource hints for better performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Menu />
            {children}
            <Toaster />
            <Footer />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([organizationSchema, websiteSchema]),
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js')
                        .then(function(registration) {
                          console.log('SW registered: ', registration);
                        })
                        .catch(function(registrationError) {
                          console.log('SW registration failed: ', registrationError);
                        });
                    });
                  }
                `,
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

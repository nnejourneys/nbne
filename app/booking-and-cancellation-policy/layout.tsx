import HeroPage from "@/components/page-sections/hero-page";

export const metadata = {
  title: "North by North East | Booking and Cancellation Policy",
};

export default function PageLayout({ children }: { children: React.ReactNode}) {
  return ( 
      <main>
      <HeroPage/>
        {children}
      </main> 
    );
}

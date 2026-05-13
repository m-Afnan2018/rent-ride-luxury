import AboutHero from "@/components/about/hero/AboutHero";
import Purpose from "@/components/about/purpose/Purpose";
import Experts from "@/components/about/experts/Experts";
import Process from "@/components/home/process/Process";
import FAQ from "@/components/home/faq/FAQ";

export const metadata = {
  title: 'About Us | Rent Ride Luxury',
  description: 'Learn about our mission, vision, and the expert team behind our premium luxury car rental services.',
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Purpose />
      <Experts />
      <Process />
      <FAQ />
    </main>
  );
}

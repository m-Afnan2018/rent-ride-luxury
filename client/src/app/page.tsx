import Hero from "@/components/home/hero/hero";
import Experience from "@/components/home/experience/Experience";
import DriveSelection from "@/components/home/drive-selection/DriveSelection";
import Collection from "@/components/home/collection/Collection";
import Brands from "@/components/home/brands/Brands";
import Locations from "@/components/home/locations/Locations";
import Process from "@/components/home/process/Process";
import Promo from "@/components/home/promo/Promo";
import Testimonials from "@/components/home/testimonials/Testimonials";
import FAQ from "@/components/home/faq/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Collection />
      <DriveSelection />
      <Brands />
      <Locations />
      <Process />
      <Promo />
      <Testimonials />
      <FAQ />
    </main>
  );
}

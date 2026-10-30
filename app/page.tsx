import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import { site } from "@/data";

/*
  One landing page with a section for each page of the Haulix website (no blog). Get a Quote is merged
  into the contact section.
  The ids match the header and footer links in site.json ("#about" → id="about"); scroll-mt-20 keeps
  each section clear of the fixed header when a link scrolls to it.
*/
export default function HomePage() {
  return (
    <>
      <div id="home">
        <HeroSection data={site.hero} />
      </div>
      <div id="about" className="scroll-mt-20">
        <AboutSection data={site.aboutSection} />
      </div>
      <div id="services" className="scroll-mt-20">
        <ServicesSection data={site.servicesSection} />
      </div>
      <div id="team" className="scroll-mt-20">
        <TeamSection data={site.teamSection} />
      </div>
      <div id="gallery" className="scroll-mt-20">
        <GallerySection data={site.gallerySection} />
      </div>
      <div id="testimonials" className="scroll-mt-20">
        <TestimonialsSection data={site.testimonialsSection} />
      </div>
      <div id="contact" className="scroll-mt-20">
        <ContactSection data={site.contactSection} />
      </div>
    </>
  );
}

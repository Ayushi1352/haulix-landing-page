import siteData from "./site.json";

// ── Root Schema Types ──
export type HaulixSchema = typeof siteData.Haulix;
export type HaulixSections = HaulixSchema["sections"];

// ── Universal SectionProps Interface (ai-builder Standard) ──
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// ── Strongly Typed Section Variant Data Models ──
export type HaulixHeaderData = HaulixSections["Header"]["variants"]["HaulixHeader1"];
export type HaulixHeroData = HaulixSections["Hero"]["variants"]["HaulixHero1"];
export type HaulixAboutData = HaulixSections["About"]["variants"]["HaulixAbout1"];
export type HaulixServicesData = HaulixSections["Services"]["variants"]["HaulixServices1"];
export type HaulixTeamData = HaulixSections["Team"]["variants"]["HaulixTeam1"];
export type HaulixGalleryData = HaulixSections["Gallery"]["variants"]["HaulixGallery1"];
export type HaulixTestimonialsData = HaulixSections["Testimonials"]["variants"]["HaulixTestimonials1"];
export type HaulixContactData = HaulixSections["Contact"]["variants"]["HaulixContact1"];
export type HaulixEnquiryFormData = HaulixSections["EnquiryForm"]["variants"]["HaulixEnquiryForm1"];
export type HaulixFooterData = HaulixSections["Footer"]["variants"]["HaulixFooter1"];

// ── Item-level types inferred from site.json ──
export type HaulixLink = HaulixHeaderData["navigation"][number];
export type HaulixService = HaulixServicesData["cards"][number];
export type HaulixGalleryImage = HaulixGalleryData["images"][number];
export type HaulixTestimonial = HaulixTestimonialsData["items"][number];

// ── Site Map for the single-page Haulix landing page ──
const sec = siteData.Haulix.sections;

const site = {
  theme: siteData.Haulix.theme,
  navbar: sec.Header.variants.HaulixHeader1,
  hero: sec.Hero.variants.HaulixHero1,
  aboutSection: sec.About.variants.HaulixAbout1,
  servicesSection: sec.Services.variants.HaulixServices1,
  teamSection: sec.Team.variants.HaulixTeam1,
  gallerySection: sec.Gallery.variants.HaulixGallery1,
  testimonialsSection: sec.Testimonials.variants.HaulixTestimonials1,
  contactSection: sec.Contact.variants.HaulixContact1,
  enquiryFormSection: sec.EnquiryForm.variants.HaulixEnquiryForm1,
  footer: sec.Footer.variants.HaulixFooter1,
};

export { site };
export default siteData;

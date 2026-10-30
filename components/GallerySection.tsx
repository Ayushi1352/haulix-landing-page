import { site, type HaulixGalleryData, type SectionProps } from "@/data";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";

export default function GallerySection({ data: gallery = site.gallerySection, className = "" }: SectionProps<HaulixGalleryData>) {
  return (
    <section className={`relative overflow-hidden bg-deep py-(--section-gap) ${className}`}>
      {/* faint watermark word behind the heading */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-display text-[6rem] font-extrabold uppercase leading-none text-white/[0.03] sm:text-[10rem]"
      >
        {gallery.titleAccent}
      </span>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          tone="light"
          label={gallery.label}
          titleTop={gallery.titleTop}
          titleAccent={gallery.titleAccent}
          description={gallery.description}
        />
        <div className="mt-12">
          <GalleryGrid data={gallery} />
        </div>
      </div>
    </section>
  );
}

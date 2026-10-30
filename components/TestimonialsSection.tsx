import { site, type HaulixTestimonialsData, type SectionProps } from "@/data";
import Icon from "@/components/Icon";
import TestimonialSlider from "@/components/TestimonialSlider";
import SectionHeading from "@/components/SectionHeading";

export default function TestimonialsSection({ data = site.testimonialsSection, className = "" }: SectionProps<HaulixTestimonialsData>) {
  return (
    <section className={`bg-page py-(--section-gap) ${className}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} description={data.description} />
          {/* client initials, the client count and the star rating */}
          <div data-reveal className="mt-8 flex items-center gap-4">
            <span className="flex -space-x-3">
              {data.items.slice(0, 4).map((item, index) => (
                <span
                  key={item.name}
                  aria-hidden="true"
                  className={`grid size-12 place-items-center rounded-full border-[3px] border-page font-display font-bold text-white ${
                    index % 2 === 0 ? "bg-brand" : "bg-ink"
                  }`}
                >
                  {item.name[0]}
                </span>
              ))}
            </span>
            <span>
              <span className="block font-display text-2xl font-extrabold text-ink">{data.badge.value}</span>
              <span className="text-sm text-slate">{data.badge.label}</span>
            </span>
          </div>
          <p data-reveal className="mt-5 flex gap-1 text-brand" role="img" aria-label={data.ratingLabel}>
            {Array.from({ length: 5 }, (_, n) => (
              <Icon key={n} name="star" className="size-5" />
            ))}
          </p>
        </div>

        <div data-reveal className="relative overflow-hidden rounded-[2.5rem] rounded-tl-[6rem] bg-ink p-6 sm:p-12">
          <div aria-hidden="true" className="absolute -right-20 -top-20 size-72 rounded-full bg-brand/30 blur-3xl" />
          <TestimonialSlider data={data} />
        </div>
      </div>
    </section>
  );
}

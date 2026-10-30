import Image from "next/image";
import { site, type HaulixServicesData, type SectionProps } from "@/data";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

// the call-to-action card offers the phone number from the contact section
const phone = site.contactSection.info.find((item) => item.href.startsWith("tel:"));

/** Heading and call-to-action card that stay in view on desktop, beside the list of services */
export default function ServicesSection({ data: services = site.servicesSection, className = "" }: SectionProps<HaulixServicesData>) {
  const { cta } = services;

  return (
    <section className={`bg-mist py-(--section-gap) ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading label={services.label} titleTop={services.titleTop} titleAccent={services.titleAccent} description={services.description} />

          <div data-reveal className="relative mt-10 overflow-hidden rounded-3xl bg-brand p-7 text-white sm:p-8">
            <Icon name="truck-fast" className="absolute -right-6 -top-6 size-40 text-white/10" strokeWidth={1.1} />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{cta.label}</p>
            <h3 className="relative mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl">
              {cta.titleTop} {cta.titleAccent}
            </h3>
            <p className="relative mt-3 text-sm leading-relaxed text-white/80">{cta.description}</p>
            <div className="relative mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={cta.button.href}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-sm font-bold text-brand transition-colors hover:bg-ink hover:text-white"
              >
                {cta.button.label}
                <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
              </a>
              {phone && (
                <a href={phone.href} className="text-sm text-white/80 transition-colors hover:text-white">
                  {cta.phoneLabel} <span className="font-display font-bold text-white underline underline-offset-4">{phone.lines[0]}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <ol className="grid gap-3">
          {services.cards.map((card, index) => (
            <li
              key={card.title}
              data-reveal
              data-reveal-delay={(index % 3) * 70}
              className="group relative flex items-center gap-4 rounded-3xl bg-page p-3 pr-4 transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-22px_rgba(5,46,54,0.4)] sm:gap-6 sm:pr-6"
            >
              {/* on phones the image stretches to the height of the text beside it */}
              <div className="relative w-20 shrink-0 self-stretch overflow-hidden rounded-2xl sm:aspect-square sm:w-28 sm:self-center">
                <Image
                  quality={90}
                  src={card.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xs font-bold text-brand">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink sm:text-xl">{card.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate max-sm:line-clamp-2">{card.text}</p>
              </div>
              {/* the whole row is clickable through the stretched link */}
              <a
                href="#contact"
                aria-label={`${services.cardButton}: ${card.title}`}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-[background-color,border-color,color,rotate] duration-300 group-hover:-rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white after:absolute after:inset-0 after:rounded-3xl sm:size-11"
              >
                <Icon name="arrow-right" className="size-4.5" strokeWidth={2.2} />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

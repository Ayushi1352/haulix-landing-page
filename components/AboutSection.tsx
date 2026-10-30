import Image from "next/image";
import { site, type HaulixAboutData, type SectionProps } from "@/data";
import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

/** The website's About Us page: company story, statistics and why choose Haulix */
export default function AboutSection({ data: about = site.aboutSection, className = "" }: SectionProps<HaulixAboutData>) {
  const { why } = about;

  return (
    <section className={`bg-page py-(--section-gap) ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* on desktop the photo column stretches to the height of the text column, so both start and end level */}
        <div className="grid gap-14 lg:grid-cols-[32rem_1fr] lg:gap-16">
          <div className="lg:order-2">
            <SectionHeading label={about.label} titleTop={about.titleTop} titleAccent={about.titleAccent} />
            <div data-reveal className="mt-6 space-y-4 leading-relaxed text-slate">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul data-reveal className="mt-6 divide-y divide-line border-y border-line">
              {about.features.map((feature) => (
                <li key={feature.title} className="group flex items-center gap-4 py-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/8 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={feature.icon} className="size-5.5" strokeWidth={1.7} />
                  </span>
                  <span className="font-display font-bold text-ink">{feature.title}</span>
                  <span className="ml-auto text-right text-sm text-subtle">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* one tall rounded photo with a round inset photo and the experience tag */}
          <div data-reveal className="relative mx-auto w-full max-w-lg lg:order-1">
            <div className="relative aspect-[5/5.6] overflow-hidden rounded-[2.5rem] rounded-bl-[7rem] lg:aspect-auto lg:h-full">
              <Image quality={90} src={about.primaryImage} alt={about.primaryImageAlt} fill sizes="(min-width: 1024px) 500px, 92vw" className="object-cover" />
            </div>
            <div className="absolute -right-2 -top-6 size-36 overflow-hidden rounded-full border-[6px] border-page shadow-[0_18px_40px_-12px_rgba(5,46,54,0.45)] sm:-right-6 sm:size-44">
              <Image quality={90} src={about.secondaryImage} alt={about.secondaryImageAlt} fill sizes="180px" className="object-cover" />
            </div>
            <div className="absolute bottom-6 right-6 rounded-3xl bg-page/95 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(5,46,54,0.5)] backdrop-blur">
              <p className="flex items-center gap-2 font-display text-4xl font-extrabold tracking-[-0.03em] text-brand">
                <Icon name={about.badge.icon} className="size-8" strokeWidth={1.6} />
                {about.badge.value}
              </p>
              <p className="mt-1 max-w-36 text-xs font-semibold leading-snug text-ink">{about.badge.label}</p>
            </div>
          </div>
        </div>

        {/* company statistics */}
        <dl className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {about.stats.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal
              data-reveal-delay={index * 90}
              className="group relative overflow-hidden rounded-3xl bg-mist p-5 transition-colors duration-500 hover:bg-ink sm:p-7"
            >
              <Icon
                name={stat.icon}
                className="absolute -bottom-3 -right-3 size-24 text-ink/5 transition-colors duration-500 group-hover:text-white/10"
                strokeWidth={1.2}
              />
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl font-extrabold tracking-[-0.03em] text-brand transition-colors duration-500 group-hover:text-brand-light sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dd aria-hidden="true" className="mt-2 text-sm font-medium text-slate transition-colors duration-500 group-hover:text-white/80">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Why choose Haulix: a photo tile with the heading, beside four reason tiles */}
        <div className="mt-20 grid gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          <div className="relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl p-7 sm:p-10 lg:col-span-2 lg:row-span-2">
            <Image quality={90} src={why.image} alt={why.imageAlt} fill sizes="(min-width: 1024px) 620px, 100vw" className="-z-20 object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/80 to-ink/20" />
            <SectionHeading tone="light" label={why.label} titleTop={why.titleTop} titleAccent={why.titleAccent} description={why.description} />
          </div>
          {why.items.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              data-reveal-delay={(index % 2) * 90}
              className={`group flex flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${
                index === 0 || index === 3 ? "bg-brand text-white" : "bg-mist text-ink"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid size-13 place-items-center rounded-2xl transition-[rotate] duration-300 group-hover:-rotate-6 ${
                    index === 0 || index === 3 ? "bg-white/15" : "bg-page text-brand shadow-sm"
                  }`}
                >
                  <Icon name={item.icon} className="size-6.5" strokeWidth={1.6} />
                </span>
                <span className={`font-display text-sm font-bold ${index === 0 || index === 3 ? "text-white/60" : "text-subtle"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-auto pt-8 font-display text-xl font-extrabold tracking-[-0.02em]">{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${index === 0 || index === 3 ? "text-white/80" : "text-slate"}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { site, type HaulixHeroData, type SectionProps } from "@/data";
import Icon from "@/components/Icon";

/** Plays once on load (CSS @starting-style), so the hero never waits for JavaScript */
const enter = "transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-7 starting:opacity-0";

// the ticker under the hero lists every service
const services = site.servicesSection.cards;

export default function HeroSection({ data: hero = site.hero, className = "" }: SectionProps<HaulixHeroData>) {
  return (
    <div className={className}>
      <section className="relative isolate overflow-hidden bg-ink pt-24">
        {/* faint route grid and a red glow behind the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_at_30%_40%,#000_30%,transparent_75%)]"
        />
        <div aria-hidden="true" className="absolute -right-40 top-10 -z-10 size-[36rem] rounded-full bg-brand/30 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-11 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-12 lg:px-8 lg:pt-8">
          {/* on desktop this text sets the height of the row, and the photo beside it stretches to match */}
          <div className={`min-w-0 ${enter}`}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-xs font-medium uppercase tracking-[0.2em] text-white/85 sm:text-sm">
              <span className="grid size-7 place-items-center rounded-full bg-brand text-white">
                <Icon name="truck-fast" className="size-4" strokeWidth={2} />
              </span>
              {hero.label}
            </p>
            {/* always exactly two lines: the size follows the screen width so "Our Commitment" never wraps */}
            <h1 className="mt-9 font-display text-[length:min(4.25rem,calc((100vw-2rem)/8.4))] font-extrabold leading-[1.18] tracking-[-0.04em] whitespace-nowrap text-white">
              <span className="block">{hero.titleTop}</span>
              <span className="relative block w-fit text-brand-light">
                {hero.titleAccent}
                <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-3 w-full text-brand">
                  <path d="M2 9C60 3 180 1 298 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <div className="mt-14">
              {/* the one call-to-action scrolls down to the contact section */}
              <a
                href={hero.button.href}
                className="group inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-7 pr-2 font-display font-bold text-white shadow-[0_14px_34px_-12px_rgba(133,18,16,0.9)] transition-colors hover:bg-white hover:text-ink"
              >
                {hero.button.label}
                <span className="grid size-10 place-items-center rounded-full bg-white text-brand transition-[rotate,background-color,color] duration-300 group-hover:-rotate-45 group-hover:bg-brand group-hover:text-white">
                  <Icon name="arrow-right" className="size-4.5" strokeWidth={2.4} />
                </span>
              </a>
            </div>
          </div>

          {/* framed photo with floating badges */}
          <div className={`relative mx-auto w-full max-w-xl delay-150 ${enter}`}>
            <div className="relative aspect-[5/4.4] overflow-hidden rounded-[2.5rem] rounded-tr-[7rem] ring-1 ring-white/15 lg:aspect-auto lg:h-full">
              <Image src={hero.image} alt={hero.imageAlt} fill preload quality={90} sizes="(min-width: 1024px) 560px, 92vw" className="object-cover object-[78%_center]" />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -left-3 top-10 flex items-center gap-3 rounded-2xl bg-page p-3 pr-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:-left-8">
              <span className="grid size-11 place-items-center rounded-xl bg-brand font-display text-lg font-extrabold text-white">{hero.badge.value}</span>
              <span className="max-w-28 text-xs font-semibold leading-snug text-ink">{hero.badge.label}</span>
            </div>
            <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl bg-brand p-3 pr-5 text-white shadow-[0_20px_50px_-15px_rgba(133,18,16,0.8)] sm:right-8">
              <span className="grid size-11 place-items-center rounded-xl bg-white/15">
                <Icon name={hero.reach.icon} className="size-6" strokeWidth={1.7} />
              </span>
              <span>
                <span className="block font-display text-xl font-extrabold leading-none">{hero.reach.value}</span>
                <span className="text-xs text-white/85">{hero.reach.label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* the three promises along the bottom of the hero */}
        <ul className="mx-auto grid max-w-7xl border-t border-white/10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {hero.features.map((feature, index) => (
            <li
              key={feature.title}
              className={`group flex items-center gap-4 py-6 md:px-6 md:py-8 ${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : "md:pl-0"}`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 text-brand-light transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <Icon name={feature.icon} className="size-6" strokeWidth={1.7} />
              </span>
              <span>
                <span className="block font-display font-bold text-white">{feature.title}</span>
                <span className="text-sm text-white/60">{feature.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* service ticker; the list is doubled so the loop has no gap, and the copy is hidden from screen readers */}
      <div className="relative -mt-px overflow-hidden bg-brand py-4 text-white">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {services.map((service) => (
                <li key={service.title} className="flex items-center gap-3 px-7 font-display text-lg font-bold whitespace-nowrap">
                  <Icon name={service.icon} className="size-6 text-white/70" strokeWidth={1.6} />
                  {service.title}
                  <span aria-hidden="true" className="ml-7 size-2 rotate-45 bg-white/50" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

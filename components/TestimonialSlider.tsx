"use client";

import { useEffect, useState } from "react";
import { site, type HaulixTestimonialsData, type SectionProps } from "@/data";
import Icon from "@/components/Icon";

const AUTOPLAY_MS = 6000;

function Quote({ item, className }: { item: HaulixTestimonialsData["items"][number]; className: string }) {
  return (
    <blockquote className={className}>
      <p className="font-display text-lg font-medium leading-relaxed tracking-[-0.01em] text-white sm:text-2xl">{item.quote}</p>
      <footer className="mt-6 flex items-center gap-4 sm:mt-8">
        <span className="h-0.5 w-10 shrink-0 bg-brand-light max-sm:hidden" aria-hidden="true" />
        <span>
          <span className="block font-display text-lg font-extrabold text-white">{item.name}</span>
          <span className="text-sm text-white/60">
            {item.role}, {item.company}
          </span>
        </span>
      </footer>
    </blockquote>
  );
}

/** One quote at a time on the dark card; moves on by itself and waits while the visitor hovers it */
export default function TestimonialSlider({ data = site.testimonialsSection }: SectionProps<HaulixTestimonialsData>) {
  const { items } = data;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = items[index];
  const go = (step: number) => setIndex((current) => (current + step + items.length) % items.length);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, items.length]);

  const arrow = "grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-brand hover:bg-brand";

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Icon name="quote" className="size-14 text-brand-light" />
      <div className="mt-6 grid" aria-live="polite">
        {/* every quote takes up the same cell unseen, so the card keeps the height of the longest one and the controls never jump */}
        {items.map((testimonial) => (
          <Quote key={testimonial.name} item={testimonial} className="invisible col-start-1 row-start-1" />
        ))}
        {/* keyed by slide, so each new quote fades in */}
        <Quote
          key={index}
          item={item}
          className="col-start-1 row-start-1 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-7 starting:opacity-0"
        />
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 sm:mt-10">
        <div className="mr-auto flex gap-2">
          {items.map((testimonial, n) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={data.showLabel.replace("{name}", testimonial.name)}
              aria-current={n === index}
              onClick={() => setIndex(n)}
              className={`h-1.5 rounded-full transition-all duration-500 ${n === index ? "w-8 bg-brand-light" : "w-3 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        {/* on phones the dots already show the position, and the row has no room for the count */}
        <span className="font-display text-sm font-bold whitespace-nowrap text-white/60 max-sm:hidden">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button type="button" aria-label={data.previousLabel} onClick={() => go(-1)} className={arrow}>
          <Icon name="chevron-left" className="size-5" strokeWidth={2.2} />
        </button>
        <button type="button" aria-label={data.nextLabel} onClick={() => go(1)} className={arrow}>
          <Icon name="chevron-right" className="size-5" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

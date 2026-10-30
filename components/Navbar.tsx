"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site, type HaulixHeaderData, type SectionProps } from "@/data";
import Icon from "@/components/Icon";

/** id of the landing page section a link points to ("#about" → "about") */
const sectionId = (href: string) => href.replace(/^#/, "");

/** Look of the header "Get a Quote" pill (red, turns teal on hover) */
const ctaClass =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-brand font-display text-sm font-bold text-white shadow-[0_10px_30px_-12px_rgba(133,18,16,0.7)] transition-colors hover:bg-ink";

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function Navbar({ data = site.navbar }: SectionProps<HaulixHeaderData>) {
  const { brand, navigation: links, cta, labels } = data;
  const [ids] = useState(() => links.map((link) => sectionId(link.href)));
  // the "Contact Us" button already leads to the contact section, so its link is left out of both menus
  const menuLinks = links.filter((link) => link.href !== cta.href);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto max-w-[1920px] px-3 pt-3 sm:px-4">
      {/* always a white floating pill, over the dark hero and the light sections alike */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 rounded-full bg-page pl-5 pr-2.5 shadow-[0_12px_40px_-16px_rgba(5,46,54,0.45)] ring-1 ring-line sm:pl-6">
        <Link href="/" onClick={goHome} aria-label={labels.home}>
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} preload sizes="200px" className="h-auto w-32 sm:w-36" />
        </Link>

        <nav aria-label={labels.mainNav} className="hidden items-center gap-0.5 lg:flex">
          {menuLinks.map((link) => {
            const current = sectionId(link.href) === active;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "location" : undefined}
                className={`rounded-full px-3.5 py-2 font-display text-[0.875rem] font-semibold transition-colors ${
                  current ? "bg-brand/8 text-brand" : "text-ink hover:text-brand"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={cta.href} className={`${ctaClass} px-5 py-3 max-sm:hidden`}>
            {cta.label}
            <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={labels.mobileNav}
        // when open it is a card that fills the screen below the header pill, so the page behind it does not show through
        className={`mx-auto mt-2 max-w-7xl overflow-y-auto rounded-3xl bg-page shadow-[0_20px_50px_-20px_rgba(5,46,54,0.5)] transition-[height,opacity] duration-500 lg:hidden ${
          open ? "h-[calc(100dvh-6.5rem)] opacity-100" : "pointer-events-none h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-5 py-4 sm:px-6">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-line py-3.5 font-display font-semibold transition-colors hover:text-brand ${
                  sectionId(link.href) === active ? "text-brand" : "text-ink/85"
                }`}
              >
                {link.label}
                <Icon name="chevron-right" className="size-4 text-brand" strokeWidth={2.2} />
              </a>
            </li>
          ))}
          <li className="pt-5 sm:hidden">
            <a href={cta.href} onClick={() => setOpen(false)} className={`${ctaClass} w-full px-7 py-3.5`}>
              {cta.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

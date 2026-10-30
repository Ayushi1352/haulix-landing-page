import Image from "next/image";
import { site, type HaulixFooterData, type SectionProps } from "@/data";
import Icon from "@/components/Icon";

// The footer shows the contact section's details
const { brand } = site.navbar;
const contactInfo = site.contactSection.info;

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer({ data: footer = site.footer }: SectionProps<HaulixFooterData>) {
  const copyright = footer.copyright.replace("{year}", String(await currentYear()));

  return (
    <footer className="relative overflow-hidden bg-night text-white/70">
      {/* oversized brand word behind the footer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none font-display text-[22vw] font-extrabold leading-none tracking-[-0.06em] text-white/[0.03] lg:text-[11rem]"
      >
        {brand.name}
      </span>

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8">
        {/* logo and tagline beside the social links */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Image src={footer.logo.src} alt={brand.name} width={footer.logo.width} height={footer.logo.height} sizes="200px" className="h-auto w-40" />
            <p className="mt-4 max-w-md text-sm leading-relaxed">{footer.tagline}</p>
          </div>
          <div className="flex gap-3">
            {footer.socials.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-11 place-items-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition-[background-color,translate] duration-300 hover:-translate-y-0.5 hover:bg-brand"
              >
                <Icon name={social.platform} className="size-4.5" strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-2 lg:gap-12">
          <nav aria-label={footer.quickLinksTitle}>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-light">{footer.quickLinksTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white transition-colors hover:text-brand-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-light">{footer.contactTitle}</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {contactInfo.map((item) => {
                const external = item.href.startsWith("http");
                const text = item.lines.join(" ");
                return (
                  <li key={item.title} className="flex min-w-0 items-start gap-3">
                    <Icon name={item.icon} className="mt-0.5 size-4 shrink-0 text-brand-light" />
                    {item.href ? (
                      <a
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="min-w-0 break-words transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {text}
                      </a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 rounded-full bg-white/5 px-6 py-4 text-center text-xs ring-1 ring-white/10 sm:flex-row sm:text-left">
          <p>{copyright}</p>
          <p className="font-display font-bold uppercase tracking-[0.3em] text-white">
            {footer.motto.map((word, index) => (
              <span key={word}>
                {index > 0 && <span className="text-brand-light"> • </span>}
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

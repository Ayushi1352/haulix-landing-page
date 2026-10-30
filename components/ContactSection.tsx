import { site, type HaulixContactData, type SectionProps } from "@/data";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

/** One split card: contact details on the dark side, the quote request form on the light side (the website's Contact Us and Get a Quote pages in one) */
export default function ContactSection({ data: contact = site.contactSection, className = "" }: SectionProps<HaulixContactData>) {
  return (
    <section className={`bg-mist py-(--section-gap) ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-page shadow-[0_30px_80px_-40px_rgba(5,46,54,0.5)] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative isolate overflow-hidden bg-ink p-7 sm:p-9 lg:p-10">
            <div aria-hidden="true" className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-brand/35 blur-3xl" />
            <SectionHeading tone="light" label={contact.label} titleTop={contact.titleTop} titleAccent={contact.titleAccent} description={contact.description} />

            <ul data-reveal className="mt-7 grid gap-x-4 gap-y-2 sm:grid-cols-2">
              {contact.info.map((item) => {
                const external = item.href.startsWith("http");
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-brand-light transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-[0.15em] text-white/50">{item.title}</span>
                      <span className="block break-words font-display text-sm font-semibold text-white">{item.lines.join(" ")}</span>
                    </span>
                  </>
                );
                const box = "flex items-center gap-3 rounded-2xl p-2 transition-colors";
                return (
                  <li key={item.title}>
                    {/* business hours have no link, so they show as plain text */}
                    {item.href ? (
                      <a
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className={`group ${box} hover:bg-white/5`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={box}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <ul data-reveal className="mt-6 grid gap-2.5 border-t border-white/10 pt-6">
              {contact.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Icon name="check" className="size-3" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* kept compact so the whole card fits on one screen; on desktop the message box takes up any spare height */}
          <div data-reveal className="flex flex-col p-7 sm:p-9 lg:p-10">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-brand/8 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-brand">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
              {contact.form.label}
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl tracking-[-0.03em] text-ink">{contact.form.title}</h3>
            <p className="mt-2 text-sm text-slate">{contact.form.description}</p>
            <EnquiryForm data={site.enquiryFormSection} />
          </div>
        </div>
      </div>
    </section>
  );
}

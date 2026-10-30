/** Section intro used across the page: pill label, bold title with a red highlight, optional text */
export default function SectionHeading({
  label,
  titleTop,
  titleAccent,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: {
  label: string;
  titleTop: string;
  titleAccent: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const center = align === "center";
  const light = tone === "light";

  return (
    <div data-reveal className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"} ${className}`}>
      <p
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.18em] ${
          light ? "bg-white/10 text-white" : "bg-brand/8 text-brand"
        }`}
      >
        <span className={`size-1.5 rounded-full ${light ? "bg-brand-light" : "bg-brand"}`} aria-hidden="true" />
        {label}
      </p>
      <h2
        className={`mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-4xl lg:text-[3rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {titleTop} <span className={light ? "text-brand-light" : "text-brand"}>{titleAccent}</span>
      </h2>
      {description && <p className={`mt-4 leading-relaxed ${light ? "text-white/70" : "text-slate"}`}>{description}</p>}
    </div>
  );
}

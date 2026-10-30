"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { site, type HaulixGalleryData, type SectionProps } from "@/data";
import Icon from "@/components/Icon";

function ViewerButton({ label, className, onClick, children }: { label: string; className: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-brand ${className}`}
    >
      {children}
    </button>
  );
}

/** Positions (in each group of 12) of the photos that span two columns on desktop */
const WIDE = [0, 5, 6, 11];

/** Photo grid (wide photos break the rhythm) that opens each photo in a full-screen viewer */
export default function GalleryGrid({ data = site.gallerySection }: SectionProps<HaulixGalleryData>) {
  const { images } = data;
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const show = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));
  const image = index === null ? null : images[index];

  return (
    <>
      {/* on desktop every 12 photos make 4 full rows, with one wide photo per row zig-zagging left and right */}
      <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:grid-cols-4">
        {images.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => show(i)}
            aria-label={data.openLabel.replace("{title}", item.alt)}
            data-reveal
            data-reveal-delay={(i % 4) * 80}
            className={`group relative cursor-zoom-in overflow-hidden rounded-2xl bg-panel ${WIDE.includes(i % 12) ? "lg:col-span-2" : ""}`}
          >
            <Image
              quality={90}
              src={item.src}
              alt=""
              fill
              sizes={WIDE.includes(i % 12) ? "(min-width: 1024px) 640px, 50vw" : "(min-width: 1024px) 320px, 50vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 flex items-end justify-between gap-3 bg-linear-to-t from-night/90 via-night/20 to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-5">
              <span className="font-display font-bold leading-snug text-white sm:text-lg">{item.alt}</span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Icon name="plus" className="size-4.5" strokeWidth={2.2} />
              </span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label={data.viewerLabel}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto h-[min(85dvh,900px)] w-[calc(100%-2rem)] max-w-5xl bg-transparent p-0 backdrop:bg-black/85 open:transition-[opacity,translate] open:duration-500 open:ease-[cubic-bezier(0.22,1,0.36,1)] open:starting:translate-y-5 open:starting:opacity-0"
      >
        {image && index !== null && (
          <figure className="relative flex h-full flex-col">
            <div className="relative flex-1">
              <Image quality={90} src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="pt-4 text-center font-display text-lg font-bold text-white">
              {image.alt}
              <span className="ml-3 font-sans text-xs font-normal text-white/60">
                {index + 1} / {images.length}
              </span>
            </figcaption>
            <ViewerButton label={data.closeLabel} className="right-2 top-2" onClick={() => dialog.current?.close()}>
              <Icon name="close" className="size-5" />
            </ViewerButton>
            <ViewerButton label={data.previousLabel} className="left-2 top-1/2 -translate-y-1/2" onClick={() => step(-1)}>
              <Icon name="chevron-left" className="size-5" strokeWidth={2.2} />
            </ViewerButton>
            <ViewerButton label={data.nextLabel} className="right-2 top-1/2 -translate-y-1/2" onClick={() => step(1)}>
              <Icon name="chevron-right" className="size-5" strokeWidth={2.2} />
            </ViewerButton>
          </figure>
        )}
      </dialog>
    </>
  );
}

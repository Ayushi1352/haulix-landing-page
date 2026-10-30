"use client";

import Image from "next/image";
import { useState } from "react";
import type { HaulixTeamData } from "@/data";
import Icon from "@/components/Icon";

/** One large portrait beside the name and social links; hovering or tapping a thumbnail brings that member forward */
export default function TeamSpotlight({ data: team }: { data: HaulixTeamData }) {
  const [active, setActive] = useState(0);
  const member = team.members[active];

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-8 lg:gap-12">
      {/* every portrait is stacked here and faded in, so switching never waits for a download; from tablets up it sits beside the details and matches their height */}
      <div data-reveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] rounded-tr-[7rem] bg-mist md:aspect-auto md:max-w-none">
        {team.members.map((person, index) => (
          <Image
            key={person.name}
            quality={90}
            src={person.image}
            alt={index === active ? person.name : ""}
            fill
            sizes="(min-width: 768px) 480px, 92vw"
            className={`object-cover object-top transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      <div data-reveal className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div aria-live="polite">
            <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">{member.name}</h3>
            <p className="mt-1 font-medium text-brand">{member.role}</p>
          </div>
          <div className="flex gap-2">
            {team.socials.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={team.socialLabel.replace("{name}", member.name).replace("{network}", social.label)}
                className="grid size-10 place-items-center rounded-full bg-mist text-ink transition-colors hover:bg-brand hover:text-white"
              >
                <Icon name={social.platform} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4">
          {team.members.map((person, index) => (
            <li key={person.name}>
              <button
                type="button"
                aria-pressed={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className="group block w-full text-center"
              >
                <span
                  className={`relative block aspect-square overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-page transition-shadow ${
                    index === active ? "ring-brand" : "ring-transparent"
                  }`}
                >
                  <Image quality={90} src={person.image} alt="" fill sizes="(min-width: 1024px) 160px, 25vw" className="object-cover object-top" />
                </span>
                <span
                  className={`mt-2 block font-display text-xs font-bold leading-tight transition-colors sm:text-sm ${
                    index === active ? "text-brand" : "text-ink"
                  }`}
                >
                  {person.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

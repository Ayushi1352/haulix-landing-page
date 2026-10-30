import { site, type HaulixTeamData, type SectionProps } from "@/data";
import SectionHeading from "@/components/SectionHeading";
import TeamSpotlight from "@/components/TeamSpotlight";

/** The website's Our Team page: one large portrait at a time, with the whole team as thumbnails beside it */
export default function TeamSection({ data: team = site.teamSection, className = "" }: SectionProps<HaulixTeamData>) {
  return (
    <section className={`bg-page py-(--section-gap) ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading label={team.label} titleTop={team.titleTop} titleAccent={team.titleAccent} />
          <p data-reveal className="max-w-md leading-relaxed text-slate">
            {team.description}
          </p>
        </div>
        <TeamSpotlight data={team} />
      </div>
    </section>
  );
}

import { BadgeCheck, Brain, BriefcaseBusiness, Flame, Radar } from "lucide-react";

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <Brain size={34} />,
    name: "Thought Leaders",
  },
  {
    icon: <BadgeCheck size={34} />,
    name: "Content Creators",
  },
  {
    icon: <BriefcaseBusiness size={34} />,
    name: "Busy Professionals",
  },
  {
    icon: <Flame size={34} />,
    name: "Aspiring Influencers",
  }
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Perfect For
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ icon, name }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <span>{icon}</span>
            <h3 className="text-xl  font-bold">{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

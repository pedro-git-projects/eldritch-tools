import { FullInvestigator } from "../types/FullInvestigator";

type StatusCardProps = {
  selected: FullInvestigator;
};

export default function HpStatusCard({ selected }: StatusCardProps) {
  const stats = [
    {
      name: "Major Wound",
      stat: selected.hp.MajorWound ? "Yes" : "No",
      description: "Indicates whether the character has a major wound.",
    },
    {
      name: "Dying",
      stat: selected.hp.Dying ? "Yes" : "No",
      description: "Indicates whether the character is dying.",
    },
    {
      name: "Unconscious",
      stat: selected.hp.Unconscious ? "Yes" : "No",
      description: "Indicates whether the character is unconscious.",
    },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-cthulhu-beige overflow-hidden rounded-lg bg-cthulhu-secondary shadow md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map(item => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold">
                {item.stat}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

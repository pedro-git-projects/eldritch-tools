import { FullInvestigator } from "../types/FullInvestigator";

type StatusCardProps = {
  selected: FullInvestigator;
};

export default function SanityStatusCard({ selected }: StatusCardProps) {
  const stats = [
    {
      name: "Temporary Insanity",
      stat: selected.sanity.TempInsane ? "Yes" : "No",
      description: "Indicates whether the investigator is temporarily insane.",
    },
    {
      name: "Indefinite Insanity",
      stat: selected.sanity.IndefInsane ? "Yes" : "No",
      description: "Indicates whether the investigator is indefinitely insane.",
    },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-cthulhu-beige overflow-hidden rounded-lg bg-cthulhu-secondary shadow md:grid-cols-2 md:divide-x md:divide-y-0">
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

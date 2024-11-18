import { FullInvestigator } from "../types/FullInvestigator";

type StatusCardProps = {
  selected: FullInvestigator;
};

export default function CombatStatusCard({ selected }: StatusCardProps) {
  const stats = [
    {
      name: "Damage Bonus",
      stat: selected.combat.DamageBonus || 0,
      description: "Indicates the character's damage bonus.",
    },
    {
      name: "Build",
      stat: selected.combat.Build || 0,
      description: "Indicates the character's build.",
    },
    {
      name: "Dodge",
      stat: selected.combat.Dodge || 0,
      description: "Indicates the character's dodge skill.",
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

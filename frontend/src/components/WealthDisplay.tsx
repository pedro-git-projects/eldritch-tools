interface Wealth {
  SpendingLevel: number;
  Cash: number;
  Assets: number;
}

type WealthStatusCardProps = {
  wealth: Wealth;
};

export default function WealthStatusCard({ wealth }: WealthStatusCardProps) {
  const stats = [
    {
      name: "Spending Level",
      stat: wealth.SpendingLevel || 0,
      description: "Indicates the character's daily spending capacity.",
    },
    {
      name: "Cash",
      stat: wealth.Cash || 0,
      description: "Represents the amount of cash readily available.",
    },
    {
      name: "Assets",
      stat: wealth.Assets || 0,
      description: "Represents the character's total assets.",
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

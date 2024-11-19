type Weapon = {
  Name: string;
  SkillName: string;
  Damage: number;
  NumberOfAttacks: number;
  Range: number;
  Ammo: number;
  Malf: number;
};

type WeaponsDisplayProps = {
  weapons: Record<string, Weapon> | null | undefined;
};

export default function WeaponsDisplay({ weapons }: WeaponsDisplayProps) {
  if (!weapons || Object.keys(weapons).length === 0) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">Weapons</h3>
        <p className="mt-2 text-sm">No weapons available.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">Weapons</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(weapons).map(weapon => (
          <div
            key={weapon.Name}
            className="rounded-lg bg-cthulhu-secondary shadow-sm ring-1 ring-gray-900/5"
          >
            <dl className="flex flex-wrap">
              <div className="flex-auto pl-6 pt-6">
                <dt className="text-xl font-semibold text-cthulhu-olive">
                  Weapon
                </dt>
                <dd className="mt-1 text-base font-semibold">{weapon.Name}</dd>
              </div>
              <div className="flex-auto pl-6 pt-4">
                <dt className="text-xl font-semibold text-cthulhu-teal">
                  Skill
                </dt>
                <dd className="mt-1 text-base">{weapon.SkillName}</dd>
              </div>
              <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-cthulhu-beige px-6 pt-6 font-semibold">
                <dd className="text-sm font-medium">Damage: {weapon.Damage}</dd>
              </div>
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                <dd className="text-sm font-semibold">
                  Attacks: {weapon.NumberOfAttacks}
                </dd>
              </div>
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                <dt className="text-sm font-semibold">Range:</dt>
                <dd className="text-sm">{weapon.Range}</dd>
              </div>
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                <dt className="text-sm font-semibold">Ammo:</dt>
                <dd className="text-sm">{weapon.Ammo}</dd>
              </div>
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6 pb-6">
                <dt className="text-sm font-semibold">Malfunction:</dt>
                <dd className="text-sm">{weapon.Malf}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

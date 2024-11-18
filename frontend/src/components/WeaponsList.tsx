import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

interface WeaponData {
  name: string;
  skillName: string;
  damage: number;
  range: number;
  ammo: number;
  malf: number;
  numberOfAttacks: number;
}

interface WeaponsListProps {
  weapons: WeaponData[];
  onEdit: (index: number, updatedWeapon: WeaponData) => void;
  onDelete: (index: number) => void;
}

export default function WeaponsList({
  weapons,
  onEdit,
  onDelete,
}: WeaponsListProps) {
  const handleEditClick = (index: number) => {
    const updatedWeapon = {
      ...weapons[index],
      name: weapons[index].name + " (Edited)",
    };
    onEdit(index, updatedWeapon);
  };

  return (
    <ul
      role="list"
      className="divide-y divide-cthulhu-gray bg-cthulhu-dark rounded-lg shadow-md overflow-visible"
    >
      {weapons.map((weapon, index) => (
        <li
          key={index}
          className="flex items-center justify-between gap-x-6 py-5 px-4 bg-cthulhu-secondary rounded-md mx-2 my-2 shadow-inner"
        >
          <div className="min-w-0">
            <p className="text-sm font-semibold text-cthulhu-light">
              {weapon.name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-cthulhu-muted">
              <p>Skill: {weapon.skillName}</p>
              <p>Damage: {weapon.damage}</p>
              <p>Range: {weapon.range}</p>
              <p>Ammo: {weapon.ammo}</p>
              <p>Malf: {weapon.malf}</p>
              <p>Attacks: {weapon.numberOfAttacks}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-cthulhu-teal hover:text-cthulhu-highlight">
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-cthulhu-dark py-2 shadow-lg ring-1 ring-cthulhu-deep"
              >
                <MenuItem>
                  <button
                    onClick={() => handleEditClick(index)}
                    className="block w-full text-left px-3 py-1 text-sm text-cthulhu-light hover:bg-cthulhu-deep"
                  >
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => onDelete(index)}
                    className="block w-full text-left px-3 py-1 text-sm text-cthulhu-light hover:bg-cthulhu-deep"
                  >
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}

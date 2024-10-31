import { useState } from "react";
import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import { AddWeaponWithConfig } from "../../wailsjs/go/investigator/Investigator";

interface WeaponData {
  name: string;
  skillName: string;
  damage: number;
  range: number;
  ammo: number;
  malf: number;
  numberOfAttacks: number;
}

export default function WeaponsForm() {
  const [weapons, setWeapons] = useState<WeaponData[]>([]);
  const [newWeapon, setNewWeapon] = useState<WeaponData>({
    name: "",
    skillName: "",
    damage: 0,
    range: 0,
    ammo: 0,
    malf: 0,
    numberOfAttacks: 1,
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWeapon((prev) => ({
      ...prev,
      [name]: name === "damage" || name === "range" || name === "ammo" || name === "malf" || name === "numberOfAttacks" ? Number(value) : value,
    }));
    setShowPreview(true);
  };



  const handleAddWeapon = async () => {
    const weaponConfig = {
      Name: newWeapon.name,
      SkillName: newWeapon.skillName,
      Damage: newWeapon.damage,
      Range: newWeapon.range,
      Ammo: newWeapon.ammo,
      Malf: newWeapon.malf,
      NumberOfAttacks: newWeapon.numberOfAttacks,
    };

    await AddWeaponWithConfig(weaponConfig);

    setWeapons((prev) => [...prev, newWeapon]);
    setNewWeapon({
      name: "",
      skillName: "",
      damage: 0,
      range: 0,
      ammo: 0,
      malf: 0,
      numberOfAttacks: 1,
    });
    setShowPreview(false);
  };


  return (
    <Navigation>
      <TopMenu />
      <div className="px-4 py-16">
        <h2 className="text-base font-semibold text-white">Add New Weapon</h2>

        <div className="space-y-4 mt-4">
          <input
            type="text"
            name="name"
            value={newWeapon.name}
            onChange={handleInputChange}
            placeholder="Weapon Name"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="text"
            name="skillName"
            value={newWeapon.skillName}
            onChange={handleInputChange}
            placeholder="Skill Name"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="damage"
            value={newWeapon.damage}
            onChange={handleInputChange}
            placeholder="Damage"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="range"
            value={newWeapon.range}
            onChange={handleInputChange}
            placeholder="Range"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="ammo"
            value={newWeapon.ammo}
            onChange={handleInputChange}
            placeholder="Ammo"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="malf"
            value={newWeapon.malf}
            onChange={handleInputChange}
            placeholder="Malf"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="numberOfAttacks"
            value={newWeapon.numberOfAttacks}
            onChange={handleInputChange}
            placeholder="Number of Attacks"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
        </div>

        <button
          onClick={handleAddWeapon}
          className="mt-6 rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
        >
          Add Weapon
        </button>


        {showPreview && (
          <div className="mt-4 p-4 bg-gray-700 rounded-md text-white">
            <h3 className="text-lg font-semibold">Weapon Preview</h3>
            <p>Name: {newWeapon.name}</p>
            <p>Skill Name: {newWeapon.skillName}</p>
            <p>Damage: {newWeapon.damage}</p>
            <p>Range: {newWeapon.range}</p>
            <p>Ammo: {newWeapon.ammo}</p>
            <p>Malf: {newWeapon.malf}</p>
            <p>Number of Attacks: {newWeapon.numberOfAttacks}</p>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white">Current Weapons</h3>
          <ul className="mt-2 text-white space-y-2">
            {weapons.map((weapon, index) => (
              <li key={index}>
                {weapon.name} - Damage: {weapon.damage}, Skill: {weapon.skillName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Navigation>
  );
}


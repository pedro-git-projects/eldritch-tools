import { useState } from "react";
import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import { AddWeaponWithConfig } from "../../wailsjs/go/investigator/Investigator";
import WeaponsList from "../components/WeaponsList";
import { useFormContext } from "../context/FormContext";
import {
  WeaponData,
  convertToWeaponDataDto,
  WeaponDataDto,
} from "../types/WeaponData";

export default function WeaponsForm() {
  const { weapons, setWeapons } = useFormContext();

  const [newWeapon, setNewWeapon] = useState<WeaponData>({
    name: "",
    skillName: "",
    damage: {
      numDice: 1,
      sides: 6,
      modifier: 0,
      damageBonus: 0,
    },
    range: 0,
    ammo: 0,
    malf: 0,
    numberOfAttacks: 1,
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingWeapon, setEditingWeapon] = useState<WeaponData | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditMode = false,
    nestedField?: string,
  ) => {
    const { name, value } = e.target;
    const update = isEditMode ? setEditingWeapon : setNewWeapon;

    update((prev: any) =>
      prev
        ? {
            ...prev,
            [nestedField || name]: nestedField
              ? {
                  ...prev[nestedField],
                  [name]: Number(value),
                }
              : name === "name" || name === "skillName"
                ? value
                : Number(value),
          }
        : prev,
    );
  };

  const handleDamageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const regex = /^(\d+)d(\d+)([+-]\d+)?$/; // Match format "XdY+Z"
    const match = value.match(regex);

    if (match) {
      const [, numDice, sides, modifier] = match;
      setNewWeapon(prev => ({
        ...prev,
        damage: {
          ...prev.damage,
          numDice: parseInt(numDice, 10),
          sides: parseInt(sides, 10),
          modifier: modifier ? parseInt(modifier, 10) : 0,
        },
      }));
    }
  };

  const handleAddWeapon = async () => {
    // Convert WeaponData to WeaponDataDto
    const weaponConfig: WeaponDataDto = convertToWeaponDataDto(newWeapon);

    // Send the DTO to the backend
    // @ts-ignore
    await AddWeaponWithConfig(weaponConfig);

    // Update the frontend state
    setWeapons(prev => [...prev, newWeapon]);

    // Reset the form
    setNewWeapon({
      name: "",
      skillName: "",
      damage: {
        numDice: 1,
        sides: 6,
        modifier: 0,
        damageBonus: 0,
      },
      range: 0,
      ammo: 0,
      malf: 0,
      numberOfAttacks: 1,
    });
  };

  const handleEditWeapon = (index: number) => {
    setEditingIndex(index);
    setEditingWeapon({ ...weapons[index] });
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingWeapon) {
      setWeapons(prev =>
        prev.map((weapon, i) => (i === editingIndex ? editingWeapon : weapon)),
      );
      setEditingIndex(null);
      setEditingWeapon(null);
    }
  };

  const handleDeleteWeapon = (index: number) => {
    setWeapons(prev => prev.filter((_, i) => i !== index));
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
            onChange={e => handleInputChange(e)}
            placeholder="Weapon Name"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="text"
            name="skillName"
            value={newWeapon.skillName}
            onChange={e => handleInputChange(e)}
            placeholder="Skill Name"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="text"
            name="damage"
            placeholder="Damage (e.g., 1d6+2)"
            className="w-full rounded-md bg-gray-800 text-white p-2"
            onChange={handleDamageInput}
          />
          <input
            type="number"
            name="range"
            value={newWeapon.range}
            onChange={e => handleInputChange(e)}
            placeholder="Range"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="ammo"
            value={newWeapon.ammo}
            onChange={e => handleInputChange(e)}
            placeholder="Ammo"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="malf"
            value={newWeapon.malf}
            onChange={e => handleInputChange(e)}
            placeholder="Malf"
            className="w-full rounded-md bg-gray-800 text-white p-2"
          />
          <input
            type="number"
            name="numberOfAttacks"
            value={newWeapon.numberOfAttacks}
            onChange={e => handleInputChange(e)}
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

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white">Current Weapons</h3>
          <WeaponsList
            weapons={weapons}
            onEdit={handleEditWeapon}
            onDelete={handleDeleteWeapon}
          />
        </div>
      </div>
    </Navigation>
  );
}

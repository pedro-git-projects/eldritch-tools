import { useState } from "react";
import Navigation from "../layout/Navigation";
import TopMenu from "./TopMenu";
import {
  AddWeaponWithConfig,
  Print,
} from "../../wailsjs/go/investigator/Investigator";
import WeaponsList from "../components/WeaponsList";
import { useFormContext } from "../context/FormContext";

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
  const { weapons, setWeapons } = useFormContext();

  const [newWeapon, setNewWeapon] = useState<WeaponData>({
    name: "",
    skillName: "",
    damage: 0,
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
  ) => {
    const { name, value } = e.target;
    const update = isEditMode ? setEditingWeapon : setNewWeapon;

    update((prev: any) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "name" || name === "skillName" ? value : Number(value),
          }
        : prev,
    );
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

    setWeapons(prev => [...prev, newWeapon]);
    setNewWeapon({
      name: "",
      skillName: "",
      damage: 0,
      range: 0,
      ammo: 0,
      malf: 0,
      numberOfAttacks: 1,
    });
  };

  const handleBindWeapons = async () => {
    for (const weapon of weapons) {
      const weaponConfig = {
        Name: weapon.name,
        SkillName: weapon.skillName,
        Damage: weapon.damage,
        Range: weapon.range,
        Ammo: weapon.ammo,
        Malf: weapon.malf,
        NumberOfAttacks: weapon.numberOfAttacks,
      };

      await AddWeaponWithConfig(weaponConfig);
      await Print();
    }

    alert("Weapons bound to investigator successfully.");
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
            type="number"
            name="damage"
            value={newWeapon.damage}
            onChange={e => handleInputChange(e)}
            placeholder="Damage"
            className="w-full rounded-md bg-gray-800 text-white p-2"
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

        {editingWeapon && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-cthulhu-secondary bg-opacity-90"
            style={{ zIndex: 1050 }}
          >
            <div className="bg-cthulhu-dark p-6 rounded-md z-1050 shadow-lg max-w-lg w-full mx-4 sm:mx-6 md:mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-cthulhu-highlight">
                Edit Weapon
              </h3>
              <input
                type="text"
                name="name"
                value={editingWeapon.name}
                onChange={e => handleInputChange(e, true)}
                placeholder="Weapon Name"
                className="w-full rounded-md mb-2 bg-cthulhu-gray p-2 text-cthulhu-highlight placeholder-cthulhu-soft"
              />
              <input
                type="text"
                name="skillName"
                value={editingWeapon.skillName}
                onChange={e => handleInputChange(e, true)}
                placeholder="Skill Name"
                className="w-full rounded-md mb-2 bg-cthulhu-gray p-2 text-cthulhu-highlight placeholder-cthulhu-soft"
              />
              <input
                type="number"
                name="damage"
                value={editingWeapon.damage}
                onChange={e => handleInputChange(e, true)}
                placeholder="Damage"
                className="w-full rounded-md mb-2 bg-cthulhu-gray p-2 text-cthulhu-highlight placeholder-cthulhu-soft"
              />
              <input
                type="number"
                name="range"
                value={editingWeapon.range}
                onChange={e => handleInputChange(e, true)}
                placeholder="Range"
                className="w-full rounded-md mb-2 bg-cthulhu-gray p-2 text-cthulhu-highlight placeholder-cthulhu-soft"
              />
              <input
                type="number"
                name="ammo"
                value={editingWeapon.ammo}
                onChange={e => handleInputChange(e, true)}
                placeholder="Ammo"
                className="w-full rounded-md mb-2 bg-cthulhu-gray p-2 text-cthulhu-highlight placeholder-cthulhu-soft"
              />
              <input
                type="number"
                name="malf"
                value={editingWeapon.malf}
                onChange={e => handleInputChange(e, true)}
                placeholder="Malf"
                className="w-full rounded-md mb-2 bg-cthulhu-gray p-2 text-cthulhu-highlight placeholder-cthulhu-soft"
              />
              <input
                type="number"
                name="numberOfAttacks"
                value={editingWeapon.numberOfAttacks}
                onChange={e => handleInputChange(e, true)}
                placeholder="Number of Attacks"
                className="w-full rounded-md mb-2 bg-cthulhu-gray p-2 text-cthulhu-highlight placeholder-cthulhu-soft"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingIndex(null);
                    setEditingWeapon(null);
                  }}
                  className="rounded-md bg-cthulhu-muted px-4 py-2 text-sm text-cthulhu-bg hover:bg-cthulhu-bluegray"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="rounded-md bg-cthulhu-accent px-4 py-2 text-sm text-cthulhu-bg hover:bg-cthulhu-teal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 ">
          <h3 className="text-lg font-semibold text-white">Current Weapons</h3>
          <WeaponsList
            weapons={weapons}
            onEdit={handleEditWeapon}
            onDelete={handleDeleteWeapon}
          />
        </div>
        <button
          onClick={handleBindWeapons}
          className="mt-4 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
        >
          Bind Weapons to Investigator
        </button>
      </div>
    </Navigation>
  );
}

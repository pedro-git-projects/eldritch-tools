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
  parseDamage,
} from "../types/WeaponData";
import AlertBanner from "../components/AlertBanner";
import { ErrorDialog } from "../components/ErrorModal";

// TODO: Fix editing damage values

export default function WeaponsForm() {
  const { weapons, setWeapons } = useFormContext();
  const [alert, setAlert] = useState<{
    title: string;
    content: string;
    nextStepPath?: string;
  } | null>(null);
  const [errorDialog, setErrorDialog] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [editingWeaponName, setEditingWeaponName] = useState<string | null>(
    null,
  );

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
  const [damageInput, setDamageInput] = useState<string>("");


  const handleEditingDamageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDamageInput(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditMode = false,
    nestedField?: string,
  ) => {
    const { name, value } = e.target;
    const update = isEditMode ? setEditingWeapon : setNewWeapon;

    update((prev: any) => {
      if (!prev) return prev;

      if (nestedField === "damage") {
        // Parse damage field value (e.g., "1d6+2")
        const regex = /^(\d+)d(\d+)([+-]\d+)?([+-]\d+)?$/;
        const match = value.match(regex);
        if (match) {
          const [, numDice, sides, modifier] = match;
          return {
            ...prev,
            [nestedField]: {
              ...prev[nestedField],
              numDice: parseInt(numDice, 10),
              sides: parseInt(sides, 10),
              modifier: modifier ? parseInt(modifier, 10) : 0,
            },
          };
        } else {
          return prev;
        }
      }

      return {
        ...prev,
        [nestedField || name]: nestedField
          ? {
            ...prev[nestedField],
            [name]: Number(value),
          }
          : name === "name" || name === "skillName"
            ? value
            : Number(value),
      };
    });
  };

  const handleBindAllWeapons = async () => {
    try {
      for (const weapon of weapons) {
        const weaponConfig: WeaponDataDto = convertToWeaponDataDto(weapon);
        // @ts-ignore
        await AddWeaponWithConfig(weaponConfig);
      }
      setAlert({
        title: "Success",
        content:
          "The stars align as your arsenal grows. The void whispers of battles yet to come.",
        nextStepPath: "/possessions",
      });
    } catch (error) {
      setErrorDialog({
        title: "Error",
        content: `Failed to bind all weapons. Error: ${error}`,
      });
    }
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
    try {
      setWeapons(prev => [...prev, newWeapon]);

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
    } catch (err) {
      setErrorDialog({
        title: "Error",
        content: `Failed to add weapon with ${err}. Please try again.`,
      });
    }
  };


  const handleEditWeapon = (index: number) => {
    const weapon = weapons[index];
    setEditingIndex(index);
    setEditingWeapon({ ...weapon });
    setEditingWeaponName(weapon.name);
    setDamageInput(
      weapon.damage
        ? `${weapon.damage.numDice}d${weapon.damage.sides}${weapon.damage.modifier > 0 ? `+${weapon.damage.modifier}` : weapon.damage.modifier < 0 ? `${weapon.damage.modifier}` : ""}`
        : ""
    );
  };

  const handleSaveEdit = async () => {
    if (editingIndex !== null && editingWeapon && editingWeaponName) {
      try {
        const parsedDamage = damageInput ? parseDamage(damageInput) : null;

        const updatedWeapon = {
          ...editingWeapon,
          damage: parsedDamage,
        };

        // TODO: handle possible null
        // @ts-ignore
        setWeapons(prev =>
          prev.map((weapon, i) =>
            i === editingIndex ? updatedWeapon : weapon
          )
        );

        setEditingIndex(null);
        setEditingWeapon(null);
        setEditingWeaponName(null);
        setDamageInput("");
      } catch (err) {
        console.error("Failed to save edited weapon:", err);
        setErrorDialog({
          title: "Error",
          content: `Failed to parse damage: "${damageInput}". Please use the format "XdY+Z".`,
        });
      }
    }
  };

  const handleDeleteWeapon = (index: number) => {
    try {
      setWeapons(prev => prev.filter((_, i) => i !== index));
      setAlert({
        title: "Success",
        content: "Weapon successfully removed from the list.",
      });
    } catch (err) {
      setErrorDialog({
        title: "Error",
        content: `Failed to remove weapon. Please try again.`,
      });
    }
  };

  return (
    <Navigation>
      <TopMenu />
      {editingWeapon && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-cthulhu-deep p-6 rounded-md shadow-lg max-w-md w-full mx-4 sm:mx-6 md:mx-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Weapon</h3>
            <label htmlFor="name" className="block text-sm/6 font-medium">
              Weapon Name
            </label>
            <input
              type="text"
              name="name"
              value={editingWeapon.name}
              onChange={e => handleInputChange(e, true)}
              placeholder="Weapon Name"
              className="w-full rounded-md mb-2 bg-cthulhu-secondary p-2 border-0 ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-beige"
            />

            <label htmlFor="skillName" className="block text-sm/6 font-medium">
              Skill Name
            </label>
            <input
              type="text"
              name="skillName"
              value={editingWeapon.skillName}
              onChange={e => handleInputChange(e, true)}
              placeholder="Skill Name"
              className="w-full rounded-md mb-2 bg-cthulhu-secondary p-2 border-0 ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-beige"
            />

            <label htmlFor="damage" className="block text-sm/6 font-medium">
              Damage
            </label>
            <input
              type="text"
              name="damage"
              placeholder="Damage (e.g., 1d6+2)"
              value={damageInput}
              onChange={handleEditingDamageInput}
              className="w-full rounded-md bg-cthulhu-secondary p-2 border-0 ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-beige"
            />
            <label htmlFor="range" className="block text-sm/6 font-medium">
              Range
            </label>
            <input
              type="number"
              name="range"
              value={editingWeapon.range}
              onChange={e => handleInputChange(e, true)}
              placeholder="Range"
              className="w-full rounded-md mb-2 bg-cthulhu-secondary p-2 border-0 ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-beige"
            />

            <label htmlFor="Ammo" className="block text-sm/6 font-medium">
              Ammo
            </label>
            <input
              type="number"
              name="ammo"
              value={editingWeapon.ammo}
              onChange={e => handleInputChange(e, true)}
              placeholder="Ammo"
              className="w-full rounded-md mb-2 bg-cthulhu-secondary p-2 border-0 ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-beige"
            />

            <label htmlFor="malf" className="block text-sm/6 font-medium">
              Malfunction
            </label>
            <input
              type="number"
              name="malf"
              value={editingWeapon.malf}
              onChange={e => handleInputChange(e, true)}
              placeholder="Malfunction"
              className="w-full rounded-md mb-2 bg-cthulhu-secondary p-2 border-0 ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-beige"
            />

            <label htmlFor="malf" className="block text-sm/6 font-medium">
              Number of Attacks
            </label>
            <input
              type="number"
              name="numberOfAttacks"
              value={editingWeapon.numberOfAttacks}
              onChange={e => handleInputChange(e, true)}
              placeholder="Number of Attacks"
              className="w-full rounded-md mb-2 bg-cthulhu-secondary p-2 border-0 ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-beige"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingIndex(null);
                  setEditingWeapon(null);
                }}
                className="rounded-md bg-cthulhu-dark px-4 py-2 text-sm  hover:bg-cthulhu-dark/50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="rounded-md bg-cthulhu-rust px-4 py-2 text-sm text-white hover:bg-cthulhu-rust/50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {alert && (
        <div className="mb-4">
          <AlertBanner
            title={alert.title}
            content={alert.content}
            onClose={() => setAlert(null)}
            nextStepPath={alert.nextStepPath}
          />
        </div>
      )}
      {errorDialog && (
        <ErrorDialog
          title={errorDialog.title}
          content={errorDialog.content}
          textBtn1="OK"
          onClose1={() => setErrorDialog(null)}
        />
      )}

      <div className="px-4 py-16">
        <div className="flex justify-end">
          <h2 className="text-xl font-semibold">Add New Weapon</h2>
        </div>
        <div className="space-y-4 mt-4">
          <label htmlFor="skillName" className="block text-sm/6 font-medium">
            Weapon Name
          </label>
          <input
            type="text"
            name="name"
            value={newWeapon.name}
            onChange={e => handleInputChange(e)}
            placeholder="Weapon Name"
            className="w-full placeholder-cthulhu-bluegray rounded-md bg-cthulhu-secondary p-2 border-0 shadow-sm ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal"
          />

          <label htmlFor="skillName" className="block text-sm/6 font-medium">
            Skill Name
          </label>
          <input
            type="text"
            name="skillName"
            value={newWeapon.skillName}
            onChange={e => handleInputChange(e)}
            placeholder="Skill Name"
            className="w-full placeholder-cthulhu-bluegray rounded-md bg-cthulhu-secondary p-2 border-0 shadow-sm ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal"
          />

          <label htmlFor="damage" className="block text-sm/6 font-medium">
            Damage
          </label>
          <input
            type="text"
            name="damage"
            placeholder="Damage (e.g., 1d6+2)"
            className="w-full placeholder-cthulhu-bluegray rounded-md bg-cthulhu-secondary p-2 border-0 shadow-sm ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal"
            onChange={handleDamageInput}
          />

          <label htmlFor="range" className="block text-sm/6 font-medium">
            Range (yds)
          </label>
          <input
            type="number"
            name="range"
            value={newWeapon.range}
            onChange={e => handleInputChange(e)}
            placeholder="Range"
            className="w-full placeholder-cthulhu-bluegray rounded-md bg-cthulhu-secondary p-2 border-0 shadow-sm ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal"
          />

          <label htmlFor="ammo" className="block text-sm/6 font-medium">
            Ammo
          </label>
          <input
            type="number"
            name="ammo"
            value={newWeapon.ammo}
            onChange={e => handleInputChange(e)}
            placeholder="Ammo"
            className="w-full placeholder-cthulhu-bluegray rounded-md bg-cthulhu-secondary p-2 border-0 shadow-sm ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal"
          />

          <label htmlFor="malf" className="block text-sm/6 font-medium">
            Malfunction
          </label>
          <input
            type="number"
            name="malf"
            value={newWeapon.malf}
            onChange={e => handleInputChange(e)}
            placeholder="Malf"
            className="w-full placeholder-cthulhu-bluegray rounded-md bg-cthulhu-secondary p-2 border-0 shadow-sm ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal"
          />

          <label
            htmlFor="numberOfAttacks"
            className="block text-sm/6 font-medium"
          >
            Number of Attacks
          </label>
          <input
            type="number"
            name="numberOfAttacks"
            value={newWeapon.numberOfAttacks}
            onChange={e => handleInputChange(e)}
            placeholder="Number of Attacks"
            className="w-full placeholder-cthulhu-bluegray rounded-md bg-cthulhu-secondary p-2 border-0 shadow-sm ring-cthulhu-teal/10 focus:ring-2 focus:ring-inset focus:ring-cthulhu-teal"
          />
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleAddWeapon}
            className="mt-6 rounded-md bg-cthulhu-olive/15 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cthulhu-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Add Weapon
          </button>

          <button
            onClick={handleBindAllWeapons}
            className="mt-6 rounded-md bg-cthulhu-rust px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cthulhu-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Bind
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Current Weapons</h3>
          {weapons.length > 0 ? (
            <WeaponsList
              weapons={weapons}
              onEdit={handleEditWeapon}
              onDelete={handleDeleteWeapon}
            />
          ) : (
            <p className="text-sm text-gray-500 mt-4">No weapons added yet.</p>
          )}
        </div>
      </div>
    </Navigation>
  );
}

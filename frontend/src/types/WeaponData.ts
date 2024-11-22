import { GetDamageBonus } from "../../wailsjs/go/investigator/Investigator";

export interface DamageData {
  numDice: number;
  sides: number;
  modifier: number;
  damageBonus: number;
}

export interface WeaponData {
  name: string;
  skillName: string;
  damage: DamageData;
  range: number;
  ammo: number;
  malf: number;
  numberOfAttacks: number;
  applyDamageBonus: boolean;
}

export interface WeaponDataDto {
  Name: string;
  SkillName: string;
  Damage: string;
  Range: number;
  Ammo: number;
  Malf: number;
  NumberOfAttacks: number;
  ApplyDamageBonus: boolean;
  convertValues?: (a: any, classs: any, asMap?: boolean) => any;
}

// TODO: find out why the Damage Bonus is only being
// corretly applied to unarmed
export async function convertToWeaponDataDto(
  weapon: WeaponData,
): Promise<WeaponDataDto> {
  const { numDice, sides, modifier } = weapon.damage;
  const { applyDamageBonus } = weapon;

  let damageBonus = 0;
  if (applyDamageBonus) {
    try {
      damageBonus = await GetDamageBonus();
    } catch (err) {
      throw new Error(`Failed to fetch damage bonus: ${err}`);
    }
  }

  const formattedDamage =
    `${numDice}d${sides}` +
    `${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ""}` +
    `${applyDamageBonus && damageBonus !== 0 ? (damageBonus > 0 ? `+${damageBonus}` : damageBonus) : ""}`;

  return {
    Name: weapon.name,
    SkillName: weapon.skillName,
    Damage: formattedDamage,
    Range: weapon.range,
    Ammo: weapon.ammo,
    Malf: weapon.malf,
    NumberOfAttacks: weapon.numberOfAttacks,
    ApplyDamageBonus: applyDamageBonus,
  };
}

export function mapToWailsWeaponData(weapon: WeaponData) {
  return {
    Name: weapon.name,
    SkillName: weapon.skillName,
    Damage:
      weapon.damage.numDice * weapon.damage.sides +
      weapon.damage.modifier +
      weapon.damage.damageBonus,
    Range: weapon.range,
    Ammo: weapon.ammo,
    Malf: weapon.malf,
    NumberOfAttacks: weapon.numberOfAttacks,
    convertValues: (a: any, classs: any) => a, // Mock for Wails compatibility
  };
}

export function parseDamage(damageString: String) {
  const damageRegex = /^(\d+)d(\d+)([+-]\d+)?([+-]\d+)?$/;
  const match = damageString.match(damageRegex);

  if (!match) {
    throw new Error(`Invalid damage format: ${damageString}`);
  }

  const [_, numDice, sides, modifier = "+0", damageBonus = "0"] = match;

  return {
    numDice: parseInt(numDice, 10),
    sides: parseInt(sides, 10),
    modifier: parseInt(modifier, 10),
    damageBonus: parseInt(String(damageBonus), 10),
  };
}

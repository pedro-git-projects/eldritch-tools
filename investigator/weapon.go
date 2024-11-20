package investigator

import (
	"fmt"

	"github.com/pedro-git-projects/eldritch-tools/weapons"
)

func (i *Investigator) PrintWeapons() {
	fmt.Println("+----------------+--------+---------------+-------+------+-------+")
	fmt.Println("| Weapon Name    | Damage | # of Attacks  | Range | Ammo | Malf  |")
	fmt.Println("+----------------+--------+---------------+-------+------+-------+")

	for _, weapon := range i.Weapons {
		fmt.Printf("| %-14s | %6d | %13d | %5d | %4d | %5d |\n",
			weapon.Name, weapon.Damage, weapon.NumberOfAttacks, weapon.Range, weapon.Ammo, weapon.Malf)
	}

	fmt.Println("+----------------+--------+---------------+-------+------+-------+")
}

func (i *Investigator) UpdateWeapon(name string, updatedWeapon weapons.Weapon) error {
	existingWeapon, exists := i.Weapons[name]
	if !exists {
		return fmt.Errorf("weapon '%s' does not exist", name)
	}

	existingWeapon.SkillName = updatedWeapon.SkillName
	existingWeapon.Damage = updatedWeapon.Damage
	existingWeapon.NumberOfAttacks = updatedWeapon.NumberOfAttacks
	existingWeapon.Range = updatedWeapon.Range
	existingWeapon.Ammo = updatedWeapon.Ammo
	existingWeapon.Malf = updatedWeapon.Malf

	i.Weapons[name] = existingWeapon
	fmt.Printf("Updated weapon '%s': %+v\n", name, existingWeapon)

	return nil
}

func (i *Investigator) DeleteWeapon(name string) error {
	_, exists := i.Weapons[name]
	if !exists {
		return fmt.Errorf("weapon '%s' does not exist", name)
	}

	delete(i.Weapons, name)
	fmt.Printf("Deleted weapon '%s'\n", name)

	return nil
}

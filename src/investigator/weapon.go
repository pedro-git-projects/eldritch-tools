package investigator

import "fmt"

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

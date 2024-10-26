package investigator

import "fmt"

type Weapon struct {
	Name            string
	Damage          uint8
	NumberOfAttacks uint8
	Range           uint8
	Ammo            uint8
	Malf            uint8
}

type WeaponOption func(*Weapon)

func WithRange(rang uint8) WeaponOption {
	return func(w *Weapon) {
		w.Range = rang
	}
}

func WithAmmo(ammo uint8) WeaponOption {
	return func(w *Weapon) {
		w.Ammo = ammo
	}
}

func WithMalf(malf uint8) WeaponOption {
	return func(w *Weapon) {
		w.Malf = malf
	}
}

func WithNumberOfAttacks(numberOfAttacks uint8) WeaponOption {
	return func(w *Weapon) {
		w.NumberOfAttacks = numberOfAttacks
	}
}

func NewWeapon(name string, damage uint8, opts ...WeaponOption) *Weapon {
	w := &Weapon{
		Name:            name,
		Damage:          damage,
		NumberOfAttacks: 1,
		Range:           0,
		Ammo:            0,
		Malf:            0,
	}

	for _, opt := range opts {
		opt(w)
	}

	return w
}

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

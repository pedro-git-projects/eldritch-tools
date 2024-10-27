package commons

type Weapon struct {
	Name            string
	SkillName       string
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

func NewWeapon(name string, skillName string, damage uint8, opts ...WeaponOption) *Weapon {
	w := &Weapon{
		Name:            name,
		SkillName:       skillName,
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

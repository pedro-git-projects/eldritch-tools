package weapons

type Weapon struct {
	Name            string
	SkillName       string
	Damage          Damage
	NumberOfAttacks uint8
	Range           uint8
	Ammo            uint8
	Malf            uint8
	ApplyDmageBonus bool
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

func WithDamageBonus(usesDamageBonus bool) WeaponOption {
	return func(w *Weapon) {
		w.ApplyDmageBonus = usesDamageBonus
	}
}

func NewWeapon(name string, skillName string, damage Damage, opts ...WeaponOption) *Weapon {
	w := &Weapon{
		Name:            name,
		SkillName:       skillName,
		Damage:          damage,
		NumberOfAttacks: 1,
		Range:           0,
		Ammo:            0,
		Malf:            0,
		ApplyDmageBonus: false,
	}

	for _, opt := range opts {
		opt(w)
	}

	return w
}

package weapons

type WeaponConfig struct {
	Name            string
	SkillName       string
	Damage          Damage
	NumberOfAttacks uint8
	Range           uint8
	Ammo            uint8
	Malf            uint8
}

func NewWeaponFromConfig(config WeaponConfig) *Weapon {
	return &Weapon{
		Name:            config.Name,
		SkillName:       config.SkillName,
		Damage:          config.Damage,
		NumberOfAttacks: config.NumberOfAttacks,
		Range:           config.Range,
		Ammo:            config.Ammo,
		Malf:            config.Malf,
	}
}

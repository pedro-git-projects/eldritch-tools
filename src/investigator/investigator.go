package investigator

type Investigator struct {
	Info            Info
	Characteristics Characteristics
	HP              HP
	Sanity          Sanity
	Luck            uint8
	MP              uint8
	Skills          map[string]*Skill
	Weapons         map[string]*Weapon
	Combat          Combat
	Meta            Meta
	Possessions     Possessions
	Wealth          Wealth
}

func (i *Investigator) InitializeTwenties() error {

	i.Skills = make(map[string]*Skill)
	i.Weapons = make(map[string]*Weapon)

	if err := i.InitLuck(); err != nil {
		return err
	}
	i.InitMP()
	i.InitSan()
	i.InitTwentiesBaseSkills()
	i.InitDamageBonus()

	if err := i.InitWeapons(); err != nil {
		return err
	}
	return nil
}

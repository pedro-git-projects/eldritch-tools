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

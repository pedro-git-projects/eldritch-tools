package investigator

import (
	"fmt"
)

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
	i.InitMove()
	i.InitDamageBonus()

	if err := i.InitWeapons(); err != nil {
		return err
	}
	return nil
}

func (i *Investigator) PrintLuckAndMP() {
	fmt.Println("+----------------+-------+")
	fmt.Println("| Attribute      | Value |")
	fmt.Println("+----------------+-------+")
	fmt.Printf("| %-14s | %5d |\n", "Luck", i.Luck)
	fmt.Printf("| %-14s | %5d |\n", "MP", i.MP)
	fmt.Println("+----------------+-------+")
}

func (i *Investigator) Print() {
	i.Info.PrintInfo()
	i.Characteristics.PrintCharacteristics()
	i.HP.PrintHP()
	i.Sanity.PrintSanity()
	i.PrintLuckAndMP()
	i.PrintSkills()
	i.PrintWeapons()
	i.Combat.PrintCombat()
	i.Meta.PrintMeta()
	i.Possessions.ListPossessions()
	i.Wealth.PrintWealth()
}

package investigator

import (
	"errors"

	"github.com/pedro-git-projects/necronomicon-engine/src/dice"
	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

func (i *Investigator) InitTwentiesBaseSkills() {
	i.Skills["Accounting"] = NewSkill("Accounting", 5)
	i.Skills["Anthropology"] = NewSkill("Anthropology", 1)
	i.Skills["Appraise"] = NewSkill("Appraise", 5)
	i.Skills["Archeology"] = NewSkill("Archeology", 1)
	i.Skills["Art/Craft"] = NewSkill("Art/Craft", 5)
	i.Skills["Charm"] = NewSkill("Charm", 15)
	i.Skills["Climb"] = NewSkill("Climb", 20)
	i.Skills["Credit Rating"] = NewSkill("Credit Rating", 0)
	i.Skills["Cthulhu Mythos"] = NewSkill("Cthulhu Mythos", 0)
	i.Skills["Disguise"] = NewSkill("Disguise", 5)
	i.Skills["Dodge"] = NewSkill("Disguise", i.Characteristics.Dex/2)
	i.Skills["Drive Auto"] = NewSkill("Drive Auto", 20)
	i.Skills["Elec Repair"] = NewSkill("Elec Repair", 10)
	i.Skills["Fast Talk"] = NewSkill("Fast Talk", 5)
	i.Skills["Fighting (Brawl)"] = NewSkill("Fighting (Brawl)", 25)
	i.Skills["Firearms (Handgun)"] = NewSkill("Firearms (Handgun)", 20)
	i.Skills["Firearms (Rifle/Shotgun)"] = NewSkill("Firearms (Rifle/Shotgun)", 20)
	i.Skills["First Aid"] = NewSkill("First Aid", 30)
	i.Skills["History"] = NewSkill("History", 5)
	i.Skills["Intimidate"] = NewSkill("Intimidate", 15)
	i.Skills["Jump"] = NewSkill("Jump", 20)
	i.Skills["Language (Other)"] = NewSkill("Language (Other)", 1)
	i.Skills["Language (Own)"] = NewSkill("Language (Own)", i.Characteristics.Edu)
	i.Skills["Law"] = NewSkill("Law", 5)
	i.Skills["Library Use"] = NewSkill("Library Use", 20)
	i.Skills["Listen"] = NewSkill("Listen", 20)
	i.Skills["Locksmith"] = NewSkill("Locksmith", 1)
	i.Skills["Mech Repair"] = NewSkill("Mech Repair", 10)
	i.Skills["Medicine"] = NewSkill("Medicine", 1)
	i.Skills["Natural World"] = NewSkill("Natural World", 10)
	i.Skills["Navigate"] = NewSkill("Navigate", 10)
	i.Skills["Occult"] = NewSkill("Occult", 5)
	i.Skills["Op Hv Machine"] = NewSkill("Op Hv Machine", 1)
	i.Skills["Persuade"] = NewSkill("Persuade", 10)
	i.Skills["Pilot"] = NewSkill("Pilot", 1)
	i.Skills["Psychology"] = NewSkill("Psychology", 10)
	i.Skills["Psychoanalysis"] = NewSkill("Psychoanalysis", 1)
	i.Skills["Ride"] = NewSkill("Ride", 5)
	i.Skills["Science"] = NewSkill("Science", 1)
	i.Skills["Sleight of Hand"] = NewSkill("Sleight of Hand", 10)
	i.Skills["Spot Hidden"] = NewSkill("Spot Hidden", 25)
	i.Skills["Stealth"] = NewSkill("Stealth", 20)
	i.Skills["Survival"] = NewSkill("Survival", 10)
	i.Skills["Swim"] = NewSkill("Swim", 20)
	i.Skills["Throw"] = NewSkill("Throw", 20)
	i.Skills["Track"] = NewSkill("Track", 10)
}

func (i *Investigator) InitWeapons() error {
	roll := dice.GetDiceRoller().RollDx(3)
	damageInt := roll + int(i.Combat.DamageBonus)
	damage, err := utils.SafeIntToUint8(damageInt)
	if err != nil {
		return err
	}
	i.Weapons["Unarmed"] = NewWeapon("Unarmed", damage)
	return nil
}

func (i *Investigator) InitLuck() error {
	roll1 := dice.GetDiceRoller().RollDx(6) * 5
	roll2 := dice.GetDiceRoller().RollDx(6) * 5
	roll3 := dice.GetDiceRoller().RollDx(6) * 5
	luckInt := roll1 + roll2 + roll3
	luck, err := utils.SafeIntToUint8(luckInt)
	if err != nil {
		return err
	}
	i.Luck = luck
	return nil
}

func (i *Investigator) InitMP() {
	i.MP = uint8(i.Characteristics.Pow / 5)
}

func (i *Investigator) InitSan() {
	i.Sanity.Value = uint8(i.Characteristics.Pow)
}

func (i *Investigator) InitDamageBonus() error {
	param := i.Characteristics.Str + i.Characteristics.Siz
	switch {
	case param <= 64:
		i.Combat.DamageBonus = -2
		i.Combat.Build = -2
		return nil
	case param >= 65 && param <= 84:
		i.Combat.DamageBonus = -1
		i.Combat.Build = -1
		return nil
	case param >= 85 && param <= 124:
		i.Combat.DamageBonus = 0
		i.Combat.Build = 0
		return nil
	case param >= 125 && param <= 164:
		roll, err := utils.SafeIntToInt8(dice.GetDiceRoller().RollDx(4))
		if err != nil {
			return err
		}
		i.Combat.DamageBonus = roll
		i.Combat.Build = 1
		return nil
	case param >= 165 && param <= 204:
		roll, err := utils.SafeIntToInt8(dice.GetDiceRoller().RollDx(6))
		if err != nil {
			return err
		}
		i.Combat.DamageBonus = roll
		i.Combat.Build = 2
		return nil
	default:
		return errors.New("Invalid characteristics for Damage Bonus caluclation")
	}
}

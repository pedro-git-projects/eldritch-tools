package investigator

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/pedro-git-projects/necronomicon-engine/src/combat"
	"github.com/pedro-git-projects/necronomicon-engine/src/commons"
	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

type Investigator struct {
	Info               Info
	Characteristics    Characteristics
	HP                 HP
	Sanity             Sanity
	Luck               uint8
	MP                 uint8
	Skills             map[string]*Skill
	Weapons            map[string]*commons.Weapon
	Combat             Combat
	Meta               Meta
	Possessions        Possessions
	Wealth             Wealth
	isPlayerControlled bool
}

func (i *Investigator) InitializeTwenties() error {

	i.Skills = make(map[string]*Skill)
	i.Weapons = make(map[string]*commons.Weapon)

	if err := i.InitLuck(); err != nil {
		return err
	}
	i.InitHP()
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

func (i *Investigator) GetName() string {
	return i.Info.Name
}

func (i *Investigator) GetDex() uint8 {
	return uint8(i.Characteristics.Dex)
}

func (i *Investigator) TakeTurn(engine *combat.CombatEngine) {
	fmt.Printf("%s is taking a turn with DEX %d\n", i.Info.Name, i.Characteristics.Dex)
}

func (i *Investigator) IsAlive() bool {
	return i.HP.Value > 0
}

func (i *Investigator) selectTarget(engine *combat.CombatEngine) combat.Actor {
	reader := bufio.NewReader(os.Stdin)

	fmt.Println("\nSelect target:")
	for idx, actor := range engine.Actors {
		if actor != i && actor.IsAlive() {
			fmt.Printf("%d. %s\n", idx+1, actor.GetName())
		}
	}

	for {
		fmt.Print("Enter target number: ")
		targetStr, _ := reader.ReadString('\n')
		targetStr = strings.TrimSpace(targetStr)
		targetIdx, err := strconv.Atoi(targetStr)
		if err == nil && targetIdx > 0 && targetIdx <= len(engine.Actors) {
			target := engine.Actors[targetIdx-1]
			if target != i && target.IsAlive() {
				return target
			}
		}
		fmt.Println("Invalid selection, please try again.")
	}
}

func (i *Investigator) selectWeapon() *commons.Weapon {
	reader := bufio.NewReader(os.Stdin)

	fmt.Println("\nSelect weapon or skill for attack:")
	weaponList := make([]*commons.Weapon, 0, len(i.Weapons))
	idx := 1

	for _, weapon := range i.Weapons {
		fmt.Printf("%d. %s (Damage: %d)\n", idx, weapon.Name, weapon.Damage)
		weaponList = append(weaponList, weapon)
		idx++
	}

	for {
		fmt.Print("Enter weapon number: ")
		weaponStr, _ := reader.ReadString('\n')
		weaponStr = strings.TrimSpace(weaponStr)
		weaponIdx, err := strconv.Atoi(weaponStr)
		if err == nil && weaponIdx > 0 && weaponIdx <= len(weaponList) {
			return weaponList[weaponIdx-1]
		}
		fmt.Println("Invalid selection, please try again.")
	}
}

func (i *Investigator) ChooseAction(engine *combat.CombatEngine) combat.Action {
	reader := bufio.NewReader(os.Stdin)

	fmt.Printf("\nChoose action for %s:\n", i.GetName())
	fmt.Println("1. Attack")
	fmt.Println("2. Dodge")
	fmt.Println("3. Fight Back")
	fmt.Println("4. Move")

	fmt.Print("Enter action number: ")
	actionStr, _ := reader.ReadString('\n')
	actionStr = strings.TrimSpace(actionStr)
	actionNum, err := strconv.Atoi(actionStr)
	if err != nil || actionNum < 1 || actionNum > 4 {
		panic(err)
		// fmt.Println("Invalid selection. Defaulting to Move.")
		// actionNum = 4 // Default to Move
	}

	switch actionNum {
	case 1:
		// Attack: prompt for weapon selection and target selection
		weapon := i.selectWeapon()
		target := i.selectTarget(engine)
		return combat.Action{Type: combat.Attack, Target: target, Weapon: weapon}
	case 2:
		return combat.Action{Type: combat.Dodge}
	case 3:
		return combat.Action{Type: combat.FightBack}
	default:
		return combat.Action{Type: combat.Move}
	}
}

func (i *Investigator) ReceiveDamage(damage uint8) (bool, error) {
	i.HP.Value -= utils.Point(damage)
	if i.HP.Value <= 0 {
		return false, fmt.Errorf("%s has been defeated", i.Info.Name)
	}
	return damage >= uint8(i.HP.Value/2), nil // Major wound if damage >= half of HP
}

func (i *Investigator) SetIsPlayerControlled(is bool) {
	i.isPlayerControlled = is
}

func (i *Investigator) IsPlayerControlled() bool {
	return i.isPlayerControlled
}

func (i *Investigator) GetSkillLevel(skillName string) uint8 {
	if skill, exists := i.Skills[skillName]; exists {
		return uint8(skill.Level)
	}
	return 0
}

func (i *Investigator) GetDamageBonus() int8 {
	return i.Combat.DamageBonus
}

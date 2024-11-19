package combat

import (
	"bufio"
	"fmt"
	"os"
	"sort"
)

type CombatEngine struct {
	Actors []Actor
	Turns  []Actor
	Turn   int
}

func NewCombatEngine(actors []Actor) *CombatEngine {
	engine := &CombatEngine{
		Actors: actors,
		Turn:   1,
	}
	engine.setupTurns()
	return engine
}

func (e *CombatEngine) setupTurns() {
	// Sort actors by DEX in descending order (highest DEX acts first)
	sort.Slice(e.Actors, func(i, j int) bool {
		return e.Actors[i].GetDex() > e.Actors[j].GetDex()
	})
	e.Turns = e.Actors
}

func (e *CombatEngine) StartCombat() {
	fmt.Println("Starting combat...")
	for e.Turn = 1; ; e.Turn++ {
		fmt.Printf("\n-- Turn %d --\n", e.Turn)
		for _, actor := range e.Turns {
			if actor.IsAlive() {
				fmt.Println("\nPress Enter to continue to the next actor's turn...")
				bufio.NewReader(os.Stdin).ReadString('\n')

				e.processTurn(actor)
				if e.checkStopConditions() {
					fmt.Println("Combat has ended.")
					return
				}
			}
		}
	}
}

func (e *CombatEngine) processTurn(actor Actor) {
	fmt.Printf("\n%s's turn (DEX %d)\n", actor.GetName(), actor.GetDex())
	action := actor.ChooseAction(e)

	switch action.Type {
	case Attack:
		e.resolveAttack(actor, action)
	case Dodge:
		fmt.Printf("%s is ready to Dodge.\n", actor.GetName())
	case FightBack:
		fmt.Printf("%s is prepared to Fight Back.\n", actor.GetName())
	case Move:
		fmt.Printf("%s moves.\n", actor.GetName())
	default:
		fmt.Println("Unknown action.")
	}
}

func (e *CombatEngine) checkStopConditions() bool {
	allPlayersDefeated := true
	allEnemiesDefeated := true

	for _, actor := range e.Actors {
		if actor.IsAlive() {
			if actor.IsPlayerControlled() {
				allPlayersDefeated = false
			} else {
				allEnemiesDefeated = false
			}
		}
	}

	if allPlayersDefeated {
		fmt.Println("All players have been defeated.")
		return true
	} else if allEnemiesDefeated {
		fmt.Println("All enemies have been defeated.")
		return true
	}
	return false
}

func (e *CombatEngine) resolveAttack(attacker Actor, action Action) {
	if action.Weapon == nil {
		fmt.Printf("%s has no weapon selected for the attack, attack fails.\n", attacker.GetName())
		return
	}

	fmt.Printf("%s attacks %s with %s\n", attacker.GetName(), action.Target.GetName(), action.Weapon.Name)

	// Retrieve the attacker's skill level based on the weapon's associated skill
	attackerSkillLevel := attacker.GetSkillLevel(action.Weapon.SkillName)
	if attackerSkillLevel == 0 {
		fmt.Printf("%s has no skill level for %s, attack fails.\n", attacker.GetName(), action.Weapon.SkillName)
		return
	}

	// Determine success level of the attack roll
	successLevel, roll, err := RollSuccessLevel(attackerSkillLevel)
	if err != nil {
		fmt.Printf("Error during success roll: %v\n", err)
		return
	}
	fmt.Printf("Roll: %d, Success Level: %s\n", roll, successLevel)

	// Check if the attack succeeds
	if successLevel != "Fail" {
		// Calculate total damage (weapon damage + damage bonus)
		damage := action.Weapon.Damage.RollDamage() + int(attacker.GetDamageBonus())
		if damage < 0 {
			damage = 0 // Negative damage doesn't make sense
		} else if damage > 255 {
			damage = 255 // Cap the value to the max uint8 value
		}

		// Apply damage to target and check for major wound
		majorWound, _ := action.Target.ReceiveDamage(uint8(damage))

		fmt.Printf("%s takes %d damage\n", action.Target.GetName(), damage)

		if majorWound {
			fmt.Printf("%s receives a major wound!\n", action.Target.GetName())
			// Change major wound value
		}
	} else {
		fmt.Printf("%s missed!\n", attacker.GetName())
	}
}

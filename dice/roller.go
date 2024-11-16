package dice

import (
	"math/rand"
	"sync"
	"time"
)

type DiceRoller struct {
	rng *rand.Rand
}

var (
	once       sync.Once
	diceRoller *DiceRoller
)

func GetDiceRoller() *DiceRoller {
	once.Do(func() {
		seed := time.Now().UnixNano()
		diceRoller = &DiceRoller{
			rng: rand.New(rand.NewSource(seed)),
		}
	})
	return diceRoller
}

func (dr *DiceRoller) RollDx(sides int) int {
	if sides < 1 {
		panic("Dice must have at least one side")
	}
	return dr.rng.Intn(sides) + 1
}

func (dr *DiceRoller) RollMultipleDice(sides, count, constant int) []int {
	if sides < 1 || count < 1 {
		panic("Dice and count must be at least 1")
	}
	results := make([]int, count)
	for i := 0; i < count; i++ {
		results[i] = dr.RollDx(sides) + constant
	}
	return results
}

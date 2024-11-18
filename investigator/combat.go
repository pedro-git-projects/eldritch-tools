package investigator

import (
	"fmt"

	"github.com/pedro-git-projects/eldritch-tools/utils"
)

type Combat struct {
	DamageBonus int8
	Build       int8
	Dodge       utils.Point
}

func (c Combat) PrintCombat() {
	fmt.Println("+----------------+-------+")
	fmt.Println("| Combat Stat    | Value |")
	fmt.Println("+----------------+-------+")
	fmt.Printf("| %-14s | %5d |\n", "Damage Bonus", c.DamageBonus)
	fmt.Printf("| %-14s | %5d |\n", "Build", c.Build)
	fmt.Printf("| %-14s | %5d |\n", "Dodge", c.Dodge)
	fmt.Printf("| %-14s | %5d |\n", "Dodge (Half)", c.Dodge.GetHalf())
	fmt.Printf("| %-14s | %5d |\n", "Dodge (Fifth)", c.Dodge.GetFifth())
	fmt.Println("+----------------+-------+")
}

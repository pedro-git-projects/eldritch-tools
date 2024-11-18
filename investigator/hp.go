package investigator

import (
	"fmt"

	"github.com/pedro-git-projects/eldritch-tools/utils"
)

type HP struct {
	Value       utils.Point
	MajorWound  bool
	Dying       bool
	Unconscious bool
}

func (h HP) PrintHP() {
	fmt.Println("+----------------+-------+")
	fmt.Println("| HP Attribute   | Value |")
	fmt.Println("+----------------+-------+")
	fmt.Printf("| %-14s | %5d |\n", "Value", h.Value)
	fmt.Printf("| %-14s | %5s |\n", "Major Wound", utils.Checkbox(h.MajorWound))
	fmt.Printf("| %-14s | %5s |\n", "Dying", utils.Checkbox(h.Dying))
	fmt.Printf("| %-14s | %5s |\n", "Unconscious", utils.Checkbox(h.Unconscious))
	fmt.Println("+----------------+-------+")
}

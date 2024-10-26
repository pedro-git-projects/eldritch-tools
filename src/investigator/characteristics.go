package investigator

import (
	"fmt"

	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

type Characteristics struct {
	Str  utils.Point
	Dex  utils.Point
	Int  utils.Point
	Con  utils.Point
	App  utils.Point
	Pow  utils.Point
	Siz  utils.Point
	Edu  utils.Point
	Move utils.Point
}

func (c Characteristics) PrintCharacteristics() {
	fmt.Println("+-----------------+-------+")
	fmt.Println("| Attribute       | Value |")
	fmt.Println("+-----------------+-------+")
	fmt.Printf("| %-15s | %5d |\n", "Strength", c.Str)
	fmt.Printf("| %-15s | %5d |\n", "Dexterity", c.Dex)
	fmt.Printf("| %-15s | %5d |\n", "Intelligence", c.Int)
	fmt.Printf("| %-15s | %5d |\n", "Constitution", c.Con)
	fmt.Printf("| %-15s | %5d |\n", "Appearance", c.App)
	fmt.Printf("| %-15s | %5d |\n", "Power", c.Pow)
	fmt.Printf("| %-15s | %5d |\n", "Size", c.Siz)
	fmt.Printf("| %-15s | %5d |\n", "Education", c.Edu)
	fmt.Printf("| %-15s | %5d |\n", "Movement", c.Move)
	fmt.Println("+-----------------+-------+")
}

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
	fmt.Println("+---------------------------+-------+")
	fmt.Println("| Attribute                 | Value |")
	fmt.Println("+---------------------------+-------+")
	fmt.Printf("| %-25s | %5d |\n", "Strength", c.Str)
	fmt.Printf("| %-25s | %5d |\n", "Strength (Half)", c.Str.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Strength (Fifth)", c.Str.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Dexterity", c.Dex)
	fmt.Printf("| %-25s | %5d |\n", "Dexterity (Half)", c.Dex.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Dexterity (Fifth)", c.Dex.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Intelligence", c.Int)
	fmt.Printf("| %-25s | %5d |\n", "Intelligence (Half)", c.Int.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Intelligence (Fifth)", c.Int.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Constitution", c.Con)
	fmt.Printf("| %-25s | %5d |\n", "Constitution (Half)", c.Con.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Constitution (Fifth)", c.Con.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Appearance", c.App)
	fmt.Printf("| %-25s | %5d |\n", "Appearance (Half)", c.App.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Appearance (Fifth)", c.App.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Power", c.Pow)
	fmt.Printf("| %-25s | %5d |\n", "Power (Half)", c.Pow.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Power (Fifth)", c.Pow.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Size", c.Siz)
	fmt.Printf("| %-25s | %5d |\n", "Size (Half)", c.Siz.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Size (Fifth)", c.Siz.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Education", c.Edu)
	fmt.Printf("| %-25s | %5d |\n", "Education (Half)", c.Edu.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Education (Fifth)", c.Edu.GetFifth())
	fmt.Printf("| %-25s | %5d |\n", "Movement", c.Move)
	fmt.Printf("| %-25s | %5d |\n", "Movement (Half)", c.Move.GetHalf())
	fmt.Printf("| %-25s | %5d |\n", "Movement (Fifth)", c.Move.GetFifth())
	fmt.Println("+---------------------------+-------+")
}

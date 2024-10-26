package investigator

import (
	"fmt"

	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

type Sanity struct {
	Value       uint8
	TempInsane  bool
	IndefInsane bool
}

func (s Sanity) PrintSanity() {
	fmt.Println("+----------------+-------+")
	fmt.Println("| Sanity Status  | Value |")
	fmt.Println("+----------------+-------+")
	fmt.Printf("| %-14s | %5d |\n", "Sanity Value", s.Value)
	fmt.Printf("| %-14s | %5s |\n", "Temp Insane", utils.Checkbox(s.TempInsane))
	fmt.Printf("| %-14s | %5s |\n", "Indef Insane", utils.Checkbox(s.IndefInsane))
	fmt.Println("+----------------+-------+")
}

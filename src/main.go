package main

import (
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

func main() {
	i := new(investigator.Investigator)
	i.InitializeTwenties()
	i.Characteristics.PrintCharacteristics()
}

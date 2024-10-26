package main

import (
	"fmt"
	"log"

	"github.com/pedro-git-projects/necronomicon-engine/src/db"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

func main() {
	err := db.InitializeDB("./db/investigators.db")
	if err != nil {
		log.Fatal("Failed to initialize database:", err)
	}
	defer db.CloseDB()

	i := &investigator.Investigator{
		Info: investigator.Info{
			Name:       "John Doe",
			Player:     "Alice",
			Occupation: "Detective",
			Age:        35,
			Sex:        investigator.Male,
			Residence:  "Arkham",
			Birthplace: "Boston",
		},
		Luck: 50,
		MP:   10,
		Wealth: investigator.Wealth{
			SpendingLevel: 1000,
			Cash:          200,
			Assets:        5000,
		},
	}

	i.InitializeTwenties()

	fmt.Println("Original Investigator:")
	i.Print()

	err = i.Save()
	if err != nil {
		log.Fatal("Failed to save investigator:", err)
	}

	loadedInvestigator, err := investigator.LoadInvestigator(1)
	if err != nil {
		log.Fatal("Failed to load investigator:", err)
	}

	fmt.Println("\nLoaded Investigator from Database:")
	loadedInvestigator.Print()
}

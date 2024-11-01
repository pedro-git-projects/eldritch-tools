package investigator

import (
	"fmt"

	"necronomicon/utils"
)

type Meta struct {
	PersonalDescription           string
	Traits                        string
	IdeologyAndBeliefs            string
	SignificantPeople             string
	MeaningfulLocations           string
	TreasuredPosessions           string
	InjuriesAndScars              string
	PhobiasAndManias              string
	ArcaneTomesSpellsAndArtifacts string
	EncountersWithStrangeEntities string
}

func (m *Meta) UpdateMeta(personalDescription, traits, ideologyAndBeliefs, significantPeople, meaningfulLocations, treasuredPosessions, injuriesAndScars, phobiasAndManias, arcaneTomesSpellsAndArtifacts, encountersWithStrangeEntities string) {
	m.PersonalDescription = personalDescription
	m.Traits = traits
	m.IdeologyAndBeliefs = ideologyAndBeliefs
	m.SignificantPeople = significantPeople
	m.MeaningfulLocations = meaningfulLocations
	m.TreasuredPosessions = treasuredPosessions
	m.InjuriesAndScars = injuriesAndScars
	m.PhobiasAndManias = phobiasAndManias
	m.ArcaneTomesSpellsAndArtifacts = arcaneTomesSpellsAndArtifacts
	m.EncountersWithStrangeEntities = encountersWithStrangeEntities
}

func (m *Meta) GetMeta() Meta {
	return *m
}

func (m Meta) PrintMeta() {
	fmt.Println("===================================")
	fmt.Println("          Investigator Meta        ")
	fmt.Println("===================================")
	fmt.Printf("Personal Description:\n%s\n\n", utils.WrapText(m.PersonalDescription, 50))
	fmt.Printf("Traits:\n%s\n\n", utils.WrapText(m.Traits, 50))
	fmt.Printf("Ideology and Beliefs:\n%s\n\n", utils.WrapText(m.IdeologyAndBeliefs, 50))
	fmt.Printf("Significant People:\n%s\n\n", utils.WrapText(m.SignificantPeople, 50))
	fmt.Printf("Meaningful Locations:\n%s\n\n", utils.WrapText(m.MeaningfulLocations, 50))
	fmt.Printf("Treasured Possessions:\n%s\n\n", utils.WrapText(m.TreasuredPosessions, 50))
	fmt.Printf("Injuries and Scars:\n%s\n\n", utils.WrapText(m.InjuriesAndScars, 50))
	fmt.Printf("Phobias and Manias:\n%s\n\n", utils.WrapText(m.PhobiasAndManias, 50))
	fmt.Printf("Arcane Tomes, Spells, and Artifacts:\n%s\n\n", utils.WrapText(m.ArcaneTomesSpellsAndArtifacts, 50))
	fmt.Printf("Encounters with Strange Entities:\n%s\n\n", utils.WrapText(m.EncountersWithStrangeEntities, 50))
	fmt.Println("===================================")
}

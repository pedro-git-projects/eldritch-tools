package investigator

import (
	"fmt"
	"math/rand"
	"necronomicon/utils"
)

type Skill struct {
	Name       string
	BaseChance utils.Point
	Level      utils.Point
}

func NewSkill(name string, baseChance utils.Point) *Skill {
	return &Skill{
		Name:       name,
		BaseChance: baseChance,
		Level:      baseChance,
	}
}

func (s *Skill) SkillCheck() bool {
	roll := rand.Intn(100) + 1
	return roll <= int(s.Level)
}

func (s *Skill) SetLevel(level int) {
	s.Level = utils.Point(level)
}

func (i *Investigator) GetSkills() []Skill {
	skills := []Skill{}
	for _, skill := range i.Skills {
		skills = append(skills, Skill{
			Name:       skill.Name,
			BaseChance: skill.BaseChance,
			Level:      skill.Level,
		})
	}
	return skills
}

func (i *Investigator) PrintSkills() {
	fmt.Println("+--------------------------+------------+--------+")
	fmt.Println("| Skill Name               | Base Chance| Level  |")
	fmt.Println("+--------------------------+------------+--------+")

	for _, skill := range i.Skills {
		fmt.Printf("| %-24s | %10d | %6d |\n", skill.Name, skill.BaseChance, skill.Level)
	}

	fmt.Println("+--------------------------+------------+--------+")
}

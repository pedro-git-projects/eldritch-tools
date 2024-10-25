package investigator

import (
	"math/rand"

	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
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

// returns true if successfull
func (s *Skill) SkillCheck() bool {
	roll := rand.Intn(100) + 1
	return roll <= int(s.Level)
}

// SetLevel allows setting a custom skill level above the base chance
func (s *Skill) SetLevel(level int) {
	s.Level = utils.Point(level)
}

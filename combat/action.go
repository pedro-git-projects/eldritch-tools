package combat

import "github.com/pedro-git-projects/necronomicon-engine/src/commons"

type ActionType int

const (
	Attack ActionType = iota
	Dodge
	FightBack
	Move
)

type Action struct {
	Type         ActionType
	Target       Actor
	Weapon       *commons.Weapon
	SuccessLevel string // Regular, Hard, Extreme, Critical
}

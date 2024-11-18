package combat

import "github.com/pedro-git-projects/eldritch-tools/weapons"

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
	Weapon       *weapons.Weapon
	SuccessLevel string // Regular, Hard, Extreme, Critical
}

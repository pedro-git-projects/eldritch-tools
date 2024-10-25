package investigator

import "github.com/pedro-git-projects/necronomicon-engine/src/utils"

type HP struct {
	Value       utils.Point
	MajorWound  bool
	Dying       bool
	Unconscious bool
}

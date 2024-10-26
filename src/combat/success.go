package combat

import (
	"errors"

	"github.com/pedro-git-projects/necronomicon-engine/src/dice"
	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

func RollSuccessLevel(skillLevel uint8) (string, uint8, error) {
	if skillLevel == 0 {
		return "", 0, errors.New("invalid skill level: cannot be zero")
	}
	rollInt := dice.GetDiceRoller().RollDx(100)
	roll, err := utils.SafeIntToUint8(rollInt, "RollSuccessLevel")
	if err != nil {
		return "", 0, err
	}
	switch {
	case roll == 1:
		return "Critical", roll, nil
	case roll <= skillLevel/5:
		return "Extreme", roll, nil
	case roll <= skillLevel/2:
		return "Hard", roll, nil
	case roll <= skillLevel:
		return "Regular", roll, nil
	default:
		return "Fail", roll, nil
	}
}

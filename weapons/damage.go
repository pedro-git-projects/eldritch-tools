package weapons

import (
	"encoding/json"
	"fmt"

	"github.com/labstack/gommon/log"
	"github.com/pedro-git-projects/eldritch-tools/dice"
)

type Damage struct {
	NumDice     uint8 `json:"numDice"`
	Sides       uint8 `json:"sides"`
	Modifier    int8  `json:"modifier"`
	DamageBonus int8  `json:"damageBonus"`
}

func (d *Damage) RollDamage() int {
	dr := dice.GetDiceRoller()
	total := 0
	for i := 0; i < int(d.NumDice); i++ {
		total += dr.RollDx(int(d.Sides))
	}
	total += int(d.Modifier) + int(d.DamageBonus)
	return total
}

func (d Damage) MarshalJSON() ([]byte, error) {
	var formatted string

	if d.Modifier >= 0 {
		formatted = fmt.Sprintf("%dd%d+%d", d.NumDice, d.Sides, d.Modifier)
	} else {
		formatted = fmt.Sprintf("%dd%d%d", d.NumDice, d.Sides, d.Modifier)
	}

	if d.DamageBonus > 0 {
		formatted += fmt.Sprintf("+%d", d.DamageBonus)
	} else if d.DamageBonus < 0 {
		formatted += fmt.Sprintf("%d", d.DamageBonus)
	}

	log.Error("DEBUG::MARSHALING TO ", formatted)

	return json.Marshal(formatted)
}

func (d *Damage) UnmarshalJSON(data []byte) error {
	log.Error("DEBUG::", string(data))
	var formatted string
	if err := json.Unmarshal(data, &formatted); err != nil {
		return err
	}

	var numDice, sides uint8
	var modifier, damageBonus int8

	if _, err := fmt.Sscanf(formatted, "%dd%d%[+-]%d%[+-]%d", &numDice, &sides, &modifier, &damageBonus); err == nil {
		d.NumDice = numDice
		d.Sides = sides
		d.Modifier = modifier
		d.DamageBonus = damageBonus
		return nil
	}

	if _, err := fmt.Sscanf(formatted, "%dd%d%[+-]%d", &numDice, &sides, &modifier); err == nil {
		d.NumDice = numDice
		d.Sides = sides
		d.Modifier = modifier
		d.DamageBonus = 0
		return nil
	}

	if _, err := fmt.Sscanf(formatted, "%dd%d", &numDice, &sides); err == nil {
		d.NumDice = numDice
		d.Sides = sides
		d.Modifier = 0
		d.DamageBonus = 0
		return nil
	}

	return fmt.Errorf("invalid damage format: %s", formatted)
}

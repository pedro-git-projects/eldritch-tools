package investigator

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/pedro-git-projects/necronomicon-engine/src/db"
)

func toJSON(v interface{}) (string, error) {
	data, err := json.Marshal(v)
	if err != nil {
		return "", fmt.Errorf("failed to serialize data: %w", err)
	}
	return string(data), nil
}

func (i *Investigator) Save() error {
	db := db.GetDB()

	// Serialize fields
	characteristicsJSON, err := toJSON(i.Characteristics)
	if err != nil {
		return err
	}
	hpJSON, err := toJSON(i.HP)
	if err != nil {
		return err
	}
	sanityJSON, err := toJSON(i.Sanity)
	if err != nil {
		return err
	}
	combatJSON, err := toJSON(i.Combat)
	if err != nil {
		return err
	}
	metaJSON, err := toJSON(i.Meta)
	if err != nil {
		return err
	}
	weaponsJSON, err := toJSON(i.Weapons)
	if err != nil {
		return err
	}
	skillsJSON, err := toJSON(i.Skills)
	if err != nil {
		return err
	}
	possessionsJSON, err := toJSON(i.Possessions)
	if err != nil {
		return err
	}
	wealthJSON, err := toJSON(i.Wealth)
	if err != nil {
		return err
	}

	_, err = db.Exec(`
		INSERT INTO investigators 
		(name, player, occupation, age, sex, residence, birthplace, 
		characteristics, hp, sanity, combat, meta, weapons, skills, possessions, 
		luck, mp, wealth)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
		i.Info.Name, i.Info.Player, i.Info.Occupation, i.Info.Age, i.Info.Sex,
		i.Info.Residence, i.Info.Birthplace,
		characteristicsJSON, hpJSON, sanityJSON, combatJSON, metaJSON,
		weaponsJSON, skillsJSON, possessionsJSON,
		i.Luck, i.MP, wealthJSON,
	)
	if err != nil {
		return fmt.Errorf("could not insert investigator: %w", err)
	}

	return nil
}

func LoadInvestigator(id int) (*Investigator, error) {
	db := db.GetDB()

	row := db.QueryRow(`
		SELECT name, player, occupation, age, sex, residence, birthplace, 
		characteristics, hp, sanity, combat, meta, weapons, skills, possessions, 
		luck, mp, wealth 
		FROM investigators WHERE id = ?;`, id)

	var i Investigator
	var characteristicsJSON, hpJSON, sanityJSON, combatJSON, metaJSON, weaponsJSON, skillsJSON, possessionsJSON, wealthJSON string

	err := row.Scan(
		&i.Info.Name, &i.Info.Player, &i.Info.Occupation, &i.Info.Age, &i.Info.Sex,
		&i.Info.Residence, &i.Info.Birthplace,
		&characteristicsJSON, &hpJSON, &sanityJSON, &combatJSON, &metaJSON,
		&weaponsJSON, &skillsJSON, &possessionsJSON,
		&i.Luck, &i.MP, &wealthJSON,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("investigator not found")
		}
		return nil, fmt.Errorf("could not load investigator: %w", err)
	}

	// Deserialize JSON fields
	err = json.Unmarshal([]byte(characteristicsJSON), &i.Characteristics)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize characteristics: %w", err)
	}

	err = json.Unmarshal([]byte(hpJSON), &i.HP)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize hp: %w", err)
	}

	err = json.Unmarshal([]byte(sanityJSON), &i.Sanity)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize sanity: %w", err)
	}

	err = json.Unmarshal([]byte(combatJSON), &i.Combat)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize combat: %w", err)
	}

	err = json.Unmarshal([]byte(metaJSON), &i.Meta)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize meta: %w", err)
	}

	err = json.Unmarshal([]byte(weaponsJSON), &i.Weapons)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize weapons: %w", err)
	}

	err = json.Unmarshal([]byte(skillsJSON), &i.Skills)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize skills: %w", err)
	}

	err = json.Unmarshal([]byte(possessionsJSON), &i.Possessions)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize possessions: %w", err)
	}

	err = json.Unmarshal([]byte(wealthJSON), &i.Wealth)
	if err != nil {
		return nil, fmt.Errorf("could not deserialize wealth: %w", err)
	}

	return &i, nil
}

package investigator

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"necronomicon/db"
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

	portraitBase64 := base64.StdEncoding.EncodeToString(i.Info.Portrait)
	fmt.Println("Debugging INSERT values:")
	fmt.Println("Name:", i.Info.Name)
	fmt.Println("Player:", i.Info.Player)
	fmt.Println("Occupation:", i.Info.Occupation)
	fmt.Println("Age:", i.Info.Age)
	fmt.Println("Sex:", i.Info.Sex)
	fmt.Println("Residence:", i.Info.Residence)
	fmt.Println("Birthplace:", i.Info.Birthplace)
	fmt.Println("Characteristics JSON:", characteristicsJSON)
	fmt.Println("HP JSON:", hpJSON)
	fmt.Println("Sanity JSON:", sanityJSON)
	fmt.Println("Combat JSON:", combatJSON)
	fmt.Println("Meta JSON:", metaJSON)
	fmt.Println("Weapons JSON:", weaponsJSON)
	fmt.Println("Skills JSON:", skillsJSON)
	fmt.Println("Possessions JSON:", possessionsJSON)
	fmt.Println("Luck:", i.Luck)
	fmt.Println("MP:", i.MP)
	fmt.Println("Wealth JSON:", wealthJSON)
	//	fmt.Println("Portrait (Base64):", portraitBase64)
	_, err = db.Exec(`
		INSERT INTO investigators 
		(name, player, occupation, age, sex, residence, birthplace, 
		characteristics, hp, sanity, combat, meta, weapons, skills, possessions, 
		luck, mp, wealth, portrait)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
		i.Info.Name, i.Info.Player, i.Info.Occupation, i.Info.Age, i.Info.Sex,
		i.Info.Residence, i.Info.Birthplace,
		characteristicsJSON, hpJSON, sanityJSON, combatJSON, metaJSON,
		weaponsJSON, skillsJSON, possessionsJSON,
		i.Luck, i.MP, wealthJSON,
		portraitBase64,
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
		luck, mp, wealth, portrait 
		FROM investigators WHERE id = ?;`, id)

	var i Investigator
	var characteristicsJSON, hpJSON, sanityJSON, combatJSON, metaJSON, weaponsJSON, skillsJSON, possessionsJSON, wealthJSON, portraitBase64 string

	err := row.Scan(
		&i.Info.Name, &i.Info.Player, &i.Info.Occupation, &i.Info.Age, &i.Info.Sex,
		&i.Info.Residence, &i.Info.Birthplace,
		&characteristicsJSON, &hpJSON, &sanityJSON, &combatJSON, &metaJSON,
		&weaponsJSON, &skillsJSON, &possessionsJSON,
		&i.Luck, &i.MP, &wealthJSON, &portraitBase64,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("investigator not found")
		}
		return nil, fmt.Errorf("could not load investigator: %w", err)
	}

	// Decode the base64-encoded portrait
	i.Info.Portrait, err = base64.StdEncoding.DecodeString(portraitBase64)
	if err != nil {
		return nil, fmt.Errorf("could not decode portrait: %w", err)
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

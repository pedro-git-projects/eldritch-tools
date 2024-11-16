package db

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"necronomicon/models"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func InitializeDB(dbPath string) error {

	dir := filepath.Dir(dbPath)
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		if err := os.MkdirAll(dir, os.ModePerm); err != nil {
			return fmt.Errorf("failed to create directory for database: %w", err)
		}
	}

	var err error
	db, err = sql.Open("sqlite3", dbPath)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	createTableQuery := `
	CREATE TABLE IF NOT EXISTS investigators (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		player TEXT,
		occupation TEXT,
		age INTEGER,
		sex TEXT,
		residence TEXT,
		birthplace TEXT,
		
		characteristics TEXT,
		hp TEXT,
		sanity TEXT,
		combat TEXT,
		meta TEXT,
		weapons TEXT,
		skills TEXT,
		possessions TEXT,
		
		luck INTEGER,
		mp INTEGER,
		wealth TEXT,

		portrait TEXT 
	);
	`
	_, err = db.Exec(createTableQuery)
	if err != nil {
		return fmt.Errorf("failed to create table: %w", err)
	}

	return nil
}

func GetDB() *sql.DB {
	return db
}

func CloseDB() error {
	return db.Close()
}

func GetAllInvestigators() ([]models.Investigator, error) {
	rows, err := db.Query(`
		SELECT id, name, player, occupation, age, sex, residence, birthplace, 
		       characteristics, hp, sanity, combat, meta, weapons, skills, possessions, 
		       luck, mp, wealth, portrait 
		FROM investigators
	`)
	if err != nil {
		return nil, fmt.Errorf("failed to query investigators: %w", err)
	}
	defer rows.Close()

	var investigators []models.Investigator
	for rows.Next() {
		var investigator models.Investigator
		var portraitData []byte

		// Use intermediate string variables for JSON fields
		var characteristics, hp, sanity, combat, meta, weapons, skills, possessions, wealth string

		err := rows.Scan(
			&investigator.ID, &investigator.Name, &investigator.Player, &investigator.Occupation,
			&investigator.Age, &investigator.Sex, &investigator.Residence, &investigator.Birthplace,
			&characteristics, &hp, &sanity, &combat, &meta, &weapons, &skills, &possessions,
			&investigator.Luck, &investigator.MP, &wealth, &portraitData,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan investigator: %w", err)
		}

		// Convert strings to json.RawMessage
		investigator.Characteristics = json.RawMessage(characteristics)
		investigator.HP = json.RawMessage(hp)
		investigator.Sanity = json.RawMessage(sanity)
		investigator.Combat = json.RawMessage(combat)
		investigator.Meta = json.RawMessage(meta)
		investigator.Weapons = json.RawMessage(weapons)
		investigator.Skills = json.RawMessage(skills)
		investigator.Possessions = json.RawMessage(possessions)
		investigator.Wealth = json.RawMessage(wealth)

		// Convert portrait data to a base64 string
		if portraitData != nil {
			investigator.Portrait = "data:image/jpeg;base64," + base64.StdEncoding.EncodeToString(portraitData)
		}

		investigators = append(investigators, investigator)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	return investigators, nil
}

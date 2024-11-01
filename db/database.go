package db

import (
	"database/sql"
	"fmt"
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

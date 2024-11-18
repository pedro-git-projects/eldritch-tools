package main

import (
	"embed"
	"fmt"
	"log"
	"os"

	"github.com/pedro-git-projects/eldritch-tools/utils"

	"github.com/pedro-git-projects/eldritch-tools/investigator"

	"github.com/pedro-git-projects/eldritch-tools/dice"

	"github.com/pedro-git-projects/eldritch-tools/db"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed assets/portrait.jpg
var placeholderImage []byte

func main() {
	dbPath := "sqlite_db/necronomicon.db"

	if err := db.InitializeDB(dbPath); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}
	defer func() {
		if err := db.CloseDB(); err != nil {
			fmt.Fprintf(os.Stderr, "Error closing database: %v\n", err)
		}
	}()

	fmt.Println("Application started with database initialized.")

	// Create an instance of the app structure
	app := NewApp()
	info := investigator.Info{
		Name:       "",
		Player:     "",
		Occupation: "",
		Age:        1,
		Sex:        investigator.Male,
		Residence:  "",
		Birthplace: "",
		Portrait:   placeholderImage,
	}
	characteristics := investigator.Characteristics{
		Str:  utils.Point(0),
		Dex:  utils.Point(0),
		Int:  utils.Point(0),
		Con:  utils.Point(0),
		App:  utils.Point(0),
		Pow:  utils.Point(0),
		Siz:  utils.Point(0),
		Edu:  utils.Point(0),
		Move: utils.Point(0),
	}
	meta := investigator.Meta{}
	i, err := investigator.NewInvestigator(info, meta, characteristics)
	if err != nil {
		log.Fatal(err)
	}
	possesions := investigator.Possessions{}

	dr := dice.GetDiceRoller()

	// Print
	// Create application with options
	err = wails.Run(&options.App{
		Title:  "necronomicon",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 0, B: 0, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			&info,
			&characteristics,
			&possesions,
			&meta,
			i,
			dr,
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}

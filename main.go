package main

import (
	"embed"
	"log"
	"necronomicon/investigator"

	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
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
		Portrait:   make([]byte, 0),
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
			&meta,
			i,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

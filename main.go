package main

import (
	"embed"
	"necronomicon/investigator"

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
		Name:       "John Doe",
		Player:     "Player1",
		Occupation: "Engineer",
		Age:        30,
		Sex:        investigator.Male,
		Residence:  "New York",
		Birthplace: "Los Angeles",
	}

	// Print
	// Create application with options
	err := wails.Run(&options.App{
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
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
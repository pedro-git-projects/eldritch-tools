package main

import (
	"context"

	"github.com/pedro-git-projects/eldritch-tools/models"

	"github.com/pedro-git-projects/eldritch-tools/db"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetAllInvestigators() ([]models.Investigator, error) {
	return db.GetAllInvestigators()
}

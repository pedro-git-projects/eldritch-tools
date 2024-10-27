package screens

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"github.com/pedro-git-projects/necronomicon-engine/src/gui/forms"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

type CreateInvestigatorScreen struct {
	App      fyne.App
	Window   fyne.Window
	InfoForm *forms.InfoForm
}

// NewCreateInvestigatorScreen creates a new screen with the InfoForm
func NewCreateInvestigatorScreen(app fyne.App) *CreateInvestigatorScreen {
	window := app.NewWindow("Create Investigator")
	form := forms.NewInfoForm(func(info investigator.Info) {
		// Show a dialog instead of a system notification
		dialog.ShowInformation("Investigator Created", "Investigator "+info.Name+" has been created!", window)
	})

	screen := &CreateInvestigatorScreen{
		App:      app,
		Window:   window,
		InfoForm: form,
	}

	// Set the content of the window to the form's rendered layout
	window.SetContent(container.NewVBox(
		form.Render(),
	))

	return screen
}

// Show displays the CreateInvestigatorScreen
func (s *CreateInvestigatorScreen) Show() {
	s.Window.Show()
}

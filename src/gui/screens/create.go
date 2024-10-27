package screens

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"github.com/pedro-git-projects/necronomicon-engine/src/gui/forms"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

type CreateInvestigatorScreen struct {
	App                 fyne.App
	Window              fyne.Window
	InfoForm            *forms.InfoForm
	CharacteristicsForm *forms.CharacteristicsForm
	MetaForm            *forms.MetaForm
}

func NewCreateInvestigatorScreen(app fyne.App) *CreateInvestigatorScreen {
	window := app.NewWindow("Create Investigator")

	screen := &CreateInvestigatorScreen{
		App:    app,
		Window: window,
	}

	screen.InfoForm = forms.NewInfoForm(func(info investigator.Info) {
		screen.showCharacteristicsForm()
	})

	window.SetContent(container.NewVBox(
		screen.InfoForm.Render(),
	))

	return screen
}

func (s *CreateInvestigatorScreen) showCharacteristicsForm() {
	s.CharacteristicsForm = forms.NewCharacteristicsForm(func(characteristics investigator.Characteristics) {
		s.showMetaForm()
	})

	s.Window.SetContent(container.NewVBox(
		s.CharacteristicsForm.Render(),
	))
}

func (s *CreateInvestigatorScreen) showMetaForm() {
	s.MetaForm = forms.NewMetaForm(func(meta investigator.Meta) {
		dialog.ShowInformation("Success", "All data submitted successfully!", s.Window)
	})

	s.Window.SetContent(s.MetaForm.RenderWithWindow(s.Window))
}

func (s *CreateInvestigatorScreen) Show() {
	s.Window.Show()
}

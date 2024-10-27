package screens

import (
	"fyne.io/fyne/v2"
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
	SkillsForm          *forms.SkillsForm

	info            investigator.Info
	characteristics investigator.Characteristics
	meta            investigator.Meta

	investigator *investigator.Investigator
}

func NewCreateInvestigatorScreen(app fyne.App) *CreateInvestigatorScreen {
	window := app.NewWindow("Create Investigator")

	screen := &CreateInvestigatorScreen{
		App:    app,
		Window: window,
	}

	screen.InfoForm = forms.NewInfoForm(func(info investigator.Info) {
		screen.info = info
		screen.showCharacteristicsForm()
	})

	window.SetContent(screen.InfoForm.Render())
	return screen
}

func (s *CreateInvestigatorScreen) showCharacteristicsForm() {
	s.CharacteristicsForm = forms.NewCharacteristicsForm(func(characteristics investigator.Characteristics) {
		s.characteristics = characteristics
		s.showMetaForm()
	})

	s.Window.SetContent(s.CharacteristicsForm.Render())
}

func (s *CreateInvestigatorScreen) showMetaForm() {
	s.MetaForm = forms.NewMetaForm(func(meta investigator.Meta) {
		s.meta = meta
		s.createInvestigator()
	})

	s.Window.SetContent(s.MetaForm.RenderWithWindow(s.Window))
}

func (s *CreateInvestigatorScreen) createInvestigator() {
	investigator, err := investigator.NewInvestigator(s.info, s.meta, s.characteristics)
	if err != nil {
		dialog.ShowError(err, s.Window)
		return
	}

	s.investigator = investigator
	s.showSkillsForm()
}

func (s *CreateInvestigatorScreen) showSkillsForm() {
	s.SkillsForm = forms.NewSkillsForm(s.investigator, func(updatedSkills map[string]*investigator.Skill) {
		s.investigator.Skills = updatedSkills
		s.investigator.PrintSkills()
		s.investigator.InitWealth()
		s.investigator.Wealth.PrintWealth()
		dialog.ShowInformation("Success", "Investigator's skills updated successfully!", s.Window)
	})

	s.Window.SetContent(s.SkillsForm.RenderWithWindow(s.Window))
}

func (s *CreateInvestigatorScreen) Show() {
	s.Window.Show()
}

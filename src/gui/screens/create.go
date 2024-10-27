package screens

import (
	"fmt"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/widget"
	"github.com/pedro-git-projects/necronomicon-engine/src/commons"
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
	WeaponsForm         *forms.WeaponsForm

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

	screen.showInitialScreen()
	return screen
}

func (s *CreateInvestigatorScreen) showInitialScreen() {
	startButton := widget.NewButton("Create New Investigator", func() {
		s.showInfoForm()
	})

	// Center the button in both vertical and horizontal directions
	centered := container.NewCenter(startButton)
	s.Window.SetContent(centered)
}

func (s *CreateInvestigatorScreen) showInfoForm() {
	s.InfoForm = forms.NewInfoForm(func(info investigator.Info) {
		s.info = info
		s.showCharacteristicsForm()
	})

	s.Window.SetContent(s.InfoForm.Render())
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
		s.showWeaponsForm()
	})

	s.Window.SetContent(s.SkillsForm.RenderWithWindow(s.Window))
}

func (s *CreateInvestigatorScreen) showWeaponsForm() {
	s.WeaponsForm = forms.NewWeaponsForm(func(weapons map[string]*commons.Weapon) {
		for name, weapon := range weapons {
			s.investigator.Weapons[name] = weapon
		}
		err := s.investigator.Save()
		if err != nil {
			dialog.ShowError(fmt.Errorf("failed to save investigator: %w", err), s.Window)
			return
		}

		dialog.ShowInformation("Success", "Investigator created successfully!", s.Window)
		s.showInitialScreen()
	})

	s.Window.SetContent(s.WeaponsForm.RenderWithWindow(s.Window))
}

func (s *CreateInvestigatorScreen) Show() {
	s.Window.Show()
}

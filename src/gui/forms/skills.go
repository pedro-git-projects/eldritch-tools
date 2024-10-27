package forms

import (
	"fmt"
	"strconv"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

type SkillsForm struct {
	SkillsEntries map[string]*widget.Entry
	BaseValues    map[string]utils.Point
	SubmitButton  *widget.Button
	OnSubmit      func(updatedSkills map[string]*investigator.Skill)
}

func NewSkillsForm(investigator *investigator.Investigator, onSubmit func(updatedSkills map[string]*investigator.Skill)) *SkillsForm {
	form := &SkillsForm{
		SkillsEntries: make(map[string]*widget.Entry),
		BaseValues:    make(map[string]utils.Point),
		OnSubmit:      onSubmit,
	}

	for skillName, skill := range investigator.Skills {
		baseValue := skill.BaseChance
		form.BaseValues[skillName] = baseValue

		entry := widget.NewEntry()
		entry.SetPlaceHolder("")
		form.SkillsEntries[skillName] = entry
	}

	form.SubmitButton = widget.NewButton("Submit", form.handleSubmit)

	return form
}

func (f *SkillsForm) handleSubmit() {
	updatedSkills := make(map[string]*investigator.Skill)

	for skillName, entry := range f.SkillsEntries {
		baseValue := f.BaseValues[skillName]
		additionalPoints, err := strconv.Atoi(entry.Text)
		if err != nil || additionalPoints < 0 {
			additionalPoints = 0
		}

		totalValue := baseValue + utils.Point(additionalPoints)

		updatedSkills[skillName] = investigator.NewSkill(skillName, totalValue)
	}

	if f.OnSubmit != nil {
		f.OnSubmit(updatedSkills)
	}
}

func (f *SkillsForm) RenderWithWindow(win fyne.Window) fyne.CanvasObject {
	skillItems := make([]fyne.CanvasObject, 0)

	for skillName, entry := range f.SkillsEntries {
		baseValue := f.BaseValues[skillName]

		skillLabel := widget.NewLabel(fmt.Sprintf("%s (Base: %d%%)", skillName, baseValue))
		skillRow := container.NewHBox(skillLabel, entry)
		skillItems = append(skillItems, skillRow)
	}

	skillItems = append(skillItems, f.SubmitButton)

	content := container.NewVBox(skillItems...)
	scroll := container.NewVScroll(content)

	scroll.Resize(fyne.NewSize(win.Canvas().Size().Width, win.Canvas().Size().Height))
	win.Canvas().SetOnTypedKey(func(keyEvent *fyne.KeyEvent) {
		scroll.Resize(fyne.NewSize(win.Canvas().Size().Width, win.Canvas().Size().Height))
	})

	return scroll
}

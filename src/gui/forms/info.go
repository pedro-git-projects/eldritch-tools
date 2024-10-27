package forms

import (
	"strconv"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

type InfoForm struct {
	NameEntry       *widget.Entry
	PlayerEntry     *widget.Entry
	OccupationEntry *widget.Entry
	AgeEntry        *widget.Entry
	SexSelect       *widget.Select
	ResidenceEntry  *widget.Entry
	BirthplaceEntry *widget.Entry
	SubmitButton    *widget.Button
	OnSubmit        func(info investigator.Info)
}

func NewInfoForm(onSubmit func(info investigator.Info)) *InfoForm {
	form := &InfoForm{
		NameEntry:       widget.NewEntry(),
		PlayerEntry:     widget.NewEntry(),
		OccupationEntry: widget.NewEntry(),
		AgeEntry:        widget.NewEntry(),
		SexSelect:       widget.NewSelect([]string{"Male", "Female"}, func(value string) {}),
		ResidenceEntry:  widget.NewEntry(),
		BirthplaceEntry: widget.NewEntry(),
		OnSubmit:        onSubmit,
	}

	form.SubmitButton = widget.NewButton("Submit", form.handleSubmit)
	return form
}

func (f *InfoForm) handleSubmit() {
	age, err := strconv.Atoi(f.AgeEntry.Text)
	if err != nil {
		age = 0
	}

	var sex investigator.Sex
	switch f.SexSelect.Selected {
	case "Male":
		sex = investigator.Male
	case "Female":
		sex = investigator.Female
	}

	info := investigator.Info{
		Name:       f.NameEntry.Text,
		Player:     f.PlayerEntry.Text,
		Occupation: f.OccupationEntry.Text,
		Age:        uint(age),
		Sex:        sex,
		Residence:  f.ResidenceEntry.Text,
		Birthplace: f.BirthplaceEntry.Text,
	}
	info.PrintInfo()
	if f.OnSubmit != nil {
		f.OnSubmit(info)
	}
}

func (f *InfoForm) Render() fyne.CanvasObject {
	return container.NewVBox(
		widget.NewLabel("Name"), f.NameEntry,
		widget.NewLabel("Player"), f.PlayerEntry,
		widget.NewLabel("Occupation"), f.OccupationEntry,
		widget.NewLabel("Age"), f.AgeEntry,
		widget.NewLabel("Sex"), f.SexSelect,
		widget.NewLabel("Residence"), f.ResidenceEntry,
		widget.NewLabel("Birthplace"), f.BirthplaceEntry,
		f.SubmitButton,
	)
}

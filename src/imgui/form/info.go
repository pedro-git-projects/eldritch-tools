package form

import (
	"strconv"

	"gioui.org/layout"
	"gioui.org/unit"
	"gioui.org/widget"
	"gioui.org/widget/material"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

type InfoForm struct {
	NameEntry       widget.Editor
	PlayerEntry     widget.Editor
	OccupationEntry widget.Editor
	AgeEntry        widget.Editor
	SexMale         widget.Clickable
	SexFemale       widget.Clickable
	SelectedSex     string
	ResidenceEntry  widget.Editor
	BirthplaceEntry widget.Editor
	SubmitButton    widget.Clickable
	OnSubmit        func(info investigator.Info)
}

func NewInfoForm(onSubmit func(info investigator.Info)) *InfoForm {
	return &InfoForm{
		NameEntry:       widget.Editor{SingleLine: true},
		PlayerEntry:     widget.Editor{SingleLine: true},
		OccupationEntry: widget.Editor{SingleLine: true},
		AgeEntry:        widget.Editor{SingleLine: true},
		SelectedSex:     "Male",
		ResidenceEntry:  widget.Editor{SingleLine: true},
		BirthplaceEntry: widget.Editor{SingleLine: true},
		OnSubmit:        onSubmit,
	}
}

func (f *InfoForm) handleSubmit() {
	// Convert the age from string to integer
	age, err := strconv.Atoi(f.AgeEntry.Text())
	if err != nil {
		age = 0
	}

	// Determine selected sex
	var sex investigator.Sex
	switch f.SelectedSex {
	case "Male":
		sex = investigator.Male
	case "Female":
		sex = investigator.Female
	}

	// Create the Info struct
	info := investigator.Info{
		Name:       f.NameEntry.Text(),
		Player:     f.PlayerEntry.Text(),
		Occupation: f.OccupationEntry.Text(),
		Age:        uint(age),
		Sex:        sex,
		Residence:  f.ResidenceEntry.Text(),
		Birthplace: f.BirthplaceEntry.Text(),
	}
	info.PrintInfo()
	if f.OnSubmit != nil {
		f.OnSubmit(info)
	}
}

func (f *InfoForm) Layout(gtx layout.Context, th *material.Theme) layout.Dimensions {
	// Layout form components vertically
	return layout.Flex{Axis: layout.Vertical}.Layout(gtx,
		layout.Rigid(material.Label(th, unit.Sp(16), "Name").Layout),
		layout.Rigid(material.Editor(th, &f.NameEntry, "Enter name").Layout),
		layout.Rigid(material.Label(th, unit.Sp(16), "Player").Layout),
		layout.Rigid(material.Editor(th, &f.PlayerEntry, "Enter player").Layout),
		layout.Rigid(material.Label(th, unit.Sp(16), "Occupation").Layout),
		layout.Rigid(material.Editor(th, &f.OccupationEntry, "Enter occupation").Layout),
		layout.Rigid(material.Label(th, unit.Sp(16), "Age").Layout),
		layout.Rigid(material.Editor(th, &f.AgeEntry, "Enter age").Layout),
		layout.Rigid(material.Label(th, unit.Sp(16), "Sex").Layout),

		// Radio buttons for Sex selection
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return layout.Flex{Axis: layout.Horizontal, Spacing: layout.SpaceEnd}.Layout(gtx,
				layout.Rigid(func(gtx layout.Context) layout.Dimensions {
					btn := material.Button(th, &f.SexMale, "Male")
					if f.SexMale.Clicked(gtx) {
						f.SelectedSex = "Male"
					}
					return btn.Layout(gtx)
				}),
				layout.Rigid(func(gtx layout.Context) layout.Dimensions {
					btn := material.Button(th, &f.SexFemale, "Female")
					if f.SexFemale.Clicked(gtx) {
						f.SelectedSex = "Female"
					}
					return btn.Layout(gtx)
				}),
			)
		}),

		layout.Rigid(material.Label(th, unit.Sp(16), "Residence").Layout),
		layout.Rigid(material.Editor(th, &f.ResidenceEntry, "Enter residence").Layout),
		layout.Rigid(material.Label(th, unit.Sp(16), "Birthplace").Layout),
		layout.Rigid(material.Editor(th, &f.BirthplaceEntry, "Enter birthplace").Layout),

		// Submit button
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			btn := material.Button(th, &f.SubmitButton, "Next")
			if f.SubmitButton.Clicked(gtx) {
				f.handleSubmit()
			}
			return btn.Layout(gtx)
		}),
	)
}

package form

import (
	"image/color"
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
	SexEnum         widget.Enum
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
		SexEnum:         widget.Enum{Value: "Male"},
		SelectedSex:     "Male",
		ResidenceEntry:  widget.Editor{SingleLine: true},
		BirthplaceEntry: widget.Editor{SingleLine: true},
		OnSubmit:        onSubmit,
	}
}

func (f *InfoForm) handleSubmit() {
	age, err := strconv.Atoi(f.AgeEntry.Text())
	if err != nil {
		age = 0
	}
	var sex investigator.Sex
	switch f.SelectedSex {
	case "Male":
		sex = investigator.Male
	case "Female":
		sex = investigator.Female
	}
	info := investigator.Info{
		Name:       f.NameEntry.Text(),
		Player:     f.PlayerEntry.Text(),
		Occupation: f.OccupationEntry.Text(),
		Age:        uint(age),
		Sex:        sex,
		Residence:  f.ResidenceEntry.Text(),
		Birthplace: f.BirthplaceEntry.Text(),
	}
	if f.OnSubmit != nil {
		info.PrintInfo()
		f.OnSubmit(info)
	}
}

func (f *InfoForm) Layout(gtx layout.Context, th *material.Theme) layout.Dimensions {
	inset := layout.UniformInset(unit.Dp(8))
	buttonColor := color.NRGBA{R: 0x52, G: 0xa5, B: 0x93, A: 0xff}
	btnTextColor := color.NRGBA{R: 0xf0, G: 0xfa, B: 0xfd, A: 0xff}

	return layout.Flex{Axis: layout.Vertical}.Layout(gtx,
		layout.Rigid(material.Label(th, unit.Sp(20), "Personal Information").Layout),

		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return inset.Layout(gtx, material.Editor(th, &f.NameEntry, "Enter name").Layout)
		}),
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return inset.Layout(gtx, material.Editor(th, &f.PlayerEntry, "Enter player").Layout)
		}),
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return inset.Layout(gtx, material.Editor(th, &f.OccupationEntry, "Enter occupation").Layout)
		}),
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return inset.Layout(gtx, material.Editor(th, &f.AgeEntry, "Enter age").Layout)
		}),

		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return layout.Flex{Axis: layout.Horizontal, Spacing: layout.SpaceEnd}.Layout(gtx,
				layout.Rigid(material.Label(th, unit.Sp(16), "Sex: ").Layout),
				layout.Rigid(func(gtx layout.Context) layout.Dimensions {
					radioMale := material.RadioButton(th, &f.SexEnum, "Male", "Male")
					radioMale.Color = btnTextColor
					if f.SexEnum.Value == "Male" {
						f.SelectedSex = "Male"
					}
					return radioMale.Layout(gtx)
				}),
				layout.Rigid(func(gtx layout.Context) layout.Dimensions {
					radioFemale := material.RadioButton(th, &f.SexEnum, "Female", "Female")
					radioFemale.Color = btnTextColor
					if f.SexEnum.Value == "Female" {
						f.SelectedSex = "Female"
					}
					return radioFemale.Layout(gtx)
				}),
			)
		}),

		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return inset.Layout(gtx, material.Editor(th, &f.ResidenceEntry, "Enter residence").Layout)
		}),
		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			return inset.Layout(gtx, material.Editor(th, &f.BirthplaceEntry, "Enter birthplace").Layout)
		}),

		layout.Rigid(func(gtx layout.Context) layout.Dimensions {
			submit := material.Button(th, &f.SubmitButton, "Next")
			submit.Background = buttonColor
			submit.Color = btnTextColor
			submit.CornerRadius = unit.Dp(4)
			if f.SubmitButton.Clicked(gtx) {
				f.handleSubmit()
			}
			return inset.Layout(gtx, submit.Layout)
		}),
	)
}

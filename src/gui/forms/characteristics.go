package forms

import (
	"strconv"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

type CharacteristicsForm struct {
	StrEntry *widget.Entry
	DexEntry *widget.Entry
	IntEntry *widget.Entry
	ConEntry *widget.Entry
	AppEntry *widget.Entry
	PowEntry *widget.Entry
	SizEntry *widget.Entry
	EduEntry *widget.Entry
	//	MoveEntry    *widget.Entry
	SubmitButton *widget.Button
	OnSubmit     func(characteristics investigator.Characteristics)
}

func NewCharacteristicsForm(onSubmit func(characteristics investigator.Characteristics)) *CharacteristicsForm {
	form := &CharacteristicsForm{
		StrEntry: widget.NewEntry(),
		DexEntry: widget.NewEntry(),
		IntEntry: widget.NewEntry(),
		ConEntry: widget.NewEntry(),
		AppEntry: widget.NewEntry(),
		PowEntry: widget.NewEntry(),
		SizEntry: widget.NewEntry(),
		EduEntry: widget.NewEntry(),
		// MoveEntry: widget.NewEntry(),
		OnSubmit: onSubmit,
	}

	form.SubmitButton = widget.NewButton("Submit", form.handleSubmit)
	return form
}

func (f *CharacteristicsForm) handleSubmit() {
	parsePoint := func(entry *widget.Entry) utils.Point {
		value, err := strconv.Atoi(entry.Text)
		if err != nil {
			value = 0
		}
		return utils.Point(value)
	}

	characteristics := investigator.Characteristics{
		Str: parsePoint(f.StrEntry),
		Dex: parsePoint(f.DexEntry),
		Int: parsePoint(f.IntEntry),
		Con: parsePoint(f.ConEntry),
		App: parsePoint(f.AppEntry),
		Pow: parsePoint(f.PowEntry),
		Siz: parsePoint(f.SizEntry),
		Edu: parsePoint(f.EduEntry),
		// Move: parsePoint(f.MoveEntry),
	}

	characteristics.PrintCharacteristics()

	if f.OnSubmit != nil {
		f.OnSubmit(characteristics)
	}
}

func (f *CharacteristicsForm) Render() fyne.CanvasObject {
	return container.NewVBox(
		widget.NewLabel("Strength (Str)"), f.StrEntry,
		widget.NewLabel("Dexterity (Dex)"), f.DexEntry,
		widget.NewLabel("Intelligence (Int)"), f.IntEntry,
		widget.NewLabel("Constitution (Con)"), f.ConEntry,
		widget.NewLabel("Appearance (App)"), f.AppEntry,
		widget.NewLabel("Power (Pow)"), f.PowEntry,
		widget.NewLabel("Size (Siz)"), f.SizEntry,
		widget.NewLabel("Education (Edu)"), f.EduEntry,
		// widget.NewLabel("Movement (Move)"), f.MoveEntry,
		f.SubmitButton,
	)
}

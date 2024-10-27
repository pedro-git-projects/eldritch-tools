package forms

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

type MetaForm struct {
	PersonalDescription           *widget.Entry
	Traits                        *widget.Entry
	IdeologyAndBeliefs            *widget.Entry
	SignificantPeople             *widget.Entry
	MeaningfulLocations           *widget.Entry
	TreasuredPosessions           *widget.Entry
	InjuriesAndScars              *widget.Entry
	PhobiasAndManias              *widget.Entry
	ArcaneTomesSpellsAndArtifacts *widget.Entry
	EncountersWithStrangeEntities *widget.Entry
	SubmitButton                  *widget.Button
	OnSubmit                      func(meta investigator.Meta)
}

func NewMetaForm(onSubmit func(meta investigator.Meta)) *MetaForm {
	form := &MetaForm{
		PersonalDescription:           widget.NewMultiLineEntry(),
		Traits:                        widget.NewMultiLineEntry(),
		IdeologyAndBeliefs:            widget.NewMultiLineEntry(),
		SignificantPeople:             widget.NewMultiLineEntry(),
		MeaningfulLocations:           widget.NewMultiLineEntry(),
		TreasuredPosessions:           widget.NewMultiLineEntry(),
		InjuriesAndScars:              widget.NewMultiLineEntry(),
		PhobiasAndManias:              widget.NewMultiLineEntry(),
		ArcaneTomesSpellsAndArtifacts: widget.NewMultiLineEntry(),
		EncountersWithStrangeEntities: widget.NewMultiLineEntry(),
		OnSubmit:                      onSubmit,
	}

	form.SubmitButton = widget.NewButton("Submit", form.handleSubmit)
	return form
}

func (f *MetaForm) handleSubmit() {
	meta := investigator.Meta{
		PersonalDescription:           f.PersonalDescription.Text,
		Traits:                        f.Traits.Text,
		IdeologyAndBeliefs:            f.IdeologyAndBeliefs.Text,
		SignificantPeople:             f.SignificantPeople.Text,
		MeaningfulLocations:           f.MeaningfulLocations.Text,
		TreasuredPosessions:           f.TreasuredPosessions.Text,
		InjuriesAndScars:              f.InjuriesAndScars.Text,
		PhobiasAndManias:              f.PhobiasAndManias.Text,
		ArcaneTomesSpellsAndArtifacts: f.ArcaneTomesSpellsAndArtifacts.Text,
		EncountersWithStrangeEntities: f.EncountersWithStrangeEntities.Text,
	}

	meta.PrintMeta()

	if f.OnSubmit != nil {
		f.OnSubmit(meta)
	}
}

func (f *MetaForm) RenderWithWindow(win fyne.Window) fyne.CanvasObject {
	c := container.NewVBox(
		widget.NewLabel("Personal Description"), f.PersonalDescription,
		widget.NewLabel("Traits"), f.Traits,
		widget.NewLabel("Ideology and Beliefs"), f.IdeologyAndBeliefs,
		widget.NewLabel("Significant People"), f.SignificantPeople,
		widget.NewLabel("Meaningful Locations"), f.MeaningfulLocations,
		widget.NewLabel("Treasured Possessions"), f.TreasuredPosessions,
		widget.NewLabel("Injuries and Scars"), f.InjuriesAndScars,
		widget.NewLabel("Phobias and Manias"), f.PhobiasAndManias,
		widget.NewLabel("Arcane Tomes, Spells, and Artifacts"), f.ArcaneTomesSpellsAndArtifacts,
		widget.NewLabel("Encounters with Strange Entities"), f.EncountersWithStrangeEntities,
		f.SubmitButton,
	)

	scroll := container.NewVScroll(c)

	// Adjust scroll container size based on the window size
	scroll.Resize(fyne.NewSize(win.Canvas().Size().Width, win.Canvas().Size().Height))

	// Listen for window resize events and update the scroll area accordingly
	win.Canvas().SetOnTypedKey(func(keyEvent *fyne.KeyEvent) {
		scroll.Resize(fyne.NewSize(win.Canvas().Size().Width, win.Canvas().Size().Height))
	})

	return scroll
}

func (f *MetaForm) Render() fyne.CanvasObject {
	c := container.NewVBox(
		widget.NewLabel("Personal Description"), f.PersonalDescription,
		widget.NewLabel("Traits"), f.Traits,
		widget.NewLabel("Ideology and Beliefs"), f.IdeologyAndBeliefs,
		widget.NewLabel("Significant People"), f.SignificantPeople,
		widget.NewLabel("Meaningful Locations"), f.MeaningfulLocations,
		widget.NewLabel("Treasured Possessions"), f.TreasuredPosessions,
		widget.NewLabel("Injuries and Scars"), f.InjuriesAndScars,
		widget.NewLabel("Phobias and Manias"), f.PhobiasAndManias,
		widget.NewLabel("Arcane Tomes, Spells, and Artifacts"), f.ArcaneTomesSpellsAndArtifacts,
		widget.NewLabel("Encounters with Strange Entities"), f.EncountersWithStrangeEntities,
		f.SubmitButton,
	)

	scroll := container.NewVScroll(c)
	scroll.SetMinSize(fyne.NewSize(400, 500))

	return scroll
}

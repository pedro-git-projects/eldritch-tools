package forms

import (
	"fmt"
	"strconv"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/pedro-git-projects/necronomicon-engine/src/commons"
)

type WeaponsForm struct {
	WeaponEntries []*WeaponEntry
	AddButton     *widget.Button
	SubmitButton  *widget.Button
	OnSubmit      func(weapons map[string]*commons.Weapon)
	Container     *fyne.Container
}

type WeaponEntry struct {
	NameEntry            *widget.Entry
	SkillNameEntry       *widget.Entry
	DamageEntry          *widget.Entry
	NumberOfAttacksEntry *widget.Entry
	RangeEntry           *widget.Entry
	AmmoEntry            *widget.Entry
	MalfEntry            *widget.Entry
	RemoveButton         *widget.Button
}

func NewWeaponsForm(onSubmit func(weapons map[string]*commons.Weapon)) *WeaponsForm {
	form := &WeaponsForm{
		WeaponEntries: []*WeaponEntry{},
		OnSubmit:      onSubmit,
	}

	form.addWeaponEntry()

	form.AddButton = widget.NewButton("Add Weapon", func() {
		form.addWeaponEntry()
		form.updateFormContent()
	})

	form.SubmitButton = widget.NewButton("Next", form.handleSubmit)

	form.Container = container.NewVBox()
	form.updateFormContent()

	return form
}

func (f *WeaponsForm) addWeaponEntry() {
	entry := &WeaponEntry{
		NameEntry:            widget.NewEntry(),
		SkillNameEntry:       widget.NewEntry(),
		DamageEntry:          widget.NewEntry(),
		NumberOfAttacksEntry: widget.NewEntry(),
		RangeEntry:           widget.NewEntry(),
		AmmoEntry:            widget.NewEntry(),
		MalfEntry:            widget.NewEntry(),
	}

	entry.RemoveButton = widget.NewButton("Remove", func() {
		f.removeWeaponEntry(entry)
	})

	f.WeaponEntries = append(f.WeaponEntries, entry)
}

func (f *WeaponsForm) removeWeaponEntry(entry *WeaponEntry) {
	for i, e := range f.WeaponEntries {
		if e == entry {
			f.WeaponEntries = append(f.WeaponEntries[:i], f.WeaponEntries[i+1:]...)
			break
		}
	}

	f.updateFormContent()
}

func (f *WeaponsForm) handleSubmit() {
	weapons := make(map[string]*commons.Weapon)

	for _, entry := range f.WeaponEntries {
		damage, _ := strconv.Atoi(entry.DamageEntry.Text)
		numAttacks, _ := strconv.Atoi(entry.NumberOfAttacksEntry.Text)
		rang, _ := strconv.Atoi(entry.RangeEntry.Text)
		ammo, _ := strconv.Atoi(entry.AmmoEntry.Text)
		malf, _ := strconv.Atoi(entry.MalfEntry.Text)

		weapon := commons.NewWeapon(
			entry.NameEntry.Text,
			entry.SkillNameEntry.Text,
			uint8(damage),
			commons.WithNumberOfAttacks(uint8(numAttacks)),
			commons.WithRange(uint8(rang)),
			commons.WithAmmo(uint8(ammo)),
			commons.WithMalf(uint8(malf)),
		)

		weapons[entry.NameEntry.Text] = weapon
	}

	if f.OnSubmit != nil {
		f.OnSubmit(weapons)
	}
}

func (f *WeaponsForm) updateFormContent() {
	weaponItems := make([]fyne.CanvasObject, 0)

	for i, entry := range f.WeaponEntries {
		weaponItems = append(weaponItems, container.NewVBox(
			widget.NewLabel(fmt.Sprintf("Weapon %d", i+1)),
			widget.NewLabel("Weapon Name"), entry.NameEntry,
			widget.NewLabel("Skill Name"), entry.SkillNameEntry,
			widget.NewLabel("Damage"), entry.DamageEntry,
			widget.NewLabel("Number of Attacks"), entry.NumberOfAttacksEntry,
			widget.NewLabel("Range"), entry.RangeEntry,
			widget.NewLabel("Ammo"), entry.AmmoEntry,
			widget.NewLabel("Malf"), entry.MalfEntry,
			entry.RemoveButton,
			widget.NewSeparator(),
		))
	}

	weaponItems = append(weaponItems, f.AddButton, f.SubmitButton)

	f.Container.Objects = weaponItems
	f.Container.Refresh()
}

func (f *WeaponsForm) RenderWithWindow(win fyne.Window) fyne.CanvasObject {
	scroll := container.NewVScroll(f.Container)

	scroll.Resize(fyne.NewSize(win.Canvas().Size().Width, win.Canvas().Size().Height))
	win.Canvas().SetOnTypedKey(func(keyEvent *fyne.KeyEvent) {
		scroll.Resize(fyne.NewSize(win.Canvas().Size().Width, win.Canvas().Size().Height))
	})

	return scroll
}

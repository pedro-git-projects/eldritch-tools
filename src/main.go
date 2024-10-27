package main

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"github.com/pedro-git-projects/necronomicon-engine/src/gui/theme"
)

func main() {
	a := app.New()
	a.Settings().SetTheme(&theme.Cthulhu{})
	w := a.NewWindow("Necronomicon")
	w.Resize(fyne.NewSize(400, 600))

	hello := widget.NewLabel("Hello Fyne!")
	w.SetContent(container.NewVBox(
		hello,
		widget.NewButton("Hi!", func() {
			hello.SetText("Welcome :)")
		}),
	))

	w.ShowAndRun()
	// player := &investigator.Investigator{}
	// player.Info.Name = "Player1"
	// player.SetIsPlayerControlled(true)
	// if err := player.InitializeTwenties(); err != nil {
	// 	fmt.Println("Error initializing player:", err)
	// 	return
	// }
	// player.Weapons["Sword"] = &commons.Weapon{Name: "Sword", Damage: 5, SkillName: "Fighting (Sword)"}
	// player.Characteristics.Dex = 40
	// player.HP.Value = 40
	//
	// npc := &investigator.Investigator{}
	// npc.Info.Name = "NPC1"
	// npc.SetIsPlayerControlled(false)
	// if err := npc.InitializeTwenties(); err != nil {
	// 	fmt.Println("Error initializing NPC:", err)
	// 	return
	// }
	// npc.Weapons["Club"] = &commons.Weapon{Name: "Club", Damage: 4, SkillName: "Fighting (Club)"}
	// npc.Characteristics.Dex = 20
	// npc.HP.Value = 40
	//
	// engine := combat.NewCombatEngine([]combat.Actor{player, npc})
	//
	// engine.StartCombat()
}

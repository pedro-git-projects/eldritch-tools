package main

import (
	"fmt"
	"log"
	"os"

	"gioui.org/app"
	"gioui.org/layout"
	"gioui.org/op"
	"github.com/pedro-git-projects/necronomicon-engine/src/db"
	"github.com/pedro-git-projects/necronomicon-engine/src/imgui/form"
	"github.com/pedro-git-projects/necronomicon-engine/src/imgui/theme"
	"github.com/pedro-git-projects/necronomicon-engine/src/investigator"
)

func main() {
	dbPath := "db/necronomicon.db"
	if err := db.InitializeDB(dbPath); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}
	defer func() {
		if err := db.CloseDB(); err != nil {
			fmt.Fprintf(os.Stderr, "Error closing database: %v\n", err)
		}
	}()

	fmt.Println("Application started with database initialized.")

	go func() {
		w := new(app.Window)
		if err := run(w); err != nil {
			log.Fatalf("Error running application: %v", err)
		}
	}()

	app.Main()
}

func run(w *app.Window) error {
	cthulhuTheme := theme.NewCthulhuTheme()

	var ops op.Ops
	infoForm := form.NewInfoForm(func(info investigator.Info) {
		fmt.Println("Submitted info:", info)
	})

	for {
		e := w.Event()
		switch e := e.(type) {
		case app.DestroyEvent:
			return e.Err
		case app.FrameEvent:
			ops.Reset()

			gtx := app.NewContext(&ops, e)
			layout.Flex{Axis: layout.Vertical}.Layout(gtx,
				layout.Rigid(func(gtx layout.Context) layout.Dimensions {
					return infoForm.Layout(gtx, cthulhuTheme.Theme)
				}),
			)

			e.Frame(&ops)
		}
	}
}

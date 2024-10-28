package theme

import (
	"image/color"

	"gioui.org/widget/material"
)

type CthulhuTheme struct {
	Theme *material.Theme

	Background         color.NRGBA
	Foreground         color.NRGBA
	Highlight          color.NRGBA
	ButtonBackground   color.NRGBA
	ButtonText         color.NRGBA
	CardBackground     color.NRGBA
	SecondaryText      color.NRGBA
	Accent             color.NRGBA
	MutedAccent        color.NRGBA
	Warning            color.NRGBA
	Success            color.NRGBA
	Info               color.NRGBA
	WarningText        color.NRGBA
	SubtleHighlight    color.NRGBA
	ContrastBackground color.NRGBA
	Danger             color.NRGBA
}

func NewCthulhuTheme() *CthulhuTheme {
	theme := material.NewTheme()

	cthulhu := &CthulhuTheme{
		Theme:              theme,
		Background:         color.NRGBA{R: 0x1d, G: 0x25, B: 0x31, A: 0xff}, // Dark background
		Foreground:         color.NRGBA{R: 0xa5, G: 0xe5, B: 0xc5, A: 0xff}, // Light foreground text
		Highlight:          color.NRGBA{R: 0xf0, G: 0xfa, B: 0xfd, A: 0xff}, // Highlight color
		ButtonBackground:   color.NRGBA{R: 0x2b, G: 0x62, B: 0x67, A: 0xff}, // Button background
		ButtonText:         color.NRGBA{R: 0xf0, G: 0xfa, B: 0xfd, A: 0xff}, // Button text
		CardBackground:     color.NRGBA{R: 0x1e, G: 0x30, B: 0x3a, A: 0xff}, // Card background
		SecondaryText:      color.NRGBA{R: 0x7e, G: 0x8d, B: 0xa1, A: 0xff}, // Secondary text
		Accent:             color.NRGBA{R: 0x7d, G: 0xc1, B: 0xc1, A: 0xff}, // Accent color
		MutedAccent:        color.NRGBA{R: 0x3b, G: 0x42, B: 0x51, A: 0xff}, // Muted accent
		Warning:            color.NRGBA{R: 0xe5, G: 0xde, B: 0xbb, A: 0xff}, // Warning color
		Success:            color.NRGBA{R: 0xc7, G: 0xff, B: 0xf3, A: 0xff}, // Success color
		Info:               color.NRGBA{R: 0x52, G: 0xa5, B: 0x93, A: 0xff}, // Information color
		WarningText:        color.NRGBA{R: 0xce, G: 0xa0, B: 0x61, A: 0xff}, // Warning text color (fixed)
		SubtleHighlight:    color.NRGBA{R: 0x8f, G: 0xa9, B: 0x90, A: 0xff}, // Subtle highlight for details
		ContrastBackground: color.NRGBA{R: 0xb8, G: 0xcb, B: 0xd8, A: 0xff}, // Background contrast for popups
		Danger:             color.NRGBA{R: 0x85, G: 0x47, B: 0x31, A: 0xff}, // Danger color for alerts
	}

	theme.Palette.Bg = cthulhu.Background
	theme.Palette.Fg = cthulhu.Foreground
	theme.Palette.ContrastBg = cthulhu.ButtonBackground
	theme.Palette.ContrastFg = cthulhu.ButtonText

	return cthulhu
}

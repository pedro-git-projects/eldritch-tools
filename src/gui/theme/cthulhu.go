package theme

import (
	"image/color"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/theme"
	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

var (
	DeepMidnightBlue  = utils.ParseHexColor("#1d2531") // Primary background
	EldritchGreen     = utils.ParseHexColor("#a5e5c5") // Accent color with a haunting glow
	PaleSpectralWhite = utils.ParseHexColor("#f0fafd") // Light text and selection background
	AncientSeaGreen   = utils.ParseHexColor("#52a593") // Primary button color
	AbyssalTeal       = utils.ParseHexColor("#2b6267") // Input background
	DarkOceanBlue     = utils.ParseHexColor("#1e303a") // Dark text on light background
	ShadowedCharcoal  = utils.ParseHexColor("#3b4251") // Hover color
	StormySkyBlue     = utils.ParseHexColor("#527b92") // Primary accent color
	MysticMint        = utils.ParseHexColor("#7dc1c1") // Placeholder text
	EtherealMist      = utils.ParseHexColor("#c7fff3") // Lighter hover color
	FadedMoonlight    = utils.ParseHexColor("#b8cbd8") // Disabled text
	GraveyardGray     = utils.ParseHexColor("#7e8da1") // Disabled button color
	AncientOliveGreen = utils.ParseHexColor("#8fa990") // Accent, softer green
	ParchmentBeige    = utils.ParseHexColor("#e5debb") // Primary text color
	AncientGold       = utils.ParseHexColor("#cea061") // Focus color
	DarkAmber         = utils.ParseHexColor("#854731") // Intense, haunting highlight
)

type Cthulhu struct{}

func (t Cthulhu) Color(name fyne.ThemeColorName, variant fyne.ThemeVariant) color.Color {
	switch name {
	case theme.ColorNameBackground:
		return DeepMidnightBlue
	case theme.ColorNameButton:
		return AncientSeaGreen
	case theme.ColorNameDisabledButton:
		return GraveyardGray
	case theme.ColorNameForeground:
		return ParchmentBeige
	case theme.ColorNameDisabled:
		return FadedMoonlight
	case theme.ColorNameInputBackground:
		return AbyssalTeal
	case theme.ColorNamePlaceHolder:
		return MysticMint
	case theme.ColorNameHover:
		return ShadowedCharcoal
	case theme.ColorNamePrimary:
		return EldritchGreen
	case theme.ColorNameFocus:
		return DarkAmber
	case theme.ColorNameSelection:
		return PaleSpectralWhite
	}
	return theme.DefaultTheme().Color(name, variant)
}

func (t Cthulhu) Font(style fyne.TextStyle) fyne.Resource {
	return theme.DefaultTheme().Font(style)
}

func (t Cthulhu) Icon(name fyne.ThemeIconName) fyne.Resource {
	return theme.DefaultTheme().Icon(name)
}

func (t Cthulhu) Size(name fyne.ThemeSizeName) float32 {
	return theme.DefaultTheme().Size(name)
}

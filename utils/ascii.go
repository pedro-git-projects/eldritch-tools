package utils

import "strings"

func WrapText(text string, width int) string {
	var result string
	lineLength := 0
	for _, word := range SplitIntoWords(text) {
		if lineLength+len(word)+1 > width {
			result += "\n"
			lineLength = 0
		}
		result += word + " "
		lineLength += len(word) + 1
	}
	return result
}

func SplitIntoWords(text string) []string {
	return strings.Fields(text)
}

func Checkbox(value bool) string {
	if value {
		return "[x]"
	}
	return "[ ]"
}

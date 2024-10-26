package utils

import "fmt"

func SafeIntToUint8(i int, funcName string) (uint8, error) {
	if i < 0 || i > 255 {
		return 0, fmt.Errorf("%s: value %d out of range for uint8", funcName, i)
	}
	return uint8(i), nil
}

func SafeIntToInt8(i int, funcName string) (int8, error) {
	if i < -128 || i > 127 {
		return 0, fmt.Errorf("%s: value %d out of range for int8", funcName, i)
	}
	return int8(i), nil
}

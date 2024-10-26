package utils

import "errors"

func SafeIntToUint8(i int) (uint8, error) {
	if i < 0 || i > 255 {
		return 0, errors.New("value out of range for uint8")
	}
	return uint8(i), nil
}

func SafeIntToInt8(i int) (int8, error) {
	if i < -128 || i > 127 {
		return 0, errors.New("value out of range for int8")
	}
	return int8(i), nil
}

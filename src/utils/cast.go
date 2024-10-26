package utils

import "errors"

func SafeIntToUint8(i int) (uint8, error) {
	if i < 0 || i > 255 {
		return 0, errors.New("value out of range for uint8")
	}
	return uint8(i), nil
}

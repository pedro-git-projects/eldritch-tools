package utils

type Point uint8

func (p Point) GetHalf() uint8 {
	return uint8(p) / 2

}

func (p Point) GetFifth() uint8 {
	return uint8(p) / 5
}

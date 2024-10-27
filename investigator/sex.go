package investigator

type Sex int

const (
	Male Sex = iota
	Female
)

func (s Sex) String() string {
	switch s {
	case Male:
		return "Male"
	case Female:
		return "Female"
	default:
		return "Unknown"
	}
}

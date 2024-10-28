package investigator

import (
	"encoding/json"
	"fmt"
)

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

func (s Sex) MarshalJSON() ([]byte, error) {
	return json.Marshal(s.String())
}

func (s *Sex) UnmarshalJSON(data []byte) error {
	var sexStr string
	if err := json.Unmarshal(data, &sexStr); err != nil {
		return err
	}

	switch sexStr {
	case "Male":
		*s = Male
	case "Female":
		*s = Female
	default:
		return fmt.Errorf("invalid sex value: %s", sexStr)
	}
	return nil
}

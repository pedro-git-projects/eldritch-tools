package models

import "encoding/json"

type Investigator struct {
	ID              int             `json:"id"`
	Name            string          `json:"name"`
	Player          string          `json:"player"`
	Occupation      string          `json:"occupation"`
	Age             int             `json:"age"`
	Sex             string          `json:"sex"`
	Residence       string          `json:"residence"`
	Birthplace      string          `json:"birthplace"`
	Characteristics json.RawMessage `json:"characteristics"`
	HP              json.RawMessage `json:"hp"`
	Sanity          json.RawMessage `json:"sanity"`
	Combat          json.RawMessage `json:"combat"`
	Meta            json.RawMessage `json:"meta"`
	Weapons         json.RawMessage `json:"weapons"`
	Skills          json.RawMessage `json:"skills"`
	Possessions     json.RawMessage `json:"possessions"`
	Luck            int             `json:"luck"`
	MP              int             `json:"mp"`
	Wealth          json.RawMessage `json:"wealth"`
	Portrait        string          `json:"portrait"`
}

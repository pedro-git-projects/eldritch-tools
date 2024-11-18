package api

import (
	"encoding/json"
	"net/http"

	"github.com/pedro-git-projects/eldritch-tools/investigator"
)

func InvestigatorHandler(w http.ResponseWriter, r *http.Request) {
	i := &investigator.Investigator{
		Info: investigator.Info{
			Name:       "John Doe",
			Player:     "Alice",
			Occupation: "Detective",
			Age:        35,
			Sex:        investigator.Male,
			Residence:  "Arkham",
			Birthplace: "Boston",
		},
		Luck: 50,
		MP:   10,
	}
	i.InitializeTwenties()

	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(i)
	if err != nil {
		http.Error(w, "Failed to encode investigator", http.StatusInternalServerError)
		return
	}
}

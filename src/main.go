package main

import (
	"log"
	"net/http"

	"github.com/pedro-git-projects/necronomicon-engine/src/api"
)

func main() {
	http.HandleFunc("/investigator", api.InvestigatorHandler)

	log.Println("Starting server on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Server failed:", err)
	}
}

package investigator

import (
	"encoding/json"
	"fmt"

	"github.com/pedro-git-projects/necronomicon-engine/src/utils"
)

type Possession struct {
	Name        string
	Description string
	Quantity    uint8
}

type Possessions struct {
	items map[string]*Possession
}

func NewPossessions() *Possessions {
	return &Possessions{
		items: make(map[string]*Possession),
	}
}

func (p *Possessions) ToJSON() (string, error) {
	if len(p.items) == 0 {
		fmt.Println("Possessions map is empty, returning null")
		return "null", nil
	}
	jsonData, err := json.Marshal(p.items)
	if err != nil {
		return "", fmt.Errorf("failed to serialize possessions: %w", err)
	}
	fmt.Println("Serialized Possessions JSON data:", string(jsonData))
	return string(jsonData), nil
}

func (p *Possessions) AddPossession(name, description string, quantity uint8) {
	if existing, found := p.items[name]; found {
		existing.Quantity += quantity
	} else {
		p.items[name] = &Possession{
			Name:        name,
			Description: description,
			Quantity:    quantity,
		}
	}
}

func (p *Possessions) RemovePossession(name string, quantity uint8) {
	if existing, found := p.items[name]; found {
		if quantity >= existing.Quantity {
			delete(p.items, name)
		} else {
			existing.Quantity -= quantity
		}
	}
}

func (p *Possessions) GetPossession(name string) (*Possession, bool) {
	possession, found := p.items[name]
	return possession, found
}

func (p *Possessions) GetSelf() Possessions {
	fmt.Println("Self ")
	p.ListPossessions()
	return *p
}

func (p *Possessions) UpdatePossessions(newPossessions []Possession) {
	fmt.Println("Updating possessions:", newPossessions)
	p.items = make(map[string]*Possession)
	for _, possession := range newPossessions {
		p.items[possession.Name] = &Possession{
			Name:        possession.Name,
			Description: possession.Description,
			Quantity:    possession.Quantity,
		}
	}
}

func (p *Possessions) ListPossessions() {
	fmt.Println("===================================")
	fmt.Println("         Investigator's Items      ")
	fmt.Println("===================================")
	for _, possession := range p.items {
		fmt.Printf("Name:        %s\n", possession.Name)
		fmt.Printf("Quantity:    %d\n", possession.Quantity)
		fmt.Printf("Description: %s\n", utils.WrapText(possession.Description, 50))
		fmt.Println("-----------------------------------")
	}
}

func (p *Possessions) GetPossessionsList() []Possession {
	possessionsList := []Possession{}
	for _, possession := range p.items {
		possessionsList = append(possessionsList, *possession)
	}
	return possessionsList
}

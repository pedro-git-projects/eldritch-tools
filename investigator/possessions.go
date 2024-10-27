package investigator

import (
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

package investigator

import "fmt"

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
	for _, possession := range p.items {
		fmt.Printf("Name: %s, Description: %s, Quantity: %d\n", possession.Name, possession.Description, possession.Quantity)
	}
}

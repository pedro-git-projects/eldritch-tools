package investigator

import "fmt"

type Wealth struct {
	SpendingLevel int64
	Cash          int64
	Assets        int64
}

func (w Wealth) PrintWealth() {
	fmt.Println("+-----------------+---------------+")
	fmt.Println("| Wealth Category |     Amount    |")
	fmt.Println("+-----------------+---------------+")
	fmt.Printf("| %-15s | $%11.2f |\n", "Spending Level", float64(w.SpendingLevel)/100)
	fmt.Printf("| %-15s | $%11.2f |\n", "Cash", float64(w.Cash)/100)
	fmt.Printf("| %-15s | $%11.2f |\n", "Assets", float64(w.Assets)/100)
	fmt.Println("+-----------------+---------------+")
}

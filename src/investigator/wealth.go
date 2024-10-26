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
	fmt.Printf("| %-15s | %13d |\n", "Spending Level", w.SpendingLevel)
	fmt.Printf("| %-15s | %13d |\n", "Cash", w.Cash)
	fmt.Printf("| %-15s | %13d |\n", "Assets", w.Assets)
	fmt.Println("+-----------------+---------------+")
}

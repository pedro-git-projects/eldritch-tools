package investigator

import "fmt"

type Wealth struct {
	spendingLevel int64
	cash          int64
	assets        int64
}

func (w Wealth) PrintWealth() {
	fmt.Println("+-----------------+---------------+")
	fmt.Println("| Wealth Category |     Amount    |")
	fmt.Println("+-----------------+---------------+")
	fmt.Printf("| %-15s | %13d |\n", "Spending Level", w.spendingLevel)
	fmt.Printf("| %-15s | %13d |\n", "Cash", w.cash)
	fmt.Printf("| %-15s | %13d |\n", "Assets", w.assets)
	fmt.Println("+-----------------+---------------+")
}

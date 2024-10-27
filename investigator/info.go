package investigator

import "fmt"

type Info struct {
	Name       string
	Player     string
	Occupation string
	Age        uint
	Sex        Sex
	Residence  string
	Birthplace string
}

func (i Info) PrintInfo() {
	fmt.Println("+----------------+--------------------------+")
	fmt.Println("| Field          | Value                    |")
	fmt.Println("+----------------+--------------------------+")
	fmt.Printf("| %-14s | %-24s |\n", "Name", i.Name)
	fmt.Printf("| %-14s | %-24s |\n", "Player", i.Player)
	fmt.Printf("| %-14s | %-24s |\n", "Occupation", i.Occupation)
	fmt.Printf("| %-14s | %-24d |\n", "Age", i.Age)
	fmt.Printf("| %-14s | %-24s |\n", "Sex", i.Sex)
	fmt.Printf("| %-14s | %-24s |\n", "Residence", i.Residence)
	fmt.Printf("| %-14s | %-24s |\n", "Birthplace", i.Birthplace)
	fmt.Println("+----------------+--------------------------+")
}

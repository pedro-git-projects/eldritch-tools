package investigator

import (
	"encoding/base64"
	"fmt"
)

type Info struct {
	Name       string
	Player     string
	Occupation string
	Age        uint
	Sex        Sex
	Residence  string
	Birthplace string
	Portrait   []byte
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

func (i *Info) ToBase64() string {
	return base64.StdEncoding.EncodeToString(i.Portrait)
}

func (i *Info) UpdateInfo(name, player, occupation, residence, birthplace string, age uint, sex Sex, portraitBase64 string) error {
	i.Name = name
	i.Player = player
	i.Occupation = occupation
	i.Residence = residence
	i.Birthplace = birthplace
	i.Age = age
	i.Sex = sex
	portraitBytes, err := base64.StdEncoding.DecodeString(portraitBase64)
	if err != nil {
		return fmt.Errorf("could not decode portrait: %w", err)
	}
	i.Portrait = portraitBytes

	return nil
}

func (i *Info) GetInfo() Info {
	return *i
}

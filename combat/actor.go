package combat

type Actor interface {
	GetName() string
	GetDex() uint8
	TakeTurn(engine *CombatEngine)
	IsAlive() bool
	IsPlayerControlled() bool
	ChooseAction(engine *CombatEngine) Action
	ReceiveDamage(damage uint8) (bool, error)
	GetDamageBonus() int8
	GetSkillLevel(skillName string) uint8
}

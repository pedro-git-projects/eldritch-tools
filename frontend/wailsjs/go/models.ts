export namespace combat {
	
	export class Action {
	    Type: number;
	    Target: any;
	    Weapon?: weapons.Weapon;
	    SuccessLevel: string;
	
	    static createFrom(source: any = {}) {
	        return new Action(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Type = source["Type"];
	        this.Target = source["Target"];
	        this.Weapon = this.convertValues(source["Weapon"], weapons.Weapon);
	        this.SuccessLevel = source["SuccessLevel"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class CombatEngine {
	    Actors: any[];
	    Turns: any[];
	    Turn: number;
	
	    static createFrom(source: any = {}) {
	        return new CombatEngine(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Actors = source["Actors"];
	        this.Turns = source["Turns"];
	        this.Turn = source["Turn"];
	    }
	}

}

export namespace investigator {
	
	export class Characteristics {
	    Str: number;
	    Dex: number;
	    Int: number;
	    Con: number;
	    App: number;
	    Pow: number;
	    Siz: number;
	    Edu: number;
	    Move: number;
	
	    static createFrom(source: any = {}) {
	        return new Characteristics(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Str = source["Str"];
	        this.Dex = source["Dex"];
	        this.Int = source["Int"];
	        this.Con = source["Con"];
	        this.App = source["App"];
	        this.Pow = source["Pow"];
	        this.Siz = source["Siz"];
	        this.Edu = source["Edu"];
	        this.Move = source["Move"];
	    }
	}
	export class Info {
	    Name: string;
	    Player: string;
	    Occupation: string;
	    Age: number;
	    Sex: number;
	    Residence: string;
	    Birthplace: string;
	    Portrait: number[];
	
	    static createFrom(source: any = {}) {
	        return new Info(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Player = source["Player"];
	        this.Occupation = source["Occupation"];
	        this.Age = source["Age"];
	        this.Sex = source["Sex"];
	        this.Residence = source["Residence"];
	        this.Birthplace = source["Birthplace"];
	        this.Portrait = source["Portrait"];
	    }
	}
	export class Meta {
	    PersonalDescription: string;
	    Traits: string;
	    IdeologyAndBeliefs: string;
	    SignificantPeople: string;
	    MeaningfulLocations: string;
	    TreasuredPosessions: string;
	    InjuriesAndScars: string;
	    PhobiasAndManias: string;
	    ArcaneTomesSpellsAndArtifacts: string;
	    EncountersWithStrangeEntities: string;
	
	    static createFrom(source: any = {}) {
	        return new Meta(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.PersonalDescription = source["PersonalDescription"];
	        this.Traits = source["Traits"];
	        this.IdeologyAndBeliefs = source["IdeologyAndBeliefs"];
	        this.SignificantPeople = source["SignificantPeople"];
	        this.MeaningfulLocations = source["MeaningfulLocations"];
	        this.TreasuredPosessions = source["TreasuredPosessions"];
	        this.InjuriesAndScars = source["InjuriesAndScars"];
	        this.PhobiasAndManias = source["PhobiasAndManias"];
	        this.ArcaneTomesSpellsAndArtifacts = source["ArcaneTomesSpellsAndArtifacts"];
	        this.EncountersWithStrangeEntities = source["EncountersWithStrangeEntities"];
	    }
	}
	export class Possession {
	    Name: string;
	    Description: string;
	    Quantity: number;
	
	    static createFrom(source: any = {}) {
	        return new Possession(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Description = source["Description"];
	        this.Quantity = source["Quantity"];
	    }
	}
	export class Possessions {
	
	
	    static createFrom(source: any = {}) {
	        return new Possessions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}
	export class Skill {
	    Name: string;
	    BaseChance: number;
	    Level: number;
	
	    static createFrom(source: any = {}) {
	        return new Skill(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.BaseChance = source["BaseChance"];
	        this.Level = source["Level"];
	    }
	}

}

export namespace models {
	
	export class Investigator {
	    id: number;
	    name: string;
	    player: string;
	    occupation: string;
	    age: number;
	    sex: string;
	    residence: string;
	    birthplace: string;
	    characteristics: number[];
	    hp: number[];
	    sanity: number[];
	    combat: number[];
	    meta: number[];
	    weapons: number[];
	    skills: number[];
	    possessions: number[];
	    luck: number;
	    mp: number;
	    wealth: number[];
	    portrait: string;
	
	    static createFrom(source: any = {}) {
	        return new Investigator(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.player = source["player"];
	        this.occupation = source["occupation"];
	        this.age = source["age"];
	        this.sex = source["sex"];
	        this.residence = source["residence"];
	        this.birthplace = source["birthplace"];
	        this.characteristics = source["characteristics"];
	        this.hp = source["hp"];
	        this.sanity = source["sanity"];
	        this.combat = source["combat"];
	        this.meta = source["meta"];
	        this.weapons = source["weapons"];
	        this.skills = source["skills"];
	        this.possessions = source["possessions"];
	        this.luck = source["luck"];
	        this.mp = source["mp"];
	        this.wealth = source["wealth"];
	        this.portrait = source["portrait"];
	    }
	}

}

export namespace weapons {
	
	export class Weapon {
	    Name: string;
	    SkillName: string;
	    Damage: number;
	    NumberOfAttacks: number;
	    Range: number;
	    Ammo: number;
	    Malf: number;
	
	    static createFrom(source: any = {}) {
	        return new Weapon(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.SkillName = source["SkillName"];
	        this.Damage = source["Damage"];
	        this.NumberOfAttacks = source["NumberOfAttacks"];
	        this.Range = source["Range"];
	        this.Ammo = source["Ammo"];
	        this.Malf = source["Malf"];
	    }
	}
	export class WeaponConfig {
	    Name: string;
	    SkillName: string;
	    Damage: number;
	    NumberOfAttacks: number;
	    Range: number;
	    Ammo: number;
	    Malf: number;
	
	    static createFrom(source: any = {}) {
	        return new WeaponConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.SkillName = source["SkillName"];
	        this.Damage = source["Damage"];
	        this.NumberOfAttacks = source["NumberOfAttacks"];
	        this.Range = source["Range"];
	        this.Ammo = source["Ammo"];
	        this.Malf = source["Malf"];
	    }
	}

}


export namespace combat {
	
	export class Action {
	    Type: number;
	    Target: any;
	    Weapon?: commons.Weapon;
	    SuccessLevel: string;
	
	    static createFrom(source: any = {}) {
	        return new Action(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Type = source["Type"];
	        this.Target = source["Target"];
	        this.Weapon = this.convertValues(source["Weapon"], commons.Weapon);
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

export namespace commons {
	
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

}

export namespace investigator {
	
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


export interface FullInvestigator {
  id: number;
  name: string;
  player: string;
  occupation: string;
  age: number;
  sex: string;
  residence: string;
  birthplace: string;
  characteristics: any;
  hp: {
    Value: number;
    MajorWound: boolean;
    Dying: boolean;
    Unconscious: boolean;
  };
  sanity: {
    Value: number;
    TempInsane: boolean;
    IndefInsane: boolean;
  };
  combat: any;
  meta: any;
  weapons: any;
  skills: any;
  possessions: any;
  luck: number;
  mp: number;
  wealth: any;
  portrait: string;
}

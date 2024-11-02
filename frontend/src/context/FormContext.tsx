import { createContext, useContext, useState, ReactNode } from 'react';

interface InfoState {
  name: string;
  player: string;
  occupation: string;
  age: string;
  sex: string;
  residence: string;
  birthplace: string;
  portrait: string;
}

interface Possession {
  Name: string;
  Description: string;
  Quantity: number;
}

interface SkillData {
  name: string;
  baseChance: number;
  level: number;
  additionalPoints: number | string;
}

interface WeaponData {
  name: string;
  skillName: string;
  damage: number;
  range: number;
  ammo: number;
  malf: number;
  numberOfAttacks: number;
}

type CharacteristicKey = 'str' | 'dex' | 'int' | 'con' | 'app' | 'pow' | 'siz' | 'edu' | 'move';

interface MetaData {
  PersonalDescription: string;
  Traits: string;
  IdeologyAndBeliefs: string;
  SignificantPeople: string;
  MeaningfulLocations: string;
  TreasuredPossessions: string;
  InjuriesAndScars: string;
  PhobiasAndManias: string;
  ArcaneTomesSpellsAndArtifacts: string;
  EncountersWithStrangeEntities: string;
}

interface FormContextType {
  info: InfoState;
  setInfo: React.Dispatch<React.SetStateAction<InfoState>>;
  resetInfo: () => void;

  meta: MetaData;
  setMeta: React.Dispatch<React.SetStateAction<MetaData>>;
  resetMeta: () => void;

  possessions: Possession[];
  setPossessions: React.Dispatch<React.SetStateAction<Possession[]>>;
  resetPossessions: () => void;

  skills: SkillData[];
  setSkills: React.Dispatch<React.SetStateAction<SkillData[]>>;
  resetSkills: () => void;

  weapons: WeaponData[];
  setWeapons: React.Dispatch<React.SetStateAction<WeaponData[]>>;
  resetWeapons: () => void;

  characteristics: Record<CharacteristicKey, number>;
  setCharacteristics: React.Dispatch<React.SetStateAction<Record<CharacteristicKey, number>>>;
  resetCharacteristics: () => void;
}

const defaultInfoState: InfoState = {
  name: '',
  player: '',
  occupation: '',
  age: '',
  sex: 'Male',
  residence: '',
  birthplace: '',
  portrait: '',
};

const defaultMeta: MetaData = {
  PersonalDescription: '',
  Traits: '',
  IdeologyAndBeliefs: '',
  SignificantPeople: '',
  MeaningfulLocations: '',
  TreasuredPossessions: '',
  InjuriesAndScars: '',
  PhobiasAndManias: '',
  ArcaneTomesSpellsAndArtifacts: '',
  EncountersWithStrangeEntities: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<InfoState>(defaultInfoState);
  const [meta, setMeta] = useState<MetaData>(defaultMeta);
  const [possessions, setPossessions] = useState<Possession[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [weapons, setWeapons] = useState<WeaponData[]>([]);
  const [characteristics, setCharacteristics] = useState<Record<CharacteristicKey, number>>({
    str: 0, dex: 0, int: 0, con: 0, app: 0, pow: 0, siz: 0, edu: 0, move: 0,
  });

  const resetInfo = () => setInfo(defaultInfoState);
  const resetMeta = () => setMeta(defaultMeta);
  const resetPossessions = () => setPossessions([]);
  const resetSkills = () => setSkills([]);
  const resetWeapons = () => setWeapons([]);
  const resetCharacteristics = () => setCharacteristics({
    str: 0, dex: 0, int: 0, con: 0, app: 0, pow: 0, siz: 0, edu: 0, move: 0,
  });

  return (
    <FormContext.Provider
      value={{
        info,
        setInfo,
        resetInfo,
        meta,
        setMeta,
        resetMeta,
        possessions,
        setPossessions,
        resetPossessions,
        skills,
        setSkills,
        resetSkills,
        weapons,
        setWeapons,
        resetWeapons,
        characteristics,
        setCharacteristics,
        resetCharacteristics,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};


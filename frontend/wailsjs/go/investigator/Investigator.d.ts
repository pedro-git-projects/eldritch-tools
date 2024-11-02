// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {weapons} from '../models';
import {combat} from '../models';
import {investigator} from '../models';

export function AddWeapon(arg1:string,arg2:string,arg3:number,arg4:Array<weapons.WeaponOption>):Promise<void>;

export function AddWeaponWithConfig(arg1:weapons.WeaponConfig):Promise<void>;

export function ChooseAction(arg1:combat.CombatEngine):Promise<combat.Action>;

export function GetDamageBonus():Promise<number>;

export function GetDex():Promise<number>;

export function GetName():Promise<string>;

export function GetSkillLevel(arg1:string):Promise<number>;

export function GetSkills():Promise<Array<investigator.Skill>>;

export function InitDamageBonus():Promise<void>;

export function InitHP():Promise<void>;

export function InitLuck():Promise<void>;

export function InitMP():Promise<void>;

export function InitMove():Promise<number>;

export function InitSan():Promise<void>;

export function InitTwentiesBaseSkills():Promise<void>;

export function InitWeapons():Promise<void>;

export function InitializeTwenties():Promise<void>;

export function IsAlive():Promise<boolean>;

export function IsPlayerControlled():Promise<boolean>;

export function Print():Promise<void>;

export function PrintLuckAndMP():Promise<void>;

export function PrintSkills():Promise<void>;

export function PrintWeapons():Promise<void>;

export function ReceiveDamage(arg1:number):Promise<boolean>;

export function ResetInvestigator():Promise<void>;

export function Save():Promise<void>;

export function SetIsPlayerControlled(arg1:boolean):Promise<void>;

export function TakeTurn(arg1:combat.CombatEngine):Promise<void>;

export function UpdateInvestigator(arg1:investigator.Info,arg2:investigator.Meta,arg3:investigator.Characteristics,arg4:Array<investigator.Possession>):Promise<void>;

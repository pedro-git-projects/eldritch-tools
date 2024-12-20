// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {investigator} from '../models';

export function AddPossession(arg1:string,arg2:string,arg3:number):Promise<void>;

export function GetPossession(arg1:string):Promise<investigator.Possession|boolean>;

export function GetPossessionsList():Promise<Array<investigator.Possession>>;

export function GetSelf():Promise<investigator.Possessions>;

export function ListPossessions():Promise<void>;

export function RemovePossession(arg1:string,arg2:number):Promise<void>;

export function ToJSON():Promise<string>;

export function UpdatePossessions(arg1:Array<investigator.Possession>):Promise<void>;

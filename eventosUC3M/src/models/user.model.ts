import {Categories, Campus} from '../globalTypes'
import {Event} from '../models/event.model';

export interface User {
    key?: string;
    email: string;
    password: string;
    name: string;
    lastName: string; 
    lastName2?: string;
    campus: Campus;
    categories: Categories[];
    avatar: string;
    ntf_evCanc: boolean;
    ntf_evMod: boolean;
    ntf_evNew: boolean;
    favorites: string[];
    inscriptions: string[];
}
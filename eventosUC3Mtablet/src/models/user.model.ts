import {Categories, Campus} from '../globalTypes'
import {Event} from '../models/event.model';

export interface User {
    key?: string;
    name: string;
    lastName: string; 
    lastName2?: string;
    email: string;
    campus: Campus;
    categories: Categories[];
    avatar: string;
    ntf_evCanc: boolean;
    ntf_evMod: boolean;
    ntf_evNew: boolean;
    //favorites: Event[];
    //inscriptions: Event[];
}
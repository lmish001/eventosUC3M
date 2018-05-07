import {Categories, Campus} from '../globalTypes'

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
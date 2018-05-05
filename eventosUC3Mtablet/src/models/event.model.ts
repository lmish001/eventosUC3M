import {Categories, Campus} from '../globalTypes'
import { User } from './user.model';


export interface Event {
    key?: string;
    name: string;
    photo: string;
    date: Date;
    campus: Campus;
    classroom: string;
    credits?:number;
    organizer: string;
    contact: string;
    description: string;
    categories: Categories[];
    inscriptions: number;
    webpage?: string;
    users_registered: string [];
    users_favorites: string [];
    publicado_por: string;
};
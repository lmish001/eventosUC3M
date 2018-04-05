import {Categories, Campus} from '../globalTypes'


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
};
export type Campus = 'Campus de Getafe' | 'Campus de Leganés' | 'Campus de Colmennarejo' | 'Campus Puerta de Toledo' ;
export type Categories = 'Informática' |'Economía'|'Literatura'|'Ciencia'|'Software'|'Ciberseguridad'|'Historia'|'Música'|'Deporte'|'Teatro'

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
import {Categories, Campus} from '../globalTypes'

export interface Search {
    type: String,
    input: String,
    campus: String,
    tiempo: String,
    categoria: String
    horaMin: any;
    creditos: boolean;
}
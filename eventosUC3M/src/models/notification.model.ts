import {Event} from '../models/event.model';
import {tNotification} from '../globalTypes';

export interface Notification {
    key?: string;
    eventKey: string;
    publicado_por: string;
    eventName: string;
    eventPhoto: string;
    eventDate: Date;
    eventPlace: string;
    eventCredits: number;
    eventRegistered: number;
    type: tNotification;
    date: any;
}
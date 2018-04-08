import {Event} from '../models/event.model';
import {tNotification} from '../globalTypes';

export interface Notification {
    key?: string;
    event: Event;
    type: tNotification;

}
import {Event} from '../models/event.model';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Notification} from '../models/notification.model';

@Injectable()
export class EventService {

    private eventsRef = this.db.list<Event>('Events')
    private notificationsRef = this.db.list<Notification>('Notifications');





    constructor(private db: AngularFireDatabase) { 
    }

    getEvents(){
       return this.eventsRef;
       
    }


    getEventByKey(value: string){
        return this.db.list('/Events', ref => ref.orderByChild('key').equalTo(value));
    }

    addEvent(value: Event) {
        return this.eventsRef.push(value);
    }

    updateEvent (value: Event) {
        return this.eventsRef.update(value.key, value);
    }

    deleteEvent (value: Event) {
        return this.eventsRef.remove(value.key);
    }

    addNotification (value: Notification) {
        return this.notificationsRef.push(value);
    }

    getNotifications (){
        return this.notificationsRef;
    }
    

}
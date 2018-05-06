import {Event} from '../models/event.model';
import {User} from '../models/user.model';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthentificationService } from './authentification.service';
import {Notification} from '../models/notification.model';

@Injectable()
export class EventService {

    private eventsRef = this.db.list<Event>('Events')
    private userRef = this.db.list<User>('Users')
    private notificationsRef = this.db.list<Notification>('Notifications');
    
    private list;
    user: firebase.User;




    constructor(private db: AngularFireDatabase, private auth: AuthentificationService) { 
        this.user = firebase.auth().currentUser;
        //console.log(this.user.email);
    }

    getEvents(){

         //return this.db.list('/Events', ref => ref.orderByChild('name').equalTo('Taller de Improvisación '));

      // console.log (this.eventsRef.query.orderByChild('name').equalTo('Taller de Improvisación '));
       return this.eventsRef;
      //return this.db.list('/Events', ref => ref.orderByChild('date'));
       
    }

    getRegisteredEvents() {
        console.log(this.user.email);
        return this.db.list('/Events', ref => ref.orderByChild('users_registered').equalTo(this.user.email));
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
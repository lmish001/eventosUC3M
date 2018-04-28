import {Event} from '../models/event.model';
import {EVENTS} from '../mock-events-database';
import {USER} from '../mock-user';
import {User} from '../models/user.model';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class EventService {

    private eventsRef = this.db.list<Event>('Events')
    private userRef = this.db.list<User>('Users')
    private list;
    user: firebase.User;


    constructor(private db: AngularFireDatabase, private auth: AuthentificationService) { 
        //this.user = auth.getCurrentUser();
        //console.log(this.user.email);
    }

    getEvents(){

         //return this.db.list('/Events', ref => ref.orderByChild('name').equalTo('Taller de Improvisación '));

    //console.log (this.db.list('/Events', ref => ref.orderByChild('name').equalTo('Taller')));
       return this.eventsRef;
    }

    addEvent(value: Event) {
        return this.eventsRef.push(value);
    }

    updateEvent (value: Event) {
        return this.eventsRef.update(value.key, value);
    }

   /* isInFavorites(value: Event) {
        return this.db.list('/Users', ref => ref.orderByChild('favorites').equalTo(value.name));
    }

    addFavorites (value: Event) {
        this.eventsRef.update(value.key, value);
    }*/


 





    /*getInscriptions(): Event[] {
        if(USER.inscriptions[0]==null){
                return null;
        }
         return USER.inscriptions;
    }

    isRegistered(value: Event): boolean {
        if(USER.inscriptions.indexOf(value)==-1){
                return false;
        }
        return true;       
    }

    getFavorites(): Event[] {
        if(USER.favorites[0]==null){
            return null;
        }
        return USER.favorites;
    }
*/


    



/*
    addInscriptions (value: Event): number {
        if(USER.inscriptions[0]==null){
            USER.inscriptions = [value];
            return 1;
        }
        if (USER.inscriptions.indexOf(value)==-1) {
            USER.inscriptions.push(value);
            return 1;
        }    
        return 0;  
    }

    removeInscriptions (value: Event) {
        USER.inscriptions.splice(USER.inscriptions.indexOf(value), 1);
    }*/
}
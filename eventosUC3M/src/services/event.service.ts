import {Event} from '../models/event.model';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class EventService {

    private eventsRef = this.db.list<Event>('Events')
    //private userRef = this.db.list<User>('Users')

    constructor(private db: AngularFireDatabase) {      
       //this.eventsRef.push(EVENTS[0]);
    }
    
    getEvents() {
        return this.eventsRef;
    }

    addEvent(value: Event) {
        return this.eventsRef.push(value);
    }

    updateEvent(value: Event) {
        return this.eventsRef.update(value.key, value);
    }

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
    isInFavorites(value: Event) {
        return null;
    }
/*
    addEvent(value: Event) {
        EVENTS.push(value);
    }

    addFavorites (value: Event) {
        if (USER.favorites[0]==null){
            USER.favorites = [value];
        }
        else if (USER.favorites.indexOf(value)==-1) {
            USER.favorites.push(value);
        } 
    }

    removeFavorites (value: Event) {
        USER.favorites.splice(USER.favorites.indexOf(value), 1);
    }

    addInscriptions (value: Event) {
        this.userRef.update.
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
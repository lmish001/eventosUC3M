import {Event} from '../models/event.model';
import {EVENTS} from '../mock-events-database';
import {USER} from '../mock-user';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  
    constructor() { }

    getEvents(): Event[] {
        return EVENTS;
    }

    getInscriptions(): Event[] {
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

    isInFavorites(value: Event): boolean {
        if (USER.favorites.indexOf(value)!=-1){
            return true;
        }
        return false;
    }

    getFavorites(): Event[] {
        if(USER.favorites[0]==null){
            return null;
        }
        return USER.favorites;
    }

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

    addInscriptions (value: Event) {
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
    }
}
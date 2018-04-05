import {Event} from '../models/event.model';
import {EVENTS} from '../mock-events-database';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
    
    constructor() { }

    getEvents(): Event[] {
        return EVENTS;
    }

    addEvent(value: Event) {
        EVENTS.push(value);
    }
}
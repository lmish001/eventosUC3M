import {Notification} from '../models/notification.model';
import {NOTIFICATIONS} from '../mock-notifications';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
    constructor() { }

    getNotifications(): Notification[] {
        return NOTIFICATIONS;
    }

}
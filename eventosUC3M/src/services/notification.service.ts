import { Notification } from '../models/notification.model';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
    constructor() { }

    getNotifications(): Notification[] {
        return null;
    }

}
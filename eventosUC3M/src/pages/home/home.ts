import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.model';
import {EventDetailPage} from '../event-detail/event-detail';
import {NotificationsPage} from '../notifications/notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events: Event[];
  constructor(public navCtrl: NavController, private eventService: EventService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.events = this.eventService.getEvents();
  }

  addEvent(value: Event) {
    this.eventService.addEvent(value);
    this.events = this.eventService.getEvents();
  }

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value});
  }

  loadNotifications() {
    this.navCtrl.push(NotificationsPage);
  }
}

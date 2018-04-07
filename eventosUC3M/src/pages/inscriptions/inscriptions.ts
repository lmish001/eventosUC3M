import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.model';
import {EventDetailPage} from '../event-detail/event-detail';
import {NotificationsPage} from '../notifications/notifications';

/**
 * Generated class for the InscriptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscriptions',
  templateUrl: 'inscriptions.html',
})
export class InscriptionsPage {
  events: Event[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    if(this.eventService.getInscriptions()!=null){
      this.events = this.eventService.getInscriptions();
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionsPage');
  }

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value});
  }

  loadNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  addFavorites(value: Event) {
    this.eventService.addFavorites(value);
  }

  deleteFavorites(value: Event) {
    this.eventService.removeFavorites(value);
  }

  isInFavorites(value: Event): boolean {
    return this.eventService.isInFavorites(value);
  }

  shareEvent(value: Event) {
  }

  search() {
  }

}

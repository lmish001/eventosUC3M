import {Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {NotificationsPage} from '../notifications/notifications';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.model';
import {EventDetailPage} from '../event-detail/event-detail';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  events: Event[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  loadNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  shareEvent(value: Event) {
  }

  search() {
  }

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value});
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    if(this.eventService.getFavorites()!=null){
      this.events = this.eventService.getFavorites();
    }
  }
  
  deleteFavorites(value: Event) {
    this.eventService.removeFavorites(value);
  }


}

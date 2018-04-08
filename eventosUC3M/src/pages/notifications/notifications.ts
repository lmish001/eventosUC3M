import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../models/notification.model';
import {EventDetailPage} from '../event-detail/event-detail';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications: Notification[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private notificationService: NotificationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notifications = this.notificationService.getNotifications();
  }

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value});
  }

}

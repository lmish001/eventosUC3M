import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user.model';
import {USER} from '../../mock-user';
/**
 * Generated class for the ConfigNotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-config-notifications',
  templateUrl: 'config-notifications.html',
})
export class ConfigNotificationsPage {
  user: User = USER;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigNotificationsPage');
  }

}

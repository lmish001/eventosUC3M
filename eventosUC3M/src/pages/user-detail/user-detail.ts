import {Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user.model';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
  }

}

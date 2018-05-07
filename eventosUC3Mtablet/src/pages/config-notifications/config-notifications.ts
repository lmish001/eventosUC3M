import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';

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
  
  user$: Observable <any[]>;
  user: User;
  userArray: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthentificationService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigNotificationsPage');
  }

  ionViewWillLeave() {
    //this.auth.updateUser(this.user);
  }

  getUser() {
    this.user$ = this.auth.getCurrentUser().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
      
     
  }
  currentUser(value:any) {
    for (let v of value) {
     this.userArray.push(v);
    }
    this.user = this.userArray[0];
    console.log(this.user.email);
  }

  checked(value: string) {
    console.log ('here');
    if (!this.user) return false;
    if (this.user.ntf_evCanc==true && value == 'c') return true;
    if (this.user.ntf_evMod==true && value == 'm') return true;
    if (this.user.ntf_evNew==true && value == 'n') return true;
    return false;
  }

}

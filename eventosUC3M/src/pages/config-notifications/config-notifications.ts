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
  userArray: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthentificationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigNotificationsPage');
  }

  ionViewWillLeave() {
    this.auth.updateUser(this.user);
  }

  getUser() {
    this.user$ = this.auth.getCurrentUser().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
      /*
      Estas líneas retornan un array de  objetos con el id del registro y su contenido
      {
        "key":"value",
        contact.name,
        contact.organization,
       ...
      }
      */
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
      this.user$.forEach(value=>this.currentUser(value));
     
  }
  currentUser(value:any) {
    for (let v of value) {
      if (!this.userArray) this.userArray = [v];
      else { this.userArray.push(v);}
     
    }
    this.user = this.userArray[0];
  }

}

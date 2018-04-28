import {Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from '../../models/user.model';
import {USER} from '../../mock-user';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';

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

  user$: Observable <User[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthentificationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
    this.getUser();
  }

  getUser(): void {
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
  }

  getName (value: string) {
    return value.toString;
  }

}

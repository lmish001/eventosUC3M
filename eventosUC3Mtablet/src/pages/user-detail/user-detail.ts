import {Component } from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import {User} from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';
import { Categories } from '../../globalTypes';
import { LoginPage } from '../login/login';

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
  CurUser: User;
  categories: Categories [] =  ['Informática' ,'Economía','Literatura','Ciencia','Software','Ciberseguridad','Historia','Música','Deporte','Teatro']
  private menu: MenuController;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthentificationService, menu: MenuController, public events: Events) {
    this.menu = menu;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
    this.getUser();
  }

  async ionViewCanLeave() {
   await this.auth.updateUser(this.CurUser);
   return true;
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

  currentUser(value:User) {
    this.CurUser = value;
    //console.log("current user: "+this.user.email);
  }

  updateCampus(){
    //this.auth.updateUser(this.CurUser);
  }

  updateCategory(value: Categories, userCategories: Categories []){
    if(this.categorySelected(value, userCategories)==false) {
      if(!userCategories) {
        userCategories = [value];
      }
      else if(userCategories.length==0) {
        userCategories = [value];
      }
      else {
        userCategories.push(value);
      }
    }
    else {
      userCategories.splice(userCategories.indexOf(value), 1)
      if(userCategories.length==0) {
        userCategories = [null];
      }
    }
    this.CurUser.categories = userCategories;
   // this.auth.updateUser(this.CurUser);
    
  }

  categorySelected (category: Categories, userCategories: Categories []) {
    if(!userCategories) return false;
    if(userCategories.length==0) return false;
    if(userCategories.indexOf(category)==-1) return false;
    return true;
  }

  logout() {
    this.menu.close();
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }


}

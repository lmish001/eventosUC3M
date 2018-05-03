import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { EventDetailPage } from '../event-detail/event-detail';
import { NotificationsPage } from '../notifications/notifications'; 
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user.model';
import { Categories } from '../../globalTypes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events$: Observable <any[]>;
  user$: Observable <any[]>;
  user: User;
  categories: Categories [] =  ['Informática' ,'Economía','Literatura','Ciencia','Software','Ciberseguridad','Historia','Música','Deporte','Teatro']
  constructor(public navCtrl: NavController, private eventService: EventService, private auth: AuthentificationService) {
  }

  ngOnInit() {
    this.getEvents();
    this.getUser();
  }

  getDate(value: string): Date {
    return new Date (value);
  }

  getEvents(): void {
    this.events$ = this.eventService.getEvents().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
      

    
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
  }

  /*addEvent(value: Event) {
    this.eventService.addEvent(value);
    this.events = this.eventService.getEvents();
  }*/

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
   
     
  }
  currentUser(value:User) {
    this.user = value;
    //console.log("current user: "+this.user.email);
  }

  loadEventDetail(value: Event, user: User) {
    this.navCtrl.push(EventDetailPage, {param1: value, param2: user});
  }

  loadNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  addFavorites(value: Event) {
    if (value.users_favorites[0]=='0'){
      value.users_favorites = [this.user.key];
    }
    else if (value.users_favorites.indexOf(this.user.key)==-1) {
      value.users_favorites.push(this.user.key);
  }    
    this.eventService.updateEvent(value);
  }

  deleteFavorites(value: Event) {
    value.users_favorites.splice(value.users_favorites.indexOf(this.user.key), 1)
    if(value.users_favorites.length==0) {
      value.users_favorites=['0'];
    } 
    this.eventService.updateEvent(value);
  }

  isInFavorites(value: Event): boolean {   
      if(value.users_favorites[0]=='0') return false;
      if(value.users_favorites.indexOf(this.user.key)==-1) return false;
      return true;
  }

  shareEvent(value: Event) {

  }

  search() {
  }

  categorySelected (eventCategories: Categories[], userCategories: Categories []) {
    if (!userCategories) return true; //Si el usuario no ha marcado intereses, se les enseña todos los eventos

    for (let i in userCategories) {
      if (eventCategories.indexOf(userCategories[i])!=-1) return true;
    }

    return false;
    /*if(!userCategories) return false;
    if(userCategories.length==0) return false;
    if(userCategories.indexOf(category)==-1) return false;
    return true;*/
  }

}

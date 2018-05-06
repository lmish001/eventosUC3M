import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { EventDetailPage } from '../event-detail/event-detail';
import { NotificationsPage } from '../notifications/notifications'; 
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user.model';
import { Categories } from '../../globalTypes';
import { ToastController } from 'ionic-angular';
import { EditEventPage } from '../edit-event/edit-event';
import { SearchPage } from '../../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events$: Observable <any[]>;
  user$: Observable <any[]>;
  user: User;
  userArray: User[];
  eventArray: Event[];
  categories: Categories [] =  ['Informática' ,'Economía','Literatura','Ciencia','Software','Ciberseguridad','Historia','Música','Deporte','Teatro']
  constructor(public navCtrl: NavController, private eventService: EventService, private auth: AuthentificationService, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.getUser();
    this.getEvents();
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
      this.events$.forEach(value=>this.getEventsArray(value));
  }

  getEventsArray(value: any) {
    this.eventArray = [];
    for (let v of value) {
        if (this.categorySelected(v.categories, this.user.categories)&&this.checkDate(v.date)&&v.campus==this.user.campus) {
          this.eventArray.push(v);
        }
       
    }
    
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
      this.user$.forEach(value=>this.currentUser(value));
     
  }
  currentUser(value:any) {
    for (let v of value) {
      if (!this.userArray) this.userArray = [v];
      else { this.userArray.push(v);}
     
    }
    this.user = this.userArray[0];
  }

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value, param2: this.user});
  }

  loadNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  addFavorites(value: Event) {
    let i = this.eventArray.indexOf(value);
    if (this.eventArray[i].users_favorites[0]=='0'){
      this.eventArray[i].users_favorites = [this.user.email];
    }
    else if (this.eventArray[i].users_favorites.indexOf(this.user.email)==-1) {
      this.eventArray[i].users_favorites.push(this.user.email);
  } 
  this.presentToastAdd();
  this.eventService.updateEvent(this.eventArray[i]);
  }

  deleteFavorites(value: Event) {
    let i = this.eventArray.indexOf(value);
    this.eventArray[i].users_favorites.splice(this.eventArray[i].users_favorites.indexOf(this.user.email), 1)
    if(this.eventArray[i].users_favorites.length==0) {
      this.eventArray[i].users_favorites=['0'];
    } 
    this.eventService.updateEvent(this.eventArray[i]);
  }

  isInFavorites(value: Event): boolean {   
      if(value.users_favorites[0]=='0') return false;
      if(value.users_favorites.indexOf(this.user.email)==-1) return false;
      return true;
  }

  shareEvent(value: Event) {

  }

  search() {
    this.navCtrl.push(SearchPage);
  }

  categorySelected (eventCategories: Categories[], userCategories: Categories []) {
    if (!userCategories) return true; //Si el usuario no ha marcado intereses, se les enseña todos los eventos

    for (let i in userCategories) {
      if (eventCategories.indexOf(userCategories[i])!=-1) return true;
    }

    return false;
  }

  checkDate (value: string) {
    var curDate = new Date();
    if (this.getDate(value) < curDate) return false;
    return true;
  }

  presentToastAdd() {
    let toast = this.toastCtrl.create({
      message: 'Añadido a "Estoy intresado"!',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  myEvent(value: Event) {
    if (value.publicado_por==this.user.email) return true;
    return false;
  }

  editEvent (value: Event) {
    this.navCtrl.push(EditEventPage, {param1: value, param2: this.user} );
  }


}

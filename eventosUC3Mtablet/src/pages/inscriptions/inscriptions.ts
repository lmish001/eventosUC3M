import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.model';
import {EventDetailPage} from '../event-detail/event-detail';
import {NotificationsPage} from '../notifications/notifications';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user.model';

/**
 * Generated class for the InscriptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscriptions',
  templateUrl: 'inscriptions.html',
  
})
export class InscriptionsPage {
  events$: Observable <any[]>;
  user$: Observable <any[]>;
  user: User;
  userArray: User[];
  eventArray: Event[];
  hasInscriptions: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService, private auth: AuthentificationService) {
  }



  ngOnInit() {
    this.hasInscriptions = false;
    this.getUser();
    this.getEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionsPage');
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
      if (v.users_registered.indexOf(this.user.email)!=-1&&this.checkDate(v.date)) {
        if(!this.eventArray) this.eventArray = [v];
        else this.eventArray.push(v);
        this.hasInscriptions = true;
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
    if (value.users_favorites[0]=='0'){
      value.users_favorites = [this.user.email];
    }
    else if (value.users_favorites.indexOf(this.user.email)==-1) {
      value.users_favorites.push(this.user.email);
  }    
    this.eventService.updateEvent(value);
  }

  deleteFavorites(value: Event) {
    value.users_favorites.splice(value.users_favorites.indexOf(this.user.email), 1)
    if(value.users_favorites.length==0) {
      value.users_favorites=['0'];
    } 
    this.eventService.updateEvent(value);
  }

  isInFavorites(value: Event): boolean {   
      if(value.users_favorites[0]=='0') return false;
      if(value.users_favorites.indexOf(this.user.email)==-1) return false;
      return true;
  }


  shareEvent(value: Event) {
  }

  search() {
  }

  checkDate (value: string) {
    var curDate = new Date();
    if (this.getDate(value) < curDate) return false;
    return true;
  }




}

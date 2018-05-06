import {Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {NotificationsPage} from '../notifications/notifications';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.model';
import {EventDetailPage} from '../event-detail/event-detail';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';
import { User } from '../../models/user.model';
import { SearchPage } from '../search/search';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  events$: Observable <any[]>;
  user$: Observable <any[]>;
  user: User;
  hasFavorites: boolean;
  userArray: User[];
  eventArray: Event[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService, private auth: AuthentificationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
  

  ngOnInit() {
    this.hasFavorites = false;
    this.getUser();
    this.getEvents();
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
        if (v.users_favorites.indexOf(this.user.email)!=-1) {
          if(!this.eventArray) this.eventArray = [v];
          else this.eventArray.push(v);
          this.hasFavorites = true;
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


  deleteFavorites(value: Event) {
    value.users_favorites.splice(value.users_favorites.indexOf(this.user.email), 1)
    if(value.users_favorites.length==0) {
      value.users_favorites=['0'];
      this.hasFavorites = false;
    } 
    this.eventService.updateEvent(value);
  }

  isRegistered(value: Event): boolean{
    if(value.users_registered[0]=='0') return false;
    if(value.users_registered.indexOf(this.user.email)==-1) return false;
    return true;
   // return this.eventService.isRegistered(value);
  }


  loadNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  shareEvent(value: Event) {
  }

  search() {
    this.navCtrl.push(SearchPage);
  }

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value, param2: this.user});
  }

  getDate(value: string): Date {
    return new Date (value);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventDetailPage} from '../event-detail/event-detail';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { Notification } from '../../models/notification.model';
import { User } from '../../models/user.model';
import { AuthentificationService } from '../../services/authentification.service';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications$: Observable<any>;
  events$: Observable<any>;
  user$: Observable<any>;
  user: User;
  userArray: User[];
  event: Event;
  eventArray: Event[];
  notification: Notification;
  notificationArray: Notification[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private eventService: EventService, private auth: AuthentificationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  ngOnInit() {
    this.getUser();
    this.getEvents();
    this.getNotifications();
  }

  getDate(value: string): Date {
    return new Date (value);
  }

  getNotifications() {
    this.notifications$ = this.eventService.getNotifications().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
      

    
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
      this.notifications$.forEach(value=>this.getNotificationsArray(value));
  }

  getNotificationsArray (value: any) {
    this.notificationArray = [];
    for (let v of value) {
      if (v.type=='modificado'&&this.user.ntf_evMod==true&&this.getEvent(v.eventKey)){
        this.notificationArray.push(v);
      }

      else if (v.type=='cancelado'&&this.user.ntf_evCanc==true&&this.getEvent(v.eventKey)){
        this.notificationArray.push(v);
      }
     // if (v.publicado_por!=this.user.email) {
        
     // }
    }
  }

  loadEventDetail(value: Notification) {
    //this.getEvents(value.eventKey);
    for (let v of this.eventArray) {
      if (v.key==value.eventKey){
        this.event = v;
        break
      } 
    }
    if (value.type=='modificado') this.navCtrl.push(EventDetailPage, {param1: this.event, param2: this.user});
    else this.presentToast();
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
      this.eventArray.push(v);
    }
    
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


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'El evento ya no existe',
      duration: 3000,
      position: 'top'
    });
    toast.present();
   
  }

  getEvent(value: string) {
    for (let v of this.eventArray) {
      if (v.key == value && (v.users_favorites.indexOf(this.user.email) || v.users_registered.indexOf(this.user.email))) return true;
    }
    return false;
  }

}

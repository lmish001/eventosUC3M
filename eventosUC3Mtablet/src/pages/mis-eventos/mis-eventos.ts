import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../../services/authentification.service';
import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';
import { EventService } from '../../services/event.service';
import { EventDetailPage } from '../event-detail/event-detail';
import { EditEventPage } from '../edit-event/edit-event';
import { CreateEventPage } from '../create-event/create-event';
import { SearchPage } from '../../search/search';

/**
 * Generated class for the MisEventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-eventos',
  templateUrl: 'mis-eventos.html',
})
export class MisEventosPage {

  events$: Observable <any[]>;
  user$: Observable <any[]>;
  user: User;
  userArray: User[];
  eventArray: Event[];
  pastEventArray: Event[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService, private auth: AuthentificationService) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MisEventosPage');
  }

  ngOnInit() {
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
    this.pastEventArray = [];
    for (let v of value) {
      if (v.publicado_por==this.user.email&&this.checkDate(v.date)) {
        this.eventArray.push(v);
      }
      else if (v.publicado_por==this.user.email&&!this.checkDate(v.date)) {
        this.pastEventArray.push(v);
      }
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

  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value, param2: this.user});
  }

  editEvent (value: Event) {
    this.navCtrl.push(EditEventPage, {param1: value, param2: this.user} );
  }

  addEvent() {
    this.navCtrl.push(CreateEventPage, {param1: this.user});
  }

  getDate(value: string): Date {
    return new Date (value);
  }

  checkDate (value: string) {
    var curDate = new Date();
    if (this.getDate(value) < curDate) return false;
    return true;
  }

  shareEvent(value: Event) {
  }


}

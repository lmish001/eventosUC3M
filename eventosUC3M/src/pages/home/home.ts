import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { EventService } from '../../services/event.service';
import {Event} from '../../models/event.model';
import {EventDetailPage} from '../event-detail/event-detail';
import {NotificationsPage} from '../notifications/notifications';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events$: Observable <any[]>;
  
  constructor(public navCtrl: NavController, private eventService: EventService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.events$ = this.eventService.getEvents().snapshotChanges() //retorna los cambios en la DB (key and value)
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


  loadEventDetail(value: Event) {
    this.navCtrl.push(EventDetailPage, {param1: value});
  }

  loadNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  getDate(value: string): Date {
    return new Date (value);
  }



  /*addFavorites(value: Event) {
    this.eventService.addFavorites(value);
  }

  deleteFavorites(value: Event) {
    this.eventService.removeFavorites(value);
  }
  
*/
  isInFavorites(value: Event): boolean {
    return null;
  }

  shareEvent(value: Event) {
  }

  search() {
  }
}

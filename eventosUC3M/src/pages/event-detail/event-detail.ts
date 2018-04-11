import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventService} from '../../services/event.service';


/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import {Event} from '../../models/event.model';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  event: Event;
  isRegistered: boolean;
  isFavorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
  }

  ngOnInit() {
    this.event = this.navParams.get('param1');
    //this.isRegistered = this.eventService.isRegistered(this.event);
    //this.isFavorite = this.eventService.isInFavorites(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  register(){

      //this.event.inscriptions+=1;
      //this.isRegistered=true;
  
  }
  cancelRegistration(){

    //this.event.inscriptions-=1;
   //this.isRegistered=false;
  }

  addFavorites() {

    //this.isFavorite=true;
  }

  deleteFavorites() {

    //this.isFavorite = false;
  }

  shareEvent(value: Event) {
  }



}

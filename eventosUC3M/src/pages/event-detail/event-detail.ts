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

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
  }

  ngOnInit() {
    this.event = this.navParams.get('param1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  registerEvent() {
    //this.event.inscriptions+=1;
    if (this.eventService.addInscriptions(this.event)) {
      this.event.inscriptions+=1;
  }
 }

}

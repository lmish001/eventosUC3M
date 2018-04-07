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
  buttonColor: string;
  buttonText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
  }

  ngOnInit() {
    this.event = this.navParams.get('param1');
    if(this.eventService.isRegistered(this.event)){
      this.buttonColor= "#f53d3d";
      this.buttonText="Cancelar Inscripcion" 
    }
    else {
      this.buttonColor= "#32db64";
      this.buttonText="Inscribirse"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  eventButtonAction() {
    //this.event.inscriptions+=1;
  //The user is not registered in the event
  if (this.eventService.addInscriptions(this.event)) {
      this.event.inscriptions+=1;
      this.buttonColor= "#f53d3d";
      this.buttonText="Cancelar Inscripcion"
  }
  else {
    this.eventService.removeInscriptions(this.event);
    this.event.inscriptions-=1;
    this.buttonColor= "#32db64";
    this.buttonText="Inscribirse"
  }
 }

}

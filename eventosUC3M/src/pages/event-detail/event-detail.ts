import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventService} from '../../services/event.service';
import {Event} from '../../models/event.model';

declare var google: any;
/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event: Event;
  isRegistered: boolean;
  isFavorite: boolean;
  @ViewChild('map') mapElement: ElementRef;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
  }
  
  ngOnInit() {
    this.event = this.navParams.get('param1');
    this.isRegistered = this.eventService.isRegistered(this.event);
    this.isFavorite = this.eventService.isInFavorites(this.event);
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let latLng = new google.maps.LatLng(0,0);
    if(this.event.campus==="Getafe"){
      latLng = new google.maps.LatLng(40.316966,-3.7292682);
    }
    else if(this.event.campus==="Leganés"){
      latLng = new google.maps.LatLng(40.3323904,-3.7677623);
    }
    else if(this.event.campus===("Colmenarejo")){
      latLng = new google.maps.LatLng(40.5430761,-4.012964);
    }
    else if(this.event.campus.includes("Puerta de toledo")){
      latLng = new google.maps.LatLng(40.4070472,-3.7111268);
    }
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      name: this.event.campus,
    }
 
    const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(map);
  }
  addMarker(map){
    new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });
  }
  register(){
  if (this.eventService.addInscriptions(this.event)) {
      this.event.inscriptions+=1;
      this.isRegistered=true;
  }
  }
  cancelRegistration(){
    this.eventService.removeInscriptions(this.event);
    this.event.inscriptions-=1;
    this.isRegistered=false;
  }

  addFavorites() {
    this.eventService.addFavorites(this.event);
    this.isFavorite=true;
  }

  deleteFavorites() {
    this.eventService.removeFavorites(this.event);
    this.isFavorite = false;
  }

  shareEvent(value: Event) {
  }



}
